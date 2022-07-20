import Albums from './app-Album.js';
import Artists from './app-Artists.js';
import Playlists from './app-Playlists.js';
import Tracks from './app-Tracks.js';
import {
  createAlbumDetail,
  createArtistDetail,
  createPlaylistDetail,
  createTrackDetail,
  savedAlbumDetail,
  savedArtistDetail,
  savedPlaylistDetail,
  savedTrackDetail,
} from './app-utilities.js';

const Album = new Albums('albums');
const Artist = new Artists('artists');
const Playlist = new Playlists('playlists');
const Track = new Tracks('tracks');

const APIController = (function () {
  const clientId = 'b8f028cccb6a4b7d990531aaaa2847df';
  const clientSecret = 'ea17abb902d64a71b2c0fb51a0474b7a';

  // private methods
  const _getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      },
      body: 'grant_type=client_credentials',
    });

    const data = await result.json();
    return data.access_token;
  };

  const _generateSearch = async (token, query, type) => {
    const result = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=10`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
      }
    );

    const data = await result.json();
    console.log(data);
    switch (type) {
      case 'album':
        return data.albums.items;
        break;
      case 'artist':
        return data.artists.items;
        break;
      case 'playlist':
        return data.playlists.items;
        break;
      case 'track':
        return data.tracks.items;
        break;
    }
  };

  const _getEndPoint = async (token, EndPoint) => {
    const result = await fetch(`${EndPoint}`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
    });

    const data = await result.json();

    return data;
  };

  return {
    getToken() {
      return _getToken();
    },

    generateSearch(token, query, type) {
      return _generateSearch(token, query, type);
    },

    getEndPoint(token, EndPoint) {
      return _getEndPoint(token, EndPoint);
    },
  };
})();

// UI Module
const UIController = (function () {
  //object to hold references to html selectors
  const DOMElements = {
    selectType: '#type',
    searchInput: '#searchInput',
    buttonSubmit: '#btn_submit',
    divSongDetail: '#song-detail',
    hfToken: '#hidden_token',
    divSonglist: '.song-list',
    saveButton: '#save',
    preferences: '.preferences',
    savedPreferences: '.saved-preferences',
  };

  //public methods
  return {
    //method to get input fields
    inputField() {
      return {
        type: document.querySelector(DOMElements.selectType),
        searchInput: document.querySelector(DOMElements.searchInput),
        endpoints: document.querySelector(DOMElements.divSonglist),
        submit: document.querySelector(DOMElements.buttonSubmit),
        songDetail: document.querySelector(DOMElements.divSongDetail),
        save: document.querySelector(DOMElements.saveButton),
        preferences: document.querySelector(DOMElements.preferences),
        savedPreferences: document.querySelector(DOMElements.savedPreferences),
      };
    },

    // need method to create a track list group item
    createLink(id, name) {
      const html = `<a href="#"  id="${id}">${name}</a><br>`;
      document
        .querySelector(DOMElements.divSonglist)
        .insertAdjacentHTML('beforeend', html);
    },
    createSavedLink(id, name, type) {
      const html = `<a href="#" class="${type}" id="${id}">${name}</a><br>`;
      document
        .querySelector(DOMElements.savedPreferences)
        .insertAdjacentHTML('beforeend', html);
    },

    // need method to create the song detail
    createEndpointDetail(endpoint, type) {
      const detailDiv = document.querySelector(DOMElements.divSongDetail);
      // any time user clicks a new song, we need to clear out the song detail div
      detailDiv.innerHTML = '';
      let html;

      switch (type) {
        case 'album':
          html = createAlbumDetail(endpoint);
          break;
        case 'artist':
          html = createArtistDetail(endpoint);
          break;
        case 'playlist':
          html = createPlaylistDetail(endpoint);
          break;
        case 'track':
          html = createTrackDetail(endpoint);
          break;
      }

      detailDiv.insertAdjacentHTML('beforeend', html);
    },

    createSavedDetail(id, type) {
      const detailDiv = document.querySelector(DOMElements.divSongDetail);
      // any time user clicks a new song, we need to clear out the song detail div
      detailDiv.innerHTML = '';
      let html;

      switch (type) {
        case 'album':
          const album = Album.getOneAlbum(id);
          html = savedAlbumDetail(album);
          break;
        case 'artist':
          const artist = Artist.getOneArtist(id);
          html = savedArtistDetail(artist);
          break;
        case 'playlist':
          const playlist = Playlist.getOnePlaylist(id);
          html = savedPlaylistDetail(playlist);
          break;
        case 'track':
          const track = Track.getOneTrack(id);
          html = savedTrackDetail(track);
          break;
      }

      detailDiv.insertAdjacentHTML('beforeend', html);
    },

    resetTrackDetail() {
      this.inputField().songDetail.innerHTML = '';
    },

    resetTracks() {
      this.inputField().endpoints.innerHTML = '';
      this.resetTrackDetail();
    },
    resetSavedPreferences() {
      this.inputField().savedPreferences.innerHTML = '';
      this.resetTrackDetail();
    },

    storeToken(value) {
      document.querySelector(DOMElements.hfToken).value = value;
    },

    getStoredToken() {
      return {
        token: document.querySelector(DOMElements.hfToken).value,
      };
    },
  };
})();

const APPController = (function (UICtrl, APICtrl) {
  // get input field object ref
  const DOMInputs = UICtrl.inputField();

  // get genres on page load
  const loadToken = async () => {
    //get the token
    const token = await APICtrl.getToken();
    //store the token onto the page
    UICtrl.storeToken(token);
  };

  // Type Input change event listener
  DOMInputs.type.addEventListener('change', async () => {
    //reset the div
    UICtrl.resetTracks();
    UICtrl.resetSavedPreferences();
  });

  // create submit button click event listener
  DOMInputs.submit.addEventListener('click', async (e) => {
    // prevent page reset
    e.preventDefault();
    // clear tracks
    UICtrl.resetTracks();
    UICtrl.resetSavedPreferences();
    //get the token
    const token = UICtrl.getStoredToken().token;

    //inputField
    const query = UICtrl.inputField().searchInput.value;
    //type Select
    const type = UICtrl.inputField().type.value;

    //Make a search
    const search = await APICtrl.generateSearch(token, query, type);
    // create a track list item
    //tracks.forEach((el) => UICtrl.createTrack(el.track.href, el.track.name));
    for (let result of search) {
      UICtrl.createLink(result.href, result.name, type);
    }
  });
  //Save an endpoint
  document.saveEndpoint = async function saveEndpoint(href, type) {
    const token = UICtrl.getStoredToken().token;
    //get the endpoint object
    const endpoint = await APICtrl.getEndPoint(token, href);

    console.log(endpoint);
    switch (type) {
      case 'album':
        Album.addNewAlbum(
          endpoint.id,
          endpoint.name,
          endpoint.tracks,
          endpoint.artists
        );
        alert(`${endpoint.name} was saved on your Albums library`);
        break;
      case 'artist':
        Artist.addNewArtist(
          endpoint.id,
          endpoint.name,
          endpoint.images[0].url,
          endpoint.external_urls.spotify
        );
        alert(`${endpoint.name} was saved on your Artists library`);
        break;
      case 'playlist':
        Playlist.addNewPlaylist(
          endpoint.id,
          endpoint.name,
          endpoint.description,
          endpoint.external_urls.spotify,
          endpoint.owner.display_name,
          endpoint.tracks.items
        );
        alert(`${endpoint.name} was saved on your Playlists library`);
        break;
      case 'track':
        Track.addNewTrack(
          endpoint.id,
          endpoint.name,
          endpoint.album,
          endpoint.artists,
          endpoint.external_urls.spotify,
          endpoint.preview_url,
          endpoint.album.images[0].url
        );
        alert(`${endpoint.name} was saved on your Tracks library`);
        break;
    }
  };

  document.deleteSaved = async function deleteSaved(id, type) {
    switch (type) {
      case 'album':
        Album.deleteAlbum(id);
        alert('Album was Deleted');

        UICtrl.resetSavedPreferences();
        UICtrl.resetTrackDetail();

        const albums = Album.getAllAlbums();
        for (let album of albums) {
          UICtrl.createSavedLink(album.id, album.name, 'album');
        }
        break;
      case 'artist':
        Artist.deleteArtist(id);
        alert('Artist was Deleted');

        UICtrl.resetSavedPreferences();
        UICtrl.resetTrackDetail();

        const artists = Artist.getAllArtists();
        for (let artist of artists) {
          UICtrl.createSavedLink(artist.id, artist.name, 'artist');
        }
        break;
      case 'playlist':
        Playlist.deletePlaylist(id);
        alert('Playlist was Deleted');

        UICtrl.resetSavedPreferences();
        UICtrl.resetTrackDetail();

        const playlists = Playlist.getAllPlaylists();
        for (let playlist of playlists) {
          UICtrl.createSavedLink(playlist.id, playlist.name, 'playlist');
        }
        break;
      case 'track':
        Track.deleteTrack(id);
        alert('Track was Deleted');

        UICtrl.resetSavedPreferences();
        UICtrl.resetTrackDetail();

        const tracks = Track.getAllTracks();
        for (let track of tracks) {
          UICtrl.createSavedLink(track.id, track.name, 'track');
        }
        break;
    }
  };

  // create a selection click event listener
  DOMInputs.endpoints.addEventListener('click', async (e) => {
    // prevent page reset
    e.preventDefault();
    UICtrl.resetTrackDetail();
    // get the token
    const token = UICtrl.getStoredToken().token;
    // get the endpoint
    const idEndpoint = e.target.id;
    //get the endpoint object
    const endpoint = await APICtrl.getEndPoint(token, idEndpoint);

    const type = UICtrl.inputField().type.value;
    // load the track details
    UICtrl.createEndpointDetail(endpoint, type);
  });

  DOMInputs.preferences.addEventListener('click', async (e) => {
    // prevent page reset
    e.preventDefault();
    UICtrl.resetTracks();
    UICtrl.resetSavedPreferences();

    // get the preferences id
    const preference = e.target.id;
    //Send to build

    switch (preference) {
      case 'Albums':
        const albums = Album.getAllAlbums();
        for (let album of albums) {
          UICtrl.createSavedLink(album.id, album.name, 'album');
        }
        break;
      case 'Artists':
        const artists = Artist.getAllArtists();
        for (let artist of artists) {
          UICtrl.createSavedLink(artist.id, artist.name, 'artist');
        }
        break;
      case 'Playlists':
        const playlists = Playlist.getAllPlaylists();
        for (let playlist of playlists) {
          UICtrl.createSavedLink(playlist.id, playlist.name, 'playlist');
        }
        break;
      case 'Tracks':
        const tracks = Track.getAllTracks();
        for (let track of tracks) {
          UICtrl.createSavedLink(track.id, track.name, 'track');
        }
        break;
    }
  });

  DOMInputs.savedPreferences.addEventListener('click', async (e) => {
    // prevent page reset
    e.preventDefault();
    UICtrl.resetTrackDetail();
    // get the token

    // get the endpoint
    const id = e.target.id;
    const type = e.target.classList;
    //get the endpoint object
    UICtrl.createSavedDetail(id, type.value);
  });

  return {
    init() {
      console.log('App is starting');
      loadToken();
    },
  };
})(UIController, APIController);

// will need to call a method to load the genres on page load
APPController.init();
