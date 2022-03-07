// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';
import checkbox from './completed.js';
import newTask, { pressEnter, editTask } from './tasksArray.js';

let todoItems = [];

const lastItem = document.body.querySelector('.last-item');
const listMain = document.body.querySelector('.todo-list');

function tasksHTML() {
  const stringifiedTasks = JSON.stringify(todoItems);
  localStorage.setItem('storedTasks', stringifiedTasks);
  document.body.querySelectorAll('.list-task').forEach((element) => {
    element.remove();
  });
  todoItems.sort((a, b) => a.index - b.index);
  let i = 0;
  todoItems.forEach((task) => {
    const content = document.createElement('li');
    content.innerHTML = `<p class="checkbox">&#9634;</p> <p class="task-description">${task.description}<p> <p class="list-span list-move">&#xFE19;</p>`;
    content.id = i;
    content.classList.add('list-item', 'list-task');

    if (task.completed === true) {
      content.classList.add('mark-completed');
    }
    listMain.insertBefore(content, lastItem);
    i += 1;
  });
  document.body.querySelectorAll('.task-description').forEach((element) => {
    element.contentEditable = true;
    editTask(element, todoItems, tasksHTML);
  });
  checkbox(todoItems, tasksHTML);
}

document.body.querySelector('.list-button').onclick = () => {
  const newInputTask = newTask(tasksHTML.length + 1);
  if (newInputTask.description === '') {
    return;
  }
  todoItems.push(newInputTask);
  const stringifiedTasks = JSON.stringify(todoItems);
  localStorage.setItem('storedTasks', stringifiedTasks);
  tasksHTML();
};

if (localStorage.getItem('storedTasks')) {
  todoItems = JSON.parse(localStorage.getItem('storedTasks'));
  tasksHTML();
}

const removeComplete = document.body.querySelector('.last-item');

function removeCompleted() {
  const filteredTodoItems = todoItems.filter((i) => i.completed === false);
  todoItems = filteredTodoItems;
  let i = 0;
  todoItems.forEach((task) => {
    task.index = i;
    i += 1;
  });
  todoItems = filteredTodoItems;
  tasksHTML();
}

pressEnter();

removeComplete.onclick = removeCompleted;
