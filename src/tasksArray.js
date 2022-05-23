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

export function removeCompleted(todoItems) {
  todoItems = todoItems.filter((i) => i.completed === false);
  return todoItems;
}

export function removeTask(trash, array) {
  array.splice(trash.parentElement.id, 1);
}

export function editTask(element, todoItems, index, renderTasksList) {
  element.parentElement.style.backgroundColor = 'lightyellow';
  let deletedID = false;
  const trash = element.parentElement.querySelector('.list-move');
  trash.innerHTML = '&#128465;';
  trash.classList.add('trash');
  trash.onmousedown = function () {
    deletedID = true;
    removeTask(trash, todoItems);
  };
  // Save on click away
  element.addEventListener('blur', () => {
    if (deletedID === false) {
      const changedID = element.parentElement.id;
      todoItems[changedID].description = element.innerText;
    }
    renderTasksList();
  });
  // Save on enter
  element.onkeydown = function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      todoItems[index].description = element.innerText;
      const stringifiedTasks = JSON.stringify(todoItems);
      localStorage.setItem('storedTasks', stringifiedTasks);
      this.blur();
      renderTasksList();
    }
  };
}
