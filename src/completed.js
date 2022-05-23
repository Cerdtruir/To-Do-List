export default function checkboxFunctionality(checkbox, renderTasksList, todoItems, index) {
  checkbox.onclick = function () {
    todoItems[index].completed = !todoItems[index].completed;
    renderTasksList();
  };
}
