import checkbox from './completed';

const array = [
  {
    index: 0,
    description: 'test',
    completed: false,
  },
  {
    index: 1,
    description: 'test',
    completed: false,
  },
  {
    index: 2,
    description: 'test',
    completed: false,
  },
];

document.body.innerHTML = '<div>'
  + ' <ul id="list">'
  + '   <li> <textarea placeholder="Add to your list..." class="list-text" contenteditable="true">test</textarea></li>'
  + '   <li id="0" class="list-item list-task"><p class="checkbox">▢</p> <p class="task-description" contenteditable="true">test</p><p> </p><p class="list-span list-move">︙</p></li>'
  + '   <li id="1" class="list-item list-task"><p class="checkbox">▢</p> <p class="task-description" contenteditable="true">test</p><p> </p><p class="list-span list-move">︙</p></li>'
  + '   <li id="2" class="list-item list-task"><p class="checkbox">▢</p> <p class="task-description" contenteditable="true">test</p><p> </p><p class="list-span list-move">︙</p></li>'
  + ' </ul>'
  + '</div>';

function MocktasksHTML() {
  return 'tasksHtml';
}

test('make sure array is changing to completed', () => {
  checkbox(array, MocktasksHTML);
  document.body.querySelectorAll('.checkbox')[1].click();
  expect(array[1].completed).toBe(true);
});
