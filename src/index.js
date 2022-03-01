import _ from 'lodash';
import './style.css';

let todoItems = [
  { index: 1, description: 'Eat Lunch', completed: false },
  { index: 0, description: 'Eat Breakfast', completed: false },
  { index: 2, description: 'Eat Supper', completed: false },
];

let currentIndex = 0;
for (let i = 0; i < todoItems.length; i++) {
  const task = todoItems[i];
  if (task.index === currentIndex) {
    let content = document.createElement('li');
    content.innerHTML = `<span class="checkbox">&#9634;</span> ${task.description} <span class="list-span list-move">&#xFE19;</span>`;
    content.classList.add('list-item');
    let lastItem = document.body.querySelector('.last-item');
    let listMain = document.body.querySelector('.todo-list');
    listMain.insertBefore(content, lastItem);
    currentIndex += 1;
    i = -1;
  }
}
