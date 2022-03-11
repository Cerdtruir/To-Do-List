import newTask, {
  removeTask,
  editTask,
  removeCompleted,
} from './tasksArray.js';

document.body.innerHTML =
  '<div>' +
  ' <ul id="list">' +
  '   <li> <textarea placeholder="Add to your list..." class="list-text" contenteditable="true">test</textarea><button type="button" class="list-button">⏎</button></li>' +
  '   <li id="0" class="list-item list-task"><p class="checkbox">▢</p> <p class="task-description" contenteditable="true">test 1</p><p> </p><p class="list-span list-move">︙</p></li>' +
  '   <li id="1" class="list-item list-task"><p class="checkbox">▢</p> <p class="task-description" contenteditable="true">test 2</p><p> </p><p class="list-span list-move">︙</p></li>' +
  '   <li id="2" class="list-item list-task"><p class="checkbox">▢</p> <p class="task-description" contenteditable="true">test 3</p><p> </p><p class="list-span list-move">︙</p></li>' +
  ' </ul>' +
  '</div>';

let array = [
  {
    index: 0,
    description: 'test 1',
    completed: false,
  },
  {
    index: 1,
    description: 'test 2',
    completed: true,
  },
  {
    index: 2,
    description: 'test 3',
    completed: false,
  },
];

function MocktasksHTML() {
  return 'tasksHtml';
}

const event = new KeyboardEvent('keydown', { keyCode: 13 });

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
    document.body.innerHTML =
      '<div>' +
      '  <ul id="list"><li id="0" class="list-item list-task"><p class="checkbox">▢</p> <p class="task-description" contenteditable="true">test</p><p> </p><p class="list-span list-move">︙</p></li></ul>' +
      '</div>';
    let array = [
      {
        index: 1,
        description: 'test',
        completed: false,
      },
    ];
    const trash = document.body.querySelector('.list-move');
    removeTask(trash, array);
    expect(array).toStrictEqual([]);
  });
});
