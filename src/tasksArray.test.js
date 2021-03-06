/**
 * @jest-environment jsdom
 */

import newTask, {
  removeTask,
  editTask,
  removeCompleted,
} from './tasksArray.js';

document.body.innerHTML = '<div>'
  + ' <ul id="list">'
  + '   <li> <textarea placeholder="Add to your list..." class="list-text" contenteditable="true">test</textarea><button type="button" class="list-button">⏎</button></li>'
  + '   <li id="0" class="list-item list-task"><p class="checkbox">▢</p> <p class="task-description" contenteditable="true">test 0</p><p> </p><p class="list-span list-move">︙</p></li>'
  + '   <li id="1" class="list-item list-task"><p class="checkbox">▢</p> <p class="task-description" contenteditable="true">test 1</p><p> </p><p class="list-span list-move">︙</p></li>'
  + '   <li id="2" class="list-item list-task"><p class="checkbox">▢</p> <p class="task-description" contenteditable="true">test 2</p><p> </p><p class="list-span list-move">︙</p></li>'
  + ' </ul>'
  + '</div>';

const array = [
  {
    index: 0,
    description: 'test 0',
    completed: false,
  },
  {
    index: 1,
    description: 'test 1',
    completed: true,
  },
  {
    index: 2,
    description: 'test 2',
    completed: false,
  },
];

function MockrenderTasksList() {
  return 'renderTasksList';
}

const event = new KeyboardEvent('keydown', { keyCode: 13 });

// const element0 = document.getElementById('0');
// const element1 = document.getElementById('1');
const element2 = document.getElementById('2');

describe('Test newTask', () => {
  document.querySelector('.list-text').value = 'clicked add';

  test('Check for correct output', () => {
    expect(newTask(1)).toStrictEqual({
      index: 1,
      description: 'clicked add',
      completed: false,
    });
  });

  test('Make sure the textbox resets', () => {
    newTask(1);
    const textbox = document.querySelector('.list-text').value;
    expect(textbox).toBe('');
  });
});

describe('remove a task', () => {
  test('Check if task is removed from the array', () => {
    const trash = document.body.querySelector('.list-move');
    removeTask(trash, array);
    expect(array).toStrictEqual([
      {
        index: 1,
        description: 'test 1',
        completed: true,
      },
      {
        index: 2,
        description: 'test 2',
        completed: false,
      },
    ]);
  });
});

describe('remove all completed', () => {
  test('Check if completed task are removed', () => {
    array[2] = {
      index: 3,
      description: 'test',
      completed: true,
    };
    expect(removeCompleted(array)).toStrictEqual([
      {
        index: 2,
        description: 'test 2',
        completed: false,
      },
    ]);
  });
});

describe('Edit Task', () => {
  const element = document.body.querySelectorAll('.task-description')[0];
  test('Check if task is put into editor mode', () => {
    editTask(element, array, 0, MockrenderTasksList);
    element.focus();
    expect(element.parentElement.style.backgroundColor).toBe('lightyellow');
  });

  test('Check if task is edited on enter', () => {
    editTask(element2, array, 2, MockrenderTasksList);
    element2.innerText = 'edited test';
    element2.dispatchEvent(event);
    expect(array[2].description).toBe('edited test');
  });
});
