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

  deleteAlbum(id) {
    let allAlbums = this.getAllAlbums();
    allAlbums = allAlbums.filter((task) => task.id != id);
    return writeArrayToLS(this.key, allAlbum);
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
