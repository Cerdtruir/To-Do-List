import newTask, { removeTask } from './tasksArray.js';

describe('Test newTask', () => {
  test('Check for correct output', () => {
    document.body.innerHTML =
      '<div>' +
      '  <ul id="list"><li> <textarea placeholder="Add to your list..." class="list-text" contenteditable="true">test</textarea></li></ul>' +
      '</div>';
    expect(newTask(1)).toStrictEqual({
      index: 1,
      description: 'test',
      completed: false,
    });
  });

  test('Make sure the textbox resets', () => {
    document.body.innerHTML =
      '<div>' +
      '  <ul id="list"><li> <textarea placeholder="Add to your list..." class="list-text" contenteditable="true">test</textarea></li></ul>' +
      '</div>';
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
