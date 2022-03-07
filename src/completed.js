export default function checkbox(todoItems, tasksHTML) {
  document.body.querySelectorAll('.checkbox').forEach((checkbox) => {
    checkbox.onclick = function () {
      const index = todoItems[checkbox.parentElement.id];
      index.completed = !index.completed;
      tasksHTML();
    };
  });
}
