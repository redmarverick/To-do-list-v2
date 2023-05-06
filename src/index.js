import './index.css';

const list = [
  {
    description: 'First Item',
    status: false,
    index: 0,
  },
  {
    description: 'Second Item',
    status: false,
    index: 1,
  },
  {
    description: 'Third Item',
    status: false,
    index: 2,
  },
];

function buildTask(i) {
  const taskList = document.getElementById('list-task');
  const taskItem = document.createElement('li');
  taskItem.classList.add('task');
  taskItem.id = list[i].index;
  const taskContDiv = document.createElement('div');
  taskContDiv.classList.add('align-middle', 'task-content');
  taskItem.append(taskContDiv);

  const itemCheckBox = document.createElement('input');
  itemCheckBox.type = 'checkbox';
  itemCheckBox.name = list[i].index;
  taskContDiv.append(itemCheckBox);

  const taskDescription = document.createElement('input');
  taskDescription.classList.add('task-description');
  taskDescription.value = list[i].description;
  taskDescription.type = 'text';
  taskContDiv.append(taskDescription);

  const itemOptions = document.createElement('i');
  itemOptions.classList.add('fa-solid', 'fa-ellipsis-vertical');
  itemOptions.setAttribute = ('onclick', 'deleteHid()');
  taskItem.append(itemOptions);

  const itemRemove = document.createElement('i');
  itemRemove.classList.add('fa-solid', 'fa-trash', 'hidden');
  itemRemove.style.color = '#fff';
  itemRemove.setAttribute = ('onclick', 'deleteHid()');
  taskItem.append(itemRemove);

  taskList.append(taskItem);
}

const addTask = document.getElementById('form');

window.addEventListener('load', () => {
  for (let i = 0; i < list.length; i += 1) {
    buildTask(i);
  }
});

addTask.addEventListener('submit', (event) => {
  event.preventDefault();
  list.push(
    {
      description: addTask.newtask.value,
      status: false,
      index: list.length,
    },
  );
  addTask.newtask.value = '';
  buildTask(list.length - 1);
});
