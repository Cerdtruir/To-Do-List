// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';
import checkbox from './completed.js';

let todoItems = [
  { index: 1, description: 'Eat Lunch', completed: false },
  { index: 0, description: 'Eat Breakfast', completed: false },
  { index: 2, description: 'Eat Supper', completed: false },
];

const lastItem = document.body.querySelector('.last-item');
const listMain = document.body.querySelector('.todo-list');

function tasksHTML() {
  document.body.querySelectorAll('.list-task').forEach((element) => {
    element.remove();
  });

  todoItems.sort((a, b) => a.index - b.index);
  let i = 0;
  todoItems.forEach((task) => {
    const content = document.createElement('li');
    content.innerHTML = `<span class="checkbox">&#9634;</span> ${task.description} <span class="list-span list-move">&#xFE19;</span>`;
    content.id = i;
    content.classList.add('list-item', 'list-task');
    if (task.completed === true) {
      content.classList.add('mark-completed');
    }
    listMain.insertBefore(content, lastItem);
    i += 1;
  });

  checkbox(todoItems);
}

if (localStorage.getItem('storedTasks')) {
  todoItems = JSON.parse(localStorage.getItem('storedTasks'));
  tasksHTML();
}

const removeComplete = document.body.querySelector('.last-item');

function removeCompleted() {
  for (let i = 0; i < todoItems.length; i += 1) {
    const aaa = todoItems[i];
    if (aaa.completed === true) {
      todoItems.splice(i, 1);
      console.log(todoItems);
      i -= 1;
    }
  }
  const stringifiedTasks = JSON.stringify(todoItems);
  localStorage.setItem('storedTasks', stringifiedTasks);
  tasksHTML();
}

removeComplete.onclick = removeCompleted;
