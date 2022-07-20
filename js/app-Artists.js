import { readFromLS, writeToLS, writeArrayToLS } from '../js/ls.js';

export default class Artists {
  constructor(key) {
    this.key = key;
  }
  addNewArtist(id, name, image, spotifyURL) {
    const artist = {
      id: id,
      name: name,
      image: image,
      spotifyURL: spotifyURL,
    };
    writeToLS(this.key, artist);
  }
  getAllArtists() {
    const allArtists = readFromLS(this.key);
    return allArtists;
  }
  getOneArtist(id) {
    let allArtists = this.getAllArtists();
    let artist = allArtists.filter((artist) => artist.id == id);
    return artist;
  }

  deleteArtist(id) {
    let allArtists = this.getAllArtists();
    allArtists = allArtists.filter((task) => task.id != id);
    return writeArrayToLS(this.key, allArtists);
  }
}
