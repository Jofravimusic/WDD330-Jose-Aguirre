/**
 * read a value from local storage and parse it as JSON
 * @param  {string} key The key under which the value is stored under in LS
 * @return {array}     The value as an array of objects
 */
export function readFromLS(key) {
  let allTasks = JSON.parse(localStorage.getItem(key));
  return allTasks;
}
/**
  * write an array of objects to local storage under the provided key
  * @param  {string} key The key under which the value is stored under in LS
 * @param {array} data The information to be stored as an array of objects. Must be serialized.
  
  */

export function writeToLS(key, data) {
  let todos = [];

  if (!localStorage.getItem(key)) {
    todos.push(data);
    return localStorage.setItem(key, JSON.stringify(todos));
  }
  let allTasks = JSON.parse(localStorage.getItem(key));
  todos = allTasks;
  todos.push(data);
  localStorage.setItem(key, JSON.stringify(todos));
}

export function writeArrayToLS(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
