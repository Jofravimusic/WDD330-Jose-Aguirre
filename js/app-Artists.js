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
