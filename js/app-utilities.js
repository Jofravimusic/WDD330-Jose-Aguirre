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
    <li><button type='button' id='save' onclick='saveEndpoint("${album.href}", "album")'>Add Album to your library music</button></li>
      <li>Tracks:</li>
      <li><table id="album-tracks">
        <thead>
          <tr>
            <th>Track Name</th>
            <th>Link</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
      `;

  for (let track of tracks) {
    list += `
        <tr>
          <td>${track.name}</td>
          <td><a href="${track.external_urls.spotify}" target="_blank"> Open on Spotify</a></td>
          <td><video controls="" name="media"><source src="${track.preview_url}" type="audio/mpeg"></video></td></tr>
        `;
  }

  list += `</tbody>
          </table
        </li>
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
        <li><button type='button' id='save' onclick='saveEndpoint("${artist.href}", "artist")'>Add Artist to your library music</button></li>
    </ul>
    `;
  return list;
}

export function createPlaylistDetail(playlist) {
  const tracks = playlist.tracks.items;
  console.log(playlist);
  let list = `<ul id="playlist-display">
    <li><h2>${playlist.name}</h2></li>
    <li><p>Description: ${playlist.description}</p></li>
    <li>Owner: ${playlist.owner.display_name}</li>
    <li><a href="${playlist.external_urls.spotify}" target="_blank">Listen playlist on Spotify</a></li>
    <li><button type='button' id='save' onclick='saveEndpoint("${playlist.href}", "playlist")'>Add Playlist to your library music</button></li>
    <li>Tracks:</li>
    <li><table id="album-tracks">
        <thead>
          <tr>
            <th>Track Name</th>
            <th>Artists</th>
            <th>Link on Spotify</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
    `;

  for (let track of tracks) {
    list += `<tr>
            <td>${track.track.name}</td>
            <td>| 
            `;

    let artists = track.track.artists;

    for (let artist of artists) {
      list += `${artist.name} | `;
    }

    list += `</td>

            <td><a href="${track.track.external_urls.spotify}" target="_blank"> Open on Spotify</a></td>
            <td><video controls="" name="media"><source src="${track.track.preview_url}" type="audio/mpeg"></video></td></tr>
            `;
  }

  list += `</tbody>
            </table>
          </li>
    
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
      <li><button type='button' id='save' onclick='saveEndpoint("${track.href}", "track")'>Add Track to your library music</button></li>
      </ul>
      `;
  return list;
}

export function savedAlbumDetail(album) {
  album = album[0];
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
    <li><button type='button' id='delete' onclick='deleteSaved("${album.id}", "album")'>Delete Album from your library music</button></li>
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

export function savedArtistDetail(artist) {
  artist = artist[0];
  let list = `
    <ul id="artist-display">
        <li><h2>${artist.name}</h2></li>
        <li><img src="${artist.image}" alt="Artist Photo"></li>
        <li><a href="${artist.spotifyURL}" target="_blank">See on Spotify</a></li>
        <li><button type='button' id='delete' onclick='deleteSaved("${artist.id}", "artist")'>Delete Artist from your library music</button></li>
    </ul>
    `;
  return list;
}

export function savedPlaylistDetail(playlist) {
  playlist = playlist[0];

  const tracks = playlist.tracks;

  let list = `<ul id="playlist-display">
    <li><h2>${playlist.name}</h2></li>
    <li><p>Description: ${playlist.description}</p></li>
    <li>Owner: ${playlist.owner}</li>
    <li><a href="${playlist.spotifyURL}" target="_blank">Listen playlist on Spotify</a></li>
    <li><button type='button' id='delete' onclick='deleteSaved("${playlist.id}", "playlist")'>Delete Playlist from your library music</button></li>
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

export function savedTrackDetail(track) {
  track = track[0];
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
      <li><a href="${track.spotifyURL}" target="_blank">Listen on Spotify</a></li>
      <li>Preview:
      <video controls="" name="media"><source src="${track.preview}" type="audio/mpeg"></video></li>
      <li><button type='button' id='delete' onclick='deleteSaved("${track.id}", "track")'>Delete Track from your library music</button></li>
      </ul>
      `;
  return list;
}
