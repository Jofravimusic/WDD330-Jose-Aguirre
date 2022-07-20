import { readFromLS, writeToLS, writeArrayToLS } from '../js/ls.js';

export default class Tracks {
  constructor(key) {
    this.key = key;
  }
  addNewTrack(id, name, album, artists, spotifyURL, preview, image) {
    const track = {
      id: id,
      name: name,
      album: album,
      artists: artists,
      spotifyURL: spotifyURL,
      preview: preview,
      image: image,
    };
    writeToLS(this.key, track);
  }
  getAllTracks() {
    const allTracks = readFromLS(this.key);
    return allTracks;
  }
  getOneTrack(id) {
    let allTracks = this.getAllTracks();
    let track = allTracks.filter((track) => track.id == id);
    return track;
  }

  deleteTrack(id) {
    let allTracks = this.getAllTracks();
    allTracks = allTracks.filter((track) => track.id != id);
    return writeArrayToLS(this.key, allTracks);
  }
}
