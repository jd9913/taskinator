var formEl = document.querySelector("#task-form");//finds the <form> element in the page and saves it to the variable formEl
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {

    event.preventDefault(); //stop the browser from automatically reloading the page--default behavior from legacy systems

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);




}







formEl.addEventListener("submit", createTaskHandler);//uses a form specific event called submit (or onsubmit) listening for 2 events within the context of the form--clicking button or pressing enter



