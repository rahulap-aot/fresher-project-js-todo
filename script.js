function showtask() {
    document.getElementsByClassName('add-task')[0].style.display = 'block';
    document.getElementById('main-body').style.opacity = 0.3;
}

function hidetask() {
    document.getElementsByClassName('add-task')[0].style.display = 'none';
    document.getElementById('main-body').style.opacity = 1;
}

let mydata = JSON.parse(localStorage.getItem('mydata')) || [];

const tasklist = document.getElementById('task-list');
const completedTaskList = document.getElementById('task-complete');
const update = document.getElementById('update');
const del = document.getElementById('delete1');

function savetask() {
    let head = document.getElementById('head').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let completed_task = false;
    if (head) {
        let task = { head, description, date, completed_task };
        mydata.push(task);
        localStorage.setItem('mydata', JSON.stringify(mydata));
        window.location.reload();
    }
}

function showtask1() {
    document.getElementsByClassName('delete1')[0].style.display = 'block';
    document.getElementById('main-body').style.opacity = 0.3;
}

function hidetask1() {
    document.getElementsByClassName('delete1')[0].style.display = 'none';
    document.getElementById('main-body').style.opacity = 1;
}

function deletetask(i) {
    del.innerHTML = `<div class="task-delete">
            <p class="task-delete-heading">Delete Task</p>
            <p class="task-delete-content-heading">Are you sure you want to delete this task?</p>
            <div class="task-delete-footer">
                <button type="button" class="btn11" onclick="hidetask1()">Cancel</button>
                <button type="button" class="btn21" onclick="permitdelete(${i}); hidetask1();">Delete</button>
            </div>
            </div>`;
}

$(document).ready(function () {
    $('body').on('change', '.custom-checkbox', function () {
        var i = $(this).data('index');
        mydata[i].completed_task = !mydata[i].completed_task;
        updateLocalStorage();
        displaytask();
    });
});

function permitdelete(index) {
    mydata.splice(index, 1);
    updateLocalStorage();
    displaytask();
}

function updateLocalStorage() {
    localStorage.setItem('mydata', JSON.stringify(mydata));
}

function displaytask() {
    tasklist.innerHTML = '';
    completedTaskList.innerHTML = '';

    const activeTasks = mydata.filter(task => !task.completed_task);
    const completedTasks = mydata.filter(task => task.completed_task);

    activeTasks.forEach((task, i) => {
        const taskElement = createTaskElement(task, i);
        tasklist.appendChild(taskElement);
    });

    completedTasks.forEach((task, i) => {
        const taskElement = createTaskElement(task, i);
        completedTaskList.appendChild(taskElement);
    });
}

function createTaskElement(task, index) {
    const div = document.createElement('div');
    div.className = 'task-x';

    const today = new Date();
    const taskDate = new Date(task.date);
    const isPastDue = taskDate < today;

    div.innerHTML = `
        <div class="inner-taskspace">
            <div class="custom-checkbox-container">
                <input type="checkbox" id="customCheckbox${index}" class="custom-checkbox" data-index="${index}" ${task.completed_task ? 'checked' : ''}>
                <label for="customCheckbox${index}" class="custom-checkbox-label"></label>
            </div>
            <div class="task-card">
                <div class="task-header">
                    <div class="name-tik">
                        <p class="task-name">${task.head}</p>
                        <span class="${task.completed_task ? 'span-green' : 'span-yellow'}"></span>
                    </div>
                    <div class="edit-delete">
                        <img class="edit-icon" src="images/Group 817.svg" onclick="updatetask(${index}); showtask();">
                        <img class="delete-icon" onclick="deletetask(${index}); showtask1();" src="images/Group.svg">
                    </div>
                </div>
                <p class="task-paragraph">${task.description}</p>
                <div class="${isPastDue ? 'past-due' : 'col-date'}">
                    <img class="col-img" src="${isPastDue ? 'images/colondered.svg' : 'images/calendar_month_black_24dp 2.svg'}">
                    <p class="by-date">by ${task.date}</p>
                </div>
            </div>
        </div>
    `;
    return div;
}

function updatetask(index) {
    let task = mydata[index];
    update.innerHTML = `
    <div class="add-task">
        <div class="add-task-head">
            <p class="add-task-heading">Add Task</p>
            <img class="close-icon" src="images/x.svg" onclick="hidetask()">
        </div>
        <hr>
        <div class="add-task-content">
            <div class="add-task-content-title">
                <p class="add-task-content-heading">Title *</p>
                <input type="text" class="add-task-content-head" id="head" value="${task.head}">
            </div>
            <div class="add-task-content-description">
                <p class="add-task-content-description1">Description</p>
                <input type="text" class="add-task-content-testarea" id="description" value="${task.description}">
            </div>
            <div class="add-task-content-date">
                <p class="add-task-content-date1">Date</p>
                <input type="date" id="date" class="add-task-content-date-input" value="${task.date}">
            </div>
            <hr>
            <div class="add-task-footer">
                <button type="button" class="btn1 btn-primary btn-sm" onclick="hidetask()">Cancel</button>
                <button type="button" class="btn2 btn-primary btn-sm" onclick="updatesave(${index})">Save</button>
            </div>
        </div>
    </div>
    `;
}

function updatesave(index) {
    let head = document.getElementById('head').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    mydata[index] = { ...mydata[index], head, description, date };
    localStorage.setItem('mydata', JSON.stringify(mydata));
    window.location.reload();
    hidetask();
}

document.addEventListener('DOMContentLoaded', () => {
    sortTasks();
    displaytask();
});

function searchTasks() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredTasks = mydata.filter(task => task.head.toLowerCase().includes(query));
    displayFilteredTasks(filteredTasks);
}

function displayFilteredTasks(tasks) {
    tasklist.innerHTML = '';
    completedTaskList.innerHTML = '';

    tasks.forEach((task, i) => {
        const taskElement = createTaskElement(task, i);
        if (task.completed_task) {
            completedTaskList.appendChild(taskElement);
        } else {
            tasklist.appendChild(taskElement);
        }
    });
}

document.getElementById('search-bar').addEventListener('input', searchTasks);


function sortTasks() {
    const sortOption = document.getElementById('sort-tasks').value;

    const sortByDate = (a, b, ascending = true) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return ascending ? dateA - dateB : dateB - dateA;
    };

    if (sortOption === 'date-asc') {
        mydata.sort((a, b) => sortByDate(a, b, true));
    } else if (sortOption === 'date-desc') {
        mydata.sort((a, b) => sortByDate(a, b, false));
    }

    displaytask();
}


document.addEventListener('DOMContentLoaded', () => {
    sortTasks();
    displaytask();
});
