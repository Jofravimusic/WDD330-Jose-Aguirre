import Albums from './app-Album.js';
import Artists from './app-Artists.js';
import Playlists from './app-Playlists.js';
import Tracks from './app-Tracks.js';
import {
  createAlbumDetail,
  createArtistDetail,
  createPlaylistDetail,
  createTrackDetail,
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
      };
    },

    // need methods to create select list option
    createGenre(text, value) {
      const html = `<option value="${value}">${text}</option>`;
      document
        .querySelector(DOMElements.selectGenre)
        .insertAdjacentHTML('beforeend', html);
    },

    createPlaylist(text, value) {
      const html = `<option value="${value}">${text}</option>`;
      document
        .querySelector(DOMElements.selectPlaylist)
        .insertAdjacentHTML('beforeend', html);
    },

    // need method to create a track list group item
    createLink(id, name, type) {
      const html = `<a href="#" value="${type}" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a><br>`;
      document
        .querySelector(DOMElements.divSonglist)
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

    resetTrackDetail() {
      this.inputField().songDetail.innerHTML = '';
    },

    resetTracks() {
      this.inputField().endpoints.innerHTML = '';
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
  });

  // create submit button click event listener
  DOMInputs.submit.addEventListener('click', async (e) => {
    // prevent page reset
    e.preventDefault();
    // clear tracks
    UICtrl.resetTracks();
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
  document.saveEndpoint = function saveEndpoint(endpoint, type) {
    switch (type) {
      case 'album':
        Album.addNewAlbum(
          endpoint.id,
          endpoint.name,
          endpoint.tracks,
          endpoint.artists
        );
        break;
      case 'artist':
        Artist.addNewArtist(
          endpoint.id,
          endpoint.name,
          endpoint.images[0].url,
          endpoint.external_urls.spotify
        );
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
        break;
    }
  };
  // create song selection click event listener
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

    //Album.addNewAlbum(track.id, track.name, track.tracks, track.artists);
    /*Artist.addNewArtist(
      track.id,
      track.name,
      track.images[0].url,
      track.external_urls.spotify
    );*/

    /*Playlist.addNewPlaylist(
      track.id,
      track.name,
      track.description,
      track.external_urls.spotify,
      track.owner.display_name,
      track.tracks.items
    );*/

    /*Track.addNewTrack(
      track.id,
      track.name,
      track.album,
      track.artists,
      track.external_urls.spotify,
      track.preview_url,
      track.album.images[0].url
    );*/
    const type = UICtrl.inputField().type.value;
    // load the track details
    UICtrl.createEndpointDetail(endpoint, type);
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
