export default function newTask(index) {
  const taskText = document.body.querySelector('.list-text').value;
  const output = { index, description: taskText, completed: false };
  document.body.querySelector('.list-text').value = '';
  return output;
}

export function enterToAddTask() {
  document.body.querySelector('.list-text').onkeydown = function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.querySelector('.list-button').click();
    }
  };
}

export function editTask(element, array, tasksHTML) {
  // Enter to save
  element.onkeydown = function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      array[this.parentElement.id].description = element.innerHTML;
      const stringifiedTasks = JSON.stringify(array);
      localStorage.setItem('storedTasks', stringifiedTasks);
      this.blur();
    }
  };
  // click on to edit
  element.addEventListener('focus', function () {
    let deletedID = false;
    this.parentElement.style.backgroundColor = 'lightyellow';
    const trash = this.parentElement.querySelector('.list-move');
    trash.innerHTML = '&#128465;';
    trash.classList.add('trash');
    trash.onmousedown = function () {
      deletedID = true;
      array.splice(trash.parentElement.id, 1);
    };
    // Save on click away
    element.addEventListener('blur', () => {
      if (deletedID === false) {
        const changedID = this.parentElement.id;
        array[changedID].description = element.innerHTML;
      }
      tasksHTML();
    });
  });
}
