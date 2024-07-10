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
                <img src="${task.completed_task ? 'images/tik.svg' : 'images/untik.svg'}" class="custom-checkbox" data-index="${index}" onclick="toggleTask(${index})">
            </div>
            <div class="task-card">
                <div class="task-header">
                    <div class="name-tik">
                        <p class="task-name">${task.head}</p>
                        <span class="${task.completed_task ? 'span-green' : 'span-yellow'}"></span>
                    </div>
                    <div class="edit-delete">
                        <img class="edit-icon" src="images/edit.svg" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" onclick="updatetask(${index});">
                        <img class="delete-icon" onclick="deletetask(${index}); showtask1();" src="images/Group.svg">
                    </div>
                </div>
                <p class="task-paragraph">${task.description}</p>
                <div class="${isPastDue ? 'past-due' : 'col-date'}">
                    <img class="col-img" src="${isPastDue ? 'images/colondered.svg' : 'images/calendar_month_black_24dp 2.svg'}">
                    <p class="${isPastDue ? 'by-date2' : 'by-date1'}">by ${task.date}</p>
                </div>
            </div>
        </div>
    `;
    return div;
}

function toggleTask(index) {
    mydata[index].completed_task = !mydata[index].completed_task;
    updateLocalStorage();
    displaytask();
}

function updatetask(index) {
    let task = mydata[index];
    update.innerHTML = `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
            <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Title *</label>
                <input type="text" class="form-control" id="head" value="${task.head}">
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Description <img src="/images/Vector (1).svg"></label>
                <textarea class="form-control" id="description">${task.description}</textarea>
              </div>
              <div class="add-task-content-date">
                <p class="add-task-content-date1">Due date</p>
                <input type="date" id="date" class="add-task-content-date-input" value="${task.date}">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" onclick="updatesave(${index})">Update</button>
          </div>
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

function clearCompletedTasks() {
    mydata = mydata.filter(task => !task.completed_task);
    updateLocalStorage();
    displaytask();
}
