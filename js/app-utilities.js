export function createAlbumDetail(album) {
  const artists = album.artists;
  const tracks = album.tracks.items;
  let list = '<ul class="album">';
  list += `
      <input type="hidden" id="album-id" value="${album.id}">
      <li><h2>${album.name}</h2>
      <li>Artists: `;

  for (let artist of artists) {
    list += `${artist.name}, `;
  }

  list += `</li>
      <li>Tracks:</li>
      <ul id="album-tracks">`;

  for (let track of tracks) {
    list += `
        <li>${track.name} - <a href="${track.external_urls.spotify}" target="_blank"> Open on Spotify</a>
        Preview: <video controls="" name="media"><source src="${track.preview_url}" type="audio/mpeg"></video></li>
        `;
  }

  list += `
        
      </ul>

      </ul>
      `;

  return list;
}

export function createArtistDetail(artist) {
  let list = `
    <ul id="artist-display">
        <li><h2>${artist.name}</h2></li>
        <li><img src="${artist.images[0].url}" alt="Artist Photo"></li>
        <li><a href="${artist.external_urls.spotify}" target="_blank">See on Spotify</a></li>
    </ul>
    `;
  return list;
}

export function createPlaylistDetail(playlist) {
  const tracks = playlist.tracks.items;

  console.log(tracks);
  let list = `<ul id="playlist-display">
    <li><h2>${playlist.name}</h2></li>
    <li><p>Description: ${playlist.description}</p></li>
    <li>Owner: ${playlist.owner.display_name}</a>
    <li><a href="${playlist.external_urls.spotify}" target="_blank">Listen playlist on Spotify</a></li>
    <li>Tracks:</li>
    <ul id="album-tracks">
    `;

  for (let track of tracks) {
    list += `
            <li>${track.track.name} - Artists: | `;

    let artists = track.track.artists;

    for (let artist of artists) {
      list += `${artist.name} | `;
    }

    list += `
            <a href="${track.track.external_urls.spotify}" target="_blank"> Open on Spotify</a>
            Preview: <video controls="" name="media"><source src="${track.track.preview_url}" type="audio/mpeg"></video></li>
            `;
  }

  list += `
            
          </ul>
    
          </ul>
          `;
  return list;
}

export function createTrackDetail(track) {
  const artists = track.artists;
  let list = `<ul id="track-display">
    <li><h2>${track.name}</h2></li>
    <li><p>Album: ${track.album.name}</p></li>
    <li>Artists: |
    `;
  for (let artist of artists) {
    list += ` ${artist.name} | `;
  }
  list += `</li>
      <li><img src="${track.album.images[0].url}" alt="Album Photo"></li>
      <li><a href="${track.external_urls.spotify}" target="_blank">Listen on Spotify</a></li>
      <li>Preview:
      <video controls="" name="media"><source src="${track.preview_url}" type="audio/mpeg"></video></li>
      </ul>
      `;
  return list;
}
