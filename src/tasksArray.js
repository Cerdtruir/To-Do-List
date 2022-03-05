export default function newTask(index) {
  const taskText = document.body.querySelector('.list-text').value;
  const output = { index, description: taskText, completed: false };
  document.body.querySelector('.list-text').value = '';
  return output;
}

export function pressEnter() {
  document.body.querySelector('.list-text').onkeydown = function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.querySelector('.list-button').click();
    }
  };
}

export function editTask(element, array, tasksHTML) {
  element.addEventListener('blur', function () {
    const changedID = this.parentElement.id;
    array[changedID].description = element.innerHTML;
    const stringifiedTasks = JSON.stringify(array);
    localStorage.setItem('storedTasks', stringifiedTasks);
    tasksHTML();
  });
  element.onkeydown = function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      const changedID = this.parentElement.id;
      array[changedID].description = element.innerHTML;
      const stringifiedTasks = JSON.stringify(array);
      localStorage.setItem('storedTasks', stringifiedTasks);
      tasksHTML();
    }
  };
}
