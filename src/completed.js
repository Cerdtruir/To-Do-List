export default function checkbox(todoItems, tasksHTML) {
  document.body.querySelectorAll('.checkbox').forEach((box) => {
    box.onclick = function () {
      todoItems[box.parentElement.id].completed = !todoItems[box.parentElement.id].completed;
      tasksHTML();
    };
  });
}
