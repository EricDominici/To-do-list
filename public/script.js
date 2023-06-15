const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

let completedTasks = [];
let deletedTasks = [];
let taskText = ''; 
let toDoTasks = []; 

const tasksContainer = document.getElementById('tasksContainer');
const taskForm = document.getElementById('taskForm');

tasksContainer.style.maxHeight = '480px';
tasksContainer.style.overflowY = 'auto';

const setDate = () => {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
  dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
  dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
  dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const addNewTask = event => {
  event.preventDefault();
  const { value } = event.target.taskText;
  if (!value) return;
  const truncatedValue = value.length > 35 ? value.substring(35, 0) + '...' : value;
  const taskObj = {
    text: truncatedValue,
    completed: false
  };
  fetch('/api/tasksPost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskObj)
  })
    .then(response => response.json())
    .then(savedTask => {
      const task = document.createElement('div');
      task.classList.add('task', 'roundBorder');
      task.addEventListener('click', changeTaskState);
      task.innerHTML = `${truncatedValue} 
        <div class="buttonsContainerTask">
        <button class="deleteTaskButton" onclick="deleteTask(event)">x</button>
        <button class="completeTaskButton" onclick="completeTask(event)">✓</button>
        </div>`;
      tasksContainer.prepend(task);
      event.target.reset();
      task.dataset.taskId = savedTask._id; // Asignar el ID de la tarea al elemento HTML
      toDoTasks.push(savedTask);
      tasksContainer.scrollTop = tasksContainer.scrollHeight;
      renderOrderedTasks();
      renderToDoTasks();
    })
    .catch(error => {
      console.log(error);
    });
};

const deleteTask = async (event, id) => {

  event.stopPropagation();
  debugger
  const task = event.target.closest('.task');
  if (!task) return;
  const deletedTaskText = task.textContent.trim();ç
  deletedTasks.push(deletedTaskText);

  try {
    const response = await fetch(`/api/tasksDelete/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    task.remove();
    tasksContainer.scrollTop = 0;
    renderOrderedTasks();
  } catch (error) {
    console.log(error);
  }
};

const completeTask = event => {
  const task = event.target.closest('.task');
  if (!task) return;
  const taskId = task.dataset.taskId;
  fetch(`/api/taskss/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed: true })
  })
    .then(response => response.json())
    .then(updatedTask => {
      toDoTasks = toDoTasks.filter(task => task._id !== taskId);
    
    completedTasks.push({text:updatedTask.text, taskId:taskId});
      renderToDoTasks();
      renderCompletedTasks();
      renderOrderedTasks();
      tasksContainer.scrollTop = tasksContainer.scrollHeight;
    })
    .catch(error => {
      console.log(error);
    });
  task.classList.toggle('done');
  setTimeout(() => {
    task.remove();
  }, 3000);
};
window.addEventListener('DOMContentLoaded', () => {
  fetch('/api/tasksGest')
    .then(response => response.json())
    .then(tasks => {
      
      completedTasks = tasks.filter(task => task.completed).map(task => ({text: task.text, taskId:task._id}));
      toDoTasks = tasks.filter(task => !task.completed);
      renderCompletedTasks();
      renderToDoTasks();
    })
    .catch(error => {
      console.log(error);
    });
})
const renderOrderedTasks = () => {
  const done = [];
  const toDo = [];
  tasksContainer.childNodes.forEach(el => {
    el.classList.contains('done') ? done.push(el) : toDo.push(el)
  });
  while (tasksContainer.firstChild) {
    tasksContainer.removeChild(tasksContainer.firstChild);
  }
  toDo.forEach(task => tasksContainer.appendChild(task));
  done.forEach(task => tasksContainer.appendChild(task));
};
const renderCompletedTasks = () => {
  const completedTasksContainer = document.getElementById('completedTasksContainer');
  completedTasksContainer.innerHTML = '';

  completedTasks.forEach((result) => {
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder', 'done');
    task.innerHTML = `${result.text}
    <div class="buttonsContainerTask">
    <button class="deleteTaskButton" onclick="deleteTask(event, '${result.taskId}')">x</button>
    </div>`;
    completedTasksContainer.appendChild(task);
  });
};

const renderToDoTasks = () => {
  const filteredTasks = [...new Set(toDoTasks.filter(task => !completedTasks.includes(task.text) && !deletedTasks.includes(task.text)))];
  tasksContainer.innerHTML = '';
  filteredTasks.forEach(task => {
    const truncatedValue = task.text.length > 35 ? task.text.substring(35, 0) + '...' : task.text;
    const taskElement = document.createElement('div');
    taskElement.classList.add('task', 'roundBorder');
    taskElement.addEventListener('click', changeTaskState);
    taskElement.innerHTML = `${truncatedValue} 
      <div class="buttonsContainerTask">
      <button class="completeTaskButton" onclick="completeTask(event)">✓</button>
      </div>`;
    taskElement.dataset.taskId = task._id; 
    tasksContainer.appendChild(taskElement);
  });
};
const changeTaskState = event => {
  event.target.classList.toggle('done');
  renderOrderedTasks();
};
setDate();
tasksContainer.addEventListener('resize', () => {
  tasksContainer.scrollTop = tasksContainer.scrollHeight;
});