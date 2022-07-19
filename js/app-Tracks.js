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
  getAllArtists() {
    const allArtists = readFromLS(this.key);
    return allArtists;
  }
  getcompletedTasks() {
    let allTasks = this.getAllTasks();
    let completedTasks = allTasks.filter((task) => task.completed == true);
    return completedTasks;
  }

  getActiveTasks() {
    let allTasks = this.getAllTasks();
    let activeTasks = allTasks.filter((task) => task.completed == false);
    return activeTasks;
  }

  deleteArtist(id) {
    let allArtists = this.getAllArtists();
    allArtists = allArtists.filter((task) => task.id != id);
    return writeArrayToLS(this.key, allArtists);
  }
  completedTasks(id) {
    let allTasks = this.getAllTasks();
    let taskIndex = allTasks.findIndex((task) => task.id == id);

    allTasks[taskIndex].completed = true;

    return writeArrayToLS(this.key, allTasks);
  }
  uncompleteTasks(id) {
    let allTasks = this.getAllTasks();
    let taskIndex = allTasks.findIndex((task) => task.id == id);

    allTasks[taskIndex].completed = false;

    return writeArrayToLS(this.key, allTasks);
  }
}
