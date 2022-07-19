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
