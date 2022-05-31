import { readFromLS, writeToLS, writeArrayToLS } from '../js/ls.js';

export default class Todos {
  constructor(key) {
    this.key = key;
  }
  addNewTask(newTask) {
    const todo = {
      id: Date.now(),
      task: newTask,
      completed: false,
    };
    writeToLS(this.key, todo);
  }
  getAllTasks() {
    const allTasks = readFromLS(this.key);
    return allTasks;
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

  deleteTask(id) {
    let allTasks = this.getAllTasks();
    allTasks = allTasks.filter((task) => task.id != id);
    return writeArrayToLS(this.key, allTasks);
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
