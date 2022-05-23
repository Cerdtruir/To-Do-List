/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';
import checkbox from './completed.js';
import newTask, {
  enterToAddTask,
  editTask,
  removeCompleted,
} from './tasksArray.js';

let todoItems = [];

const lastItem = document.body.querySelector('.last-item');
const listMain = document.body.querySelector('.todo-list');

function tasksHTML() {
  todoItems.forEach((task, i) => {
    task.index = i;
    i += 1;
  });
  const stringifiedTasks = JSON.stringify(todoItems);
  localStorage.setItem('storedTasks', stringifiedTasks);
  document.body.querySelectorAll('.list-task').forEach((element) => {
    element.remove();
  });
  todoItems.sort((a, b) => a.index - b.index);
  let i = 0;
  todoItems.forEach((task) => {
    const content = document.createElement('li');
    content.id = i;
    content.classList.add('list-item', 'list-task');

    const checkbox = document.createElement('p');
    checkbox.classList.add('checkbox');
    checkbox.innerText = '\u25A2';

    const taskText = document.createElement('p');
    taskText.classList.add('task-description');
    taskText.innerText = task.description;

    const listMove = document.createElement('p');
    listMove.classList.add('list-move');
    listMove.innerText = '\uFE19';

    content.append(checkbox, taskText, listMove);

    if (task.completed === true) {
      content.classList.add('mark-completed');
      checkbox.innerText = '\u2714';
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

enterToAddTask();

document.body.querySelector('.list-button').onclick = () => {
  const newInputTask = newTask(todoItems.length);
  if (newInputTask.description === '') {
    return;
  }
  todoItems.push(newInputTask);
  tasksHTML();
};

if (localStorage.getItem('storedTasks')) {
  todoItems = JSON.parse(localStorage.getItem('storedTasks'));
  tasksHTML();
}

const removeComplete = document.body.querySelector('.last-item');

removeComplete.onclick = () => {
  todoItems = removeCompleted(todoItems, tasksHTML);
  tasksHTML();
};
