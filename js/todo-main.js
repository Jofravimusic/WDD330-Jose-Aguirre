import Todos from './Todos.js';
import { createToDoList } from './utilities.js';

const keyName = 'todos';
const Todo = new Todos(keyName);

document.addTask = function addTask() {
  let newTask = document.getElementById('add-input').value;
  if (!newTask) {
    return window.alert('Add a task name');
  }
  Todo.addNewTask(newTask);
  document.showAllTasks();
  document.getElementById('add-input').value = '';
  document.getElementById('add-input').focus();
};

document.deleteTask = function deleteTask(id) {
  Todo.deleteTask(id);
  document.showAllTasks();
};

document.completeTask = function completeTask(id) {
  const completeCheck = document.querySelector(`#task-${id}`);
  if (completeCheck.checked) {
    Todo.completedTasks(id);
  } else {
    Todo.uncompleteTasks(id);
  }
};

document.showAllTasks = function showAllTasks() {
  const activeTasks = Todo.getActiveTasks();
  document.getElementById(
    'total-number'
  ).textContent = `${activeTasks.length} tasks left`;
  createToDoList(Todo.getAllTasks());
};

document.showCompletedTasks = function showCompletedTasks() {
  const completedTasks = Todo.getcompletedTasks();
  document.getElementById(
    'total-number'
  ).textContent = `${completedTasks.length} completed tasks`;
  createToDoList(completedTasks);
};

document.showActiveTasks = function showActiveTasks() {
  const activeTasks = Todo.getActiveTasks();
  document.getElementById(
    'total-number'
  ).textContent = `${activeTasks.length} pending tasks`;
  createToDoList(activeTasks);
};

document.addEventListener('onload', document.showAllTasks());

document.querySelector('#add-input').addEventListener(
  'keypress',
  function (e) {
    if (e.key === 'Enter') {
      document.addTask();
    }
  },
  false
);
