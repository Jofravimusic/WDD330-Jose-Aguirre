export function createToDoList(allTasks) {
  let list = '';
  for (let task of allTasks) {
    list += `<li id="${task['id']}">`;
    if (task.completed) {
      list += `<input type="checkbox" name="task-${task['id']}" id="task-${task['id']}" value="${task['id']}" onchange="completeTask(${task['id']})" checked />`;
    } else {
      list += `<input type="checkbox" name="task-${task['id']}" id="task-${task['id']}" value="${task['id']}" onchange="completeTask(${task['id']})" />`;
    }
    list += `<label for="task-${task['id']}">${task['task']}</label>`;
    list += `<button type="button" onclick="deleteTask(${task['id']})">X</button>`;
    list += `</li>`;
  }

  document.getElementById('todo-list').innerHTML = list;
}
