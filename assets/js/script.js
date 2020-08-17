var formEl = document.querySelector("#task-form");//finds the <form> element in the page and saves it to the variable formEl
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {

    event.preventDefault(); //stop the browser from automatically reloading the page--default behavior from legacy systems

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;



    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the taks form!");
        return false;
    }
    formEl.reset();


    //package up data as an object

    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it an an argument to createTaskEl
    createTaskEl(taskDataObj);

}

var createTaskEl = function (taskDataObj) {

    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);


}







formEl.addEventListener("submit", taskFormHandler);//uses a form specific event called submit (or onsubmit) listening for 2 events within the context of the form--clicking button or pressing enter



