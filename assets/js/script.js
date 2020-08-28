var taskIdCounter = 0;


var formEl = document.querySelector("#task-form");//finds the <form> element in the page and saves it to the variable formEl
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("tasks-in-progress");
var tasksCompletedEl = document.querySelector("#page-content");
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function (event) {

    event.preventDefault(); //stop the browser from automatically reloading the page--default behavior from legacy systems

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the taks form!");
        return false;
    }

    //reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    //check if task is new or one being edited by seeing if it has a data-task-id attribute

    var isEdit = formEl.hasAttribute("data-task-id");

    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completedEditTask(taskNameInput, taskTypeInput, taskId);
    } else {

        //package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
        //send it an an argument to createTaskEl
        createTaskEl(taskDataObj);
    }
};



var createTaskEl = function (taskDataObj) {

    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    listItemEl.setAttribute("draggable", "true");

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);

    //increase task counter for next unique ID

    taskIdCounter++;
};

var createTaskActions = function (taskId) {
    //create container to hold elements
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    //create delete button

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    //create change status dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    statusSelectEl.className = "select-status";
    actionContainerEl.appendChild(statusSelectEl);

    //create status options

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.setAttribute("value", statusChoices[i]);
        statusOptionEl.textContent = statusChoices[i];

        //append to selected element
        statusSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
};

var completedEditTask = function (taskName, taskType, taskId) {
    //find task list item with taskId value
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']";

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    //remove data attribute from form
    formEl.removeAttribute("data-task-id");
    //update formEl button to go back to saying "Add Task" instead of "Edit Task"

    formEl.querySelector("#save-task").textContent = "Add Task";
};

var taskButtonHandler = function (event) {
    //get target element from event

    var targetEl = event.target;

    if (targetEl.matches(".edit-btn")) {
        console.log("edit", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } else if (targetEl.matches(".delete-btn")) {
        console.log("delete", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var taskStatusChangeHandler = function (event) {
    console.log(event.target.value);

    //find task list item based on event.target's data-task-id attribute

    var taskId = event.target.getAttribute("data-task-id");

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //convert value to lower case

    var statusValue = event.target.value.toLowerCase();

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
};

var editTask = function (taskId) {
    console.log(taskId);

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelecto("span.task-type").textContent;
    console.log(taskType);

    //write values of taskname and taskType to for to be edited
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    //set data attribute to the form with a value of the task's id so it knows which one is being edited
    formEl.setAttribute("data-task-id", taskId);
    //update form's button to reflect editing a task rather that creating a new one
    formEl.querySelector("#save-task").textContent = "Save Task";

};


var deleteTask = function (taskId) {
    console.log(taskId);
    //find task list element with taskId value and remove it

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};


var dropTaskHandler = function (event) {
    event.preventDefault();
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZone = event.target.closest(".task-list");
    dropZone.removeAttribute("style");

    //set status of task based on dropzone id

    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    var statusType = dropZone.id;

    switch (statusType) {
        case "tasks-to-do":
            statusSelectEl.selectedIndex = 0;
            break;
        case "tasks-in-progress":
            statusSelecteEl.selectedIndex = 2;
            break;
        case "tasks-completed":
            statusSelectEl.selectedIndex = 2;
            break;
        default:
            console.log("something went wrong!");
    }

    dropZone.appendChild(draggableElement);
};

//defines the drop zone
var dropZoneDragHandler = function (event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
        taskListEl.setAttribute("style", "background: rgba(68,233,255,0.7)); border-style: dashed;");
    }
};


var dragTaskHandler = function (event) {
    if (evetn.target.matches("li.task-item")) {
        var taskId = event.target.getAttribute("data-task-id");
        event.dataTransfer.setData("text/plain", taskId);
    }
};

var dragLeaveHandler = function (event) {
    var taskListEl = event.target.closest(".task-list");

    if (taskListEl) {
        event.target.closest(".task-list").removeAttribute("style");
    }
};



//create a new task--uses a form specific event called submit (or onsubmit) listening for 2 events within the context of the form--clicking button or pressing enter
formEl.addEventListener("submit", taskFormHandler);

//for edit and delete buttons

pageContentEl.addEventListener("click", taskButtonHandler);

//for changing the status

pageContentEl.addEventListener("change", taskStatusChangeHandler);

//for dragging
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);


