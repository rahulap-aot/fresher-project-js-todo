

let mydata=JSON.parse(localStorage.getItem('mydata')) || [];

 let active=document.querySelector('#task-list');
 let completed=document.querySelector('#task-complete');
 let update=document.querySelector('#update');


function savetask(){
    let head=document.getElementById('head').value;
    let description=document.getElementById('description').value; //getting values
    let date=document.getElementById('date').value;
    let completed_task=false;
    if(head){
        let task={head,description,date,completed_task};
        mydata.push(task);
        localStorage.setItem('mydata',JSON.stringify(mydata)); //mydata sending to local storage
        displaytask();      
    }
}

function displaytask(){
    active.innerHTML='';
    completed.innerHTML='';

    mydata.forEach((task,i)=>{
        if(task.completed_task){
            let newtask=taskElement(task,i);
            completed.appendChild(newtask);
        }
        else{
            let newtask=taskElement(task,i);
            active.appendChild(newtask);
        }
    });
}

function taskElement(task, i){
    let div = document.createElement('div');
    div.className = "task-x";

    div.innerHTML = `
    <div class="inner-taskspace">
        <div class="custom-checkbox-container">
            <img src=${task.completed_task? "images/tik.svg" : "images/untik.svg"} class="custom-checkbox" onclick="completeTask(${i})">

        </div>
        <div class="task-card">
            <div class="task-header">
                <div class="name-tik">
                    <p class="task-name">${task.head}</p>
                    <span class=${task.completed_task?"span-green":"span-yellow"}></span>
                </div>
                <div class="edit-delete">
                    <img class="edit-icon" onClick="Editmodal(${i})" data-bs-toggle="modal" data-bs-target="#exampleModa2" data-bs-whatever="@getbootstrap" src="images/edit.svg">
                    <img class="delete-icon" data-bs-toggle="modal" data-bs-target="#exampleModal3" deletemodal(${i}) src="images/Group.svg">
                </div>
            </div>
            <p class="task-paragraph">${task.description}</p>
            <div class="col-date">
                <img class="col-img" src="images/calendar_month_black_24dp 2.svg">
                <p class="by-date1">by ${task.date}</p>
            </div>
        </div>
    </div>
    `;
    return div;
}

function completeTask(i){
    mydata[i].completed_task = !mydata[i].completed_task;
    localStorage.setItem('mydata',JSON.stringify(mydata));
    displaytask();
}

function Editmodal(i) {
    let task = mydata[i];
    console.log(task);

    update.innerHTML = `
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Title *</label>
                            <input type="text" class="form-control" value="${task.head}" id="recipient-name" name="head">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Description <img src="/images/Vector (1).svg"></label>
                            <textarea class="form-control" placeholder="Add your task description." name="description" id="description">${task.description}</textarea>
                        </div>
                        <div class="add-task-content-date">
                            <p class="add-task-content-date1">Due date</p>
                            <input type="date" id="date" value="${task.date}" name="date" class="form-control">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn1 btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn2 btn-primary" onclick="Updatetask(${i})">Save Task</button>
                </div>
            </div>
        </div>
    </div>
    `;

    var exampleModal2 = new bootstrap.Modal(document.getElementById('exampleModal2'));
    exampleModal2.show();
}

function Updatetask(i){
    let task = mydata[i];
    let head = document.getElementById('recipient-name').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    task.head = head;
    task.description = description;
    task.date = date;
    localStorage.setItem('mydata',JSON.stringify(mydata));
    displaytask();
}

function deletemodal(i){
    update.innerHTML=`
    <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="delete-x">
            <img data-bs-dismiss="modal" src="/images/x.svg">
        </div>
        <div class="task-delete-body">
        <p class="task-delete-heading">Delete Task?</p>
            <p class="task-delete-content-heading">Are you sure you want to delete this task?</p>
            <div class="task-delete-footer">
                <button type="button" class="btn11" data-bs-dismiss="modal">Cancel</button>
                <button type="button" onClick="deletetask(${i})"  class="btn21">Delete</button>
            </div>
        </div>
    </div>
    </div>
  </div>`
}

function deletetask(i){
    console.log(mydata[i])
    mydata.splice(i,1);
    localStorage.setItem('mydata',JSON.stringify(mydata));
    displaytask();
}



function clearCompletedTasks(){
    mydata = mydata.filter(task => !task.completed_task);
    localStorage.setItem('mydata',JSON.stringify(mydata));
    displaytask();
}


displaytask()