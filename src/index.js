import './index.css';
import { buildTask, list, saveData } from './modules/crud.js';

const addTask = document.getElementById('form');

window.addEventListener('load', () => {
  const savedData = JSON.parse(localStorage.getItem('taskList'));
  if (savedData !== null) {
    for (let i = 0; i < savedData.length; i += 1) {
      const data = [{
        description: savedData[i].description,
        status: savedData[i].status,
        index: savedData[i].index,
      }];
      buildTask(data, i);
    }
  }
});

addTask.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = [{
    description: addTask.newtask.value,
    status: false,
    index: list.length,
  }];
  addTask.newtask.value = '';
  buildTask(data, 0);
  saveData(list);
});
