/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';
import checkboxFunctionality from './completed.js';
import newTask, {
  enterToAddTask,
  editTask,
  removeCompleted,
} from './tasksArray.js';

let todoItems = [];

const lastItem = document.body.querySelector('.last-item');
const listMain = document.body.querySelector('.todo-list');

const addIndexToTasks = (todoItems) => {
  todoItems.forEach((task, i) => {
    task.index = i;
    i += 1;
  });
};

const clearTasksList = () => {
  document.body.querySelectorAll('.list-task').forEach((element) => {
    element.remove();
  });
};

const renderTask = (task, index) => {
  const content = document.createElement('li');
  content.id = index;
  content.classList.add('list-item', 'list-task');

  const checkbox = document.createElement('p');
  checkbox.classList.add('checkbox');
  checkbox.innerText = '\u25A2';
  checkboxFunctionality(checkbox, renderTasksList, todoItems, index);

  const taskText = document.createElement('p');
  taskText.classList.add('task-description');
  taskText.innerText = task.description;
  taskText.contentEditable = true;
  taskText.addEventListener('focus', () => {
    editTask(taskText, todoItems, index, renderTasksList);
  });

  const listMove = document.createElement('p');
  listMove.classList.add('list-move');
  listMove.innerText = '\uFE19';

  content.append(checkbox, taskText, listMove);

  if (task.completed === true) {
    content.classList.add('mark-completed');
    checkbox.innerText = '\u2714';
  }
  listMain.insertBefore(content, lastItem);
};

function renderTasksList() {
  addIndexToTasks(todoItems);

  const stringifiedTasks = JSON.stringify(todoItems);
  localStorage.setItem('storedTasks', stringifiedTasks);

  clearTasksList();

  todoItems.sort((a, b) => a.index - b.index);
  todoItems.forEach((task, index) => {
    renderTask(task, index);
  });
}

enterToAddTask();

document.body.querySelector('.list-button').onclick = () => {
  const newInputTask = newTask(todoItems.length);
  if (newInputTask.description === '') {
    return;
  }
  todoItems.push(newInputTask);
  renderTasksList();
};

if (localStorage.getItem('storedTasks')) {
  todoItems = JSON.parse(localStorage.getItem('storedTasks'));
  renderTasksList();
}

const removeComplete = document.body.querySelector('.last-item');

removeComplete.onclick = () => {
  todoItems = removeCompleted(todoItems);
  renderTasksList();
};
