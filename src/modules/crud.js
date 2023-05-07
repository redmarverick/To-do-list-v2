import data from "../index";
const taskList = document.getElementById('list-task');
const addTask = document.getElementById('form');
const btnClearTask = document.getElementById('btn-clear-task');

let list = [];
let localData = [];
function saveData(taskList) {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function updateTaskId() {
    for (let i = 0; i < list.length; i++) {
      const task = list[i];
      const taskItem = document.getElementById(task.index);
      if (taskItem.id) {
        taskItem.id = i;
        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        if (checkbox) {
          checkbox.name = i;
        }
      }
    }
    saveData(list);
  }

  function clearCompletedTasks() {
    let completedTasks = list.filter(task => task.status === true);
    completedTasks.forEach(task => removeTask(task.index));
    list = list.filter(task => task.status === false);
  }

  function removeTask(taskId) {
    const taskIndex = list.findIndex((task) => task.index === Number(taskId));
    if (taskIndex !== -1) {
      list.splice(taskIndex, 1);
      updateTaskId(taskIndex);
      list.forEach((task, index) => {
        task.index = index;
        const taskItem = document.getElementById(task.index);
        if (taskItem) {
          taskItem.id = task.index;
          const checkbox = taskItem.querySelector('input[type="checkbox"]');
          checkbox.name = task.index;
        }
      });
      const taskItem = document.getElementById(taskId);
      if (taskItem) {
        taskItem.remove();
      }
    }
    saveData(list);
  }
function buildTask(data) {
    let buttonPressed = false;
    list.push(data[0]);
    const taskList = document.getElementById('list-task');
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');
    taskItem.id = list[data[0].index].index;
    const taskContDiv = document.createElement('div');
    taskContDiv.classList.add('align-middle', 'task-content');
    taskItem.append(taskContDiv);
  
    const itemCheckBox = document.createElement('input');
    itemCheckBox.type = 'checkbox';
    itemCheckBox.name = list[data[0].index].index;
    itemCheckBox.checked = list[data[0].index].status; // set the initial checkbox status based on the task data
    taskContDiv.append(itemCheckBox);
  
    const taskDescription = document.createElement('input');
    taskDescription.classList.add('task-description');
    taskDescription.value = list[data[0].index].description;
    taskDescription.type = 'text';
    taskDescription.style.textDecoration = list[data[0].index].status ? 'line-through' : 'none'; // set the initial text decoration based on the task data
    taskContDiv.append(taskDescription);

    itemCheckBox.addEventListener('change', (event) => {
        const taskId = event.target.parentNode.parentNode.id;
        const taskIndex = list.findIndex((task) => task.index === Number(taskId));
        if (taskIndex !== -1) {
            list[taskIndex].status = event.target.checked; // update the task status in the list array
            taskDescription.style.textDecoration = event.target.checked ? 'line-through' : 'none'; // update the text decoration based on the checkbox status
        }
        saveData(list);
    });

    taskDescription.addEventListener('focus', (event) => {
        event.target.nextElementSibling.classList.toggle('hidden');
    });

    const itemCheck = document.createElement('i');
    itemCheck.classList.add('fa-solid', 'fa-check', 'hidden');
    itemCheck.addEventListener('mousedown', (event) => {
        buttonPressed = true;
        event.target.classList.add('task-description-check-active');
    });
      
    itemCheck.addEventListener('mouseup', (event) => {
        buttonPressed = false;
        event.target.classList.remove('task-description-check-active');
        const taskId = event.target.parentNode.parentNode.id;
        list[data[0].index].description = taskDescription.value;
        event.target.classList.add('task-description-check');
        saveData(list);
    });
      
    taskContDiv.append(itemCheck);

    taskDescription.addEventListener('blur', (event) => {
        const itemCheck = event.target.parentElement.querySelector('.fa-check');
        if (itemCheck && !itemCheck.classList.contains('hidden') && !buttonPressed) {
          event.target.nextElementSibling.classList.toggle('hidden');
          taskDescription.value = list[data[0].index].description;
        }
        else {
          setTimeout(() => {
            event.target.nextElementSibling.classList.toggle('hidden');
          }, 100);      
        }
      });
  
    const itemRemove = document.createElement('i');
    itemRemove.classList.add('fa-solid', 'fa-trash', 'hidden');
    itemRemove.style.color = '#fff';
    itemRemove.addEventListener('click', (event) => {
        const taskId = event.target.parentNode.id;
        removeTask(taskId);
    });
    taskItem.append(itemRemove);

    function deleteHid() {
        itemOptions.classList.toggle('hidden');
        itemRemove.classList.toggle('hidden');
      }

    var itemOptions = document.createElement('i');
    itemOptions.classList.add('fa-solid', 'fa-ellipsis-vertical');
    itemOptions.addEventListener('click', (event) => {
        deleteHid();
        itemRemove.style.color = '#c1c1c1';
    });
    
    taskItem.append(itemOptions);
  
    taskList.append(taskItem);
    saveData(list);
  }
  btnClearTask.addEventListener('click', clearCompletedTasks);

  export { buildTask, list, saveData };