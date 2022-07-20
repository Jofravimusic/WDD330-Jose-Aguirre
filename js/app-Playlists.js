import { readFromLS, writeToLS, writeArrayToLS } from '../js/ls.js';

export default class Playlists {
  constructor(key) {
    this.key = key;
  }
  addNewPlaylist(id, name, description, spotifyURL, owner, tracks) {
    const playlist = {
      id: id,
      name: name,
      description: description,
      spotifyURL: spotifyURL,
      owner: owner,
      tracks: tracks,
    };
    writeToLS(this.key, playlist);
  }
  getAllPlaylists() {
    const allPlaylists = readFromLS(this.key);
    return allPlaylists;
  }
  getOnePlaylist(id) {
    let allPlaylists = this.getAllPlaylists();
    let playlist = allPlaylists.filter((playlist) => playlist.id == id);
    return playlist;
  }
  deletePlaylist(id) {
    let allPlaylists = this.getAllPlaylists();
    allPlaylists = allPlaylists.filter((playlist) => playlist.id != id);
    return writeArrayToLS(this.key, allPlaylists);
  }
}
