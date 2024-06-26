"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function showtask() {
  document.getElementsByClassName('add-task')[0].style.display = 'block';
  document.getElementById('main-body').style.opacity = 0.3;
}

function hidetask() {
  document.getElementsByClassName('add-task')[0].style.display = 'none';
  document.getElementById('main-body').style.opacity = 1;
}

var mydata = JSON.parse(localStorage.getItem('mydata')) || [];
var tasklist = document.getElementById('task-list');
var completedTaskList = document.getElementById('task-complete');
var update = document.getElementById('update');
var del = document.getElementById('delete1');

function savetask() {
  var head = document.getElementById('head').value;
  var description = document.getElementById('description').value;
  var date = document.getElementById('date').value;
  var completed_task = false;

  if (head) {
    var task = {
      head: head,
      description: description,
      date: date,
      completed_task: completed_task
    };
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
  del.innerHTML = "<div class=\"task-delete\">\n            <p class=\"task-delete-heading\">Delete Task</p>\n            <p class=\"task-delete-content-heading\">Are you sure you want to delete this task?</p>\n            <div class=\"task-delete-footer\">\n                <button type=\"button\" class=\"btn11\" onclick=\"hidetask1()\">Cancel</button>\n                <button type=\"button\" class=\"btn21\" onclick=\"permitdelete(".concat(i, "); hidetask1();\">Delete</button>\n            </div>\n            </div>");
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
  var activeTasks = mydata.filter(function (task) {
    return !task.completed_task;
  });
  var completedTasks = mydata.filter(function (task) {
    return task.completed_task;
  });
  activeTasks.forEach(function (task, i) {
    var taskElement = createTaskElement(task, i);
    tasklist.appendChild(taskElement);
  });
  completedTasks.forEach(function (task, i) {
    var taskElement = createTaskElement(task, i);
    completedTaskList.appendChild(taskElement);
  });
}

function createTaskElement(task, index) {
  var div = document.createElement('div');
  div.className = 'task-x';
  var today = new Date();
  var taskDate = new Date(task.date);
  var isPastDue = taskDate < today;
  div.innerHTML = "\n        <div class=\"inner-taskspace\">\n            <div class=\"custom-checkbox-container\">\n                <input type=\"checkbox\" id=\"customCheckbox".concat(index, "\" class=\"custom-checkbox\" data-index=\"").concat(index, "\" ").concat(task.completed_task ? 'checked' : '', ">\n                <label for=\"customCheckbox").concat(index, "\" class=\"custom-checkbox-label\"></label>\n            </div>\n            <div class=\"task-card\">\n                <div class=\"task-header\">\n                    <div class=\"name-tik\">\n                        <p class=\"task-name\">").concat(task.head, "</p>\n                        <span class=\"").concat(task.completed_task ? 'span-green' : 'span-yellow', "\"></span>\n                    </div>\n                    <div class=\"edit-delete\">\n                        <img class=\"edit-icon\" src=\"images/Group 817.svg\" onclick=\"updatetask(").concat(index, "); showtask();\">\n                        <img class=\"delete-icon\" onclick=\"deletetask(").concat(index, "); showtask1();\" src=\"images/Group.svg\">\n                    </div>\n                </div>\n                <p class=\"task-paragraph\">").concat(task.description, "</p>\n                <div class=\"").concat(isPastDue ? 'past-due' : 'col-date', "\">\n                    <img class=\"col-img\" src=\"").concat(isPastDue ? 'images/colondered.svg' : 'images/calendar_month_black_24dp 2.svg', "\">\n                    <p class=\"by-date\">by ").concat(task.date, "</p>\n                </div>\n            </div>\n        </div>\n    ");
  return div;
}

function updatetask(index) {
  var task = mydata[index];
  update.innerHTML = "\n    <div class=\"add-task\">\n        <div class=\"add-task-head\">\n            <p class=\"add-task-heading\">Add Task</p>\n            <img class=\"close-icon\" src=\"images/x.svg\" onclick=\"hidetask()\">\n        </div>\n        <hr>\n        <div class=\"add-task-content\">\n            <div class=\"add-task-content-title\">\n                <p class=\"add-task-content-heading\">Title *</p>\n                <input type=\"text\" class=\"add-task-content-head\" id=\"head\" value=\"".concat(task.head, "\">\n            </div>\n            <div class=\"add-task-content-description\">\n                <p class=\"add-task-content-description1\">Description</p>\n                <input type=\"text\" class=\"add-task-content-testarea\" id=\"description\" value=\"").concat(task.description, "\">\n            </div>\n            <div class=\"add-task-content-date\">\n                <p class=\"add-task-content-date1\">Date</p>\n                <input type=\"date\" id=\"date\" class=\"add-task-content-date-input\" value=\"").concat(task.date, "\">\n            </div>\n            <hr>\n            <div class=\"add-task-footer\">\n                <button type=\"button\" class=\"btn1 btn-primary btn-sm\" onclick=\"hidetask()\">Cancel</button>\n                <button type=\"button\" class=\"btn2 btn-primary btn-sm\" onclick=\"updatesave(").concat(index, ")\">Save</button>\n            </div>\n        </div>\n    </div>\n    ");
}

function updatesave(index) {
  var head = document.getElementById('head').value;
  var description = document.getElementById('description').value;
  var date = document.getElementById('date').value;
  mydata[index] = _objectSpread({}, mydata[index], {
    head: head,
    description: description,
    date: date
  });
  localStorage.setItem('mydata', JSON.stringify(mydata));
  window.location.reload();
  hidetask();
}

document.addEventListener('DOMContentLoaded', function () {
  sortTasks();
  displaytask();
});

function searchTasks() {
  var query = document.getElementById('search-bar').value.toLowerCase();
  var filteredTasks = mydata.filter(function (task) {
    return task.head.toLowerCase().includes(query);
  });
  displayFilteredTasks(filteredTasks);
}

function displayFilteredTasks(tasks) {
  tasklist.innerHTML = '';
  completedTaskList.innerHTML = '';
  tasks.forEach(function (task, i) {
    var taskElement = createTaskElement(task, i);

    if (task.completed_task) {
      completedTaskList.appendChild(taskElement);
    } else {
      tasklist.appendChild(taskElement);
    }
  });
}

document.getElementById('search-bar').addEventListener('input', searchTasks);

function sortTasks() {
  var sortOption = document.getElementById('sort-tasks').value;

  var sortByDate = function sortByDate(a, b) {
    var ascending = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return ascending ? dateA - dateB : dateB - dateA;
  };

  if (sortOption === 'date-asc') {
    mydata.sort(function (a, b) {
      return sortByDate(a, b, true);
    });
  } else if (sortOption === 'date-desc') {
    mydata.sort(function (a, b) {
      return sortByDate(a, b, false);
    });
  }

  displaytask();
}

document.addEventListener('DOMContentLoaded', function () {
  sortTasks();
  displaytask();
});