export default function checkbox(todoItems) {
  document.body.querySelectorAll('.checkbox').forEach((checkbox) => {
    checkbox.onclick = function () {
      checkbox.parentElement.classList.toggle('mark-completed');
      const index = todoItems[checkbox.parentElement.id];
      index.completed = !index.completed;
      const stringifiedTasks = JSON.stringify(todoItems);
      localStorage.setItem('storedTasks', stringifiedTasks);
    };
  });
}
