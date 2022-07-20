import { readFromLS, writeToLS, writeArrayToLS } from '../js/ls.js';

export default class Albums {
  constructor(key) {
    this.key = key;
  }
  addNewAlbum(id, name, tracks, artists) {
    const album = {
      id: id,
      name: name,
      tracks: tracks,
      artists: artists,
    };
    writeToLS(this.key, album);
  }
  getAllAlbums() {
    const allAlbums = readFromLS(this.key);
    return allAlbums;
  }
  getOneAlbum(id) {
    let allAlbums = this.getAllAlbums();
    let album = allAlbums.filter((album) => album.id == id);
    return album;
  }

  deleteAlbum(id) {
    let allAlbums = this.getAllAlbums();
    allAlbums = allAlbums.filter((album) => album.id != id);
    return writeArrayToLS(this.key, allAlbums);
  }
}
