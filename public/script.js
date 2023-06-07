const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

let completedTasks = [];
let deletedTasks = [];
let taskText = ''; 
let toDoTasks = []; // Variable para almacenar las tareas pendientes


// Contenedor
const tasksContainer = document.getElementById('tasksContainer');
const taskForm = document.getElementById('taskForm');

tasksContainer.style.maxHeight = '480px';
tasksContainer.style.overflowY = 'auto';

// Habilita el desplazamiento vertical cuando el contenido excede la altura establecida

/* Esta función crea un objeto Date, esta función actualiza la fecha y hora en la página. */
const setDate = () => {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
  dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
  dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
  dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

/* La función addNewTask se ejecuta cuando se envía el formulario con un campo.
También crea un nuevo elemento div con el valor del campo de texto y lo agrega a la lista de tareas.
También borra el contenido del campo de texto del formulario, para hacer una nueva tarea. */
const addNewTask = event => {
  event.preventDefault();
  const { value } = event.target.taskText;
  if (!value) return; // Verifica si el valor del campo de texto está vacío. Si es así, retorna sin hacer nada.
  const truncatedValue = value.length > 35 ? value.substring(35, 0) + '...' : value;

  // objeto para almacenar el texto y el estado de la tarea
  const taskObj = {
    text: truncatedValue,
    completed: false
  };
  // POST guarda
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
    tasksContainer.prepend(task); // Agrega la nueva tarea al comienzo del contenedor de tareas.
    event.target.reset(); //Borra el contenido del input del formulario para ingresar una nueva tarea.

    // Agregar tarea al arreglo de tareas incompletas
    toDoTasks.push(savedTask);
    console.log(deletedTasks);
    tasksContainer.scrollTop = tasksContainer.scrollHeight;
    // Ordenar automáticamente las tareas
    renderOrderedTasks();
    renderToDoTasks();
    
  })
  .catch(error => {
    console.log(error);
    // Handle error
  });
  
}
const deleteTask = event => {
  event.stopPropagation();
  const task = event.target.closest('.task');
  if (!task) return; // Verifica si el elemento de tarea es válido. Si no es válido, retorna sin hacer nada.

  // Obtener el texto de la tarea eliminada
  const deletedTaskText = task.textContent.trim();

  // Añadir el texto de la tarea eliminada al arreglo de tareas eliminadas
  deletedTasks.push(deletedTaskText);

  // Enviar solicitud DELETE para eliminar la tarea de la base de datos
  const taskId = task.dataset.taskId; // Suponiendo que establezca el ID de la tarea como un atributo de datos en el elemento de la tarea
  fetch(`/api/tasksDelete/${taskId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        task.remove();

        // Imprimir el texto de la tarea eliminada
        console.log("Texto de la tarea eliminada:", deletedTaskText);
        tasksContainer.scrollTop = 0;

        // Ordenar automáticamente las tareas
        renderOrderedTasks();

      } else {
        throw new Error('Failed to delete task');
      }
    })
    .catch(error => {
      console.log(error);
      // Handle error
    });
};
// Función para marcar una tarea como completada
const completeTask = event => {
  const task = event.target.closest('.task');
  if (!task) return;

  // Obtener el ID de la tarea completada
  const taskId = task.dataset.taskId;

  // Enviar solicitud PUT para marcar la tarea como completada en la base de datos
  fetch(`/api/taskss/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed: true })
  })
    .then(response => response.json())
    .then(updatedTask => {
      // Actualizar la tarea en el arreglo de tareas pendientes
      toDoTasks = toDoTasks.filter(task => task._id !== taskId);

      // Agregar la tarea completada al arreglo de tareas completadas
      completedTasks.push(updatedTask.text);

      // Renderizar nuevamente las tareas pendientes, completadas y ordenadas
      renderToDoTasks();
      renderCompletedTasks();
      renderOrderedTasks();

      tasksContainer.scrollTop = tasksContainer.scrollHeight;
    })
    .catch(error => {
      console.log(error);
      // Manejar el error
    });

  // Cambiar la clase de la tarea para reflejar que está completada
  task.classList.toggle('done');

  // Eliminar la tarea del contenedor después de 3 segundos
  setTimeout(() => {
    task.remove();
  }, 3000);
};
const renderOrderedTasks = () => {
  const done = [];
  const toDo = [];

  // Separar las tareas completadas y las tareas incompletas
  tasksContainer.childNodes.forEach(el => {
    el.classList.contains('done') ? done.push(el) : toDo.push(el)
  });

  // Vaciar el contenedor de tareas
  while (tasksContainer.firstChild) {
    tasksContainer.removeChild(tasksContainer.firstChild);
  }

  // Agregar las tareas incompletas y completadas en el orden correcto
  toDo.forEach(task => tasksContainer.appendChild(task));
  done.forEach(task => tasksContainer.appendChild(task));


};

// Al cargar la página, obtener las tareas completadas y eliminadas de la base de datos
window.addEventListener('DOMContentLoaded', () => {
  fetch('/api/tasksGest')
    .then(response => response.json())
    .then(tasks => {
      completedTasks = tasks.filter(task => task.completed).map(task => task.text);
      toDoTasks = tasks.filter(task => !task.completed);
      renderCompletedTasks();
      renderToDoTasks();
    })
    .catch(error => {
      console.log(error);
      // Handle error
    });

  // Obtener tareas eliminadas
  fetch('/api/deletedTasks')
    .then(response => response.json())
    .then(tasks => {
      deletedTasks = tasks.map(task => task.text);
      // Actualizar la lista de tareas eliminadas en el frontend
      renderDeletedTasks();
    })
    .catch(error => {
      console.log(error);
      // Handle error
    });
})

// renderiza las tareas completadas en el historial
const renderCompletedTasks = () => {
  const completedTasksContainer = document.getElementById('completedTasksContainer');
  completedTasksContainer.innerHTML = '';

  completedTasks.forEach(taskText => {
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder', 'done');
    task.innerHTML = `${taskText}`;
    completedTasksContainer.appendChild(task);
  });
};

//  renderiza las tareas eliminadas en el historial
const renderDeletedTasks = () => {
  const deletedTasksContainer = document.getElementById('deletedTasksContainer');
  deletedTasksContainer.innerHTML = '';

  deletedTasks.forEach(taskText => {
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder', 'deleted');
    task.innerHTML = `${taskText}`;
    deletedTasksContainer.appendChild(task);
  });
};
//  renderiza las tareas incompletas (tareas pendientes) en el frontend
const renderToDoTasks = () => {
  // Filtrar las tareas incompletas y evitar duplicados
  const filteredTasks = [...new Set(toDoTasks.filter(task => !completedTasks.includes(task.text) && !deletedTasks.includes(task.text)))];

  // Limpiar el contenedor de tareas
  tasksContainer.innerHTML = '';

  // Agregar las tareas incompletas filtradas al contenedor
  filteredTasks.forEach(task => {
    const truncatedValue = task.text.length > 35 ? task.text.substring(35, 0) + '...' : task.text;
    const taskElement = document.createElement('div');
    taskElement.classList.add('task', 'roundBorder');
    taskElement.addEventListener('click', changeTaskState);
    taskElement.innerHTML = `${truncatedValue} 
      <div class="buttonsContainerTask">
      <button class="deleteTaskButton" onclick="deleteTask(event)">x</button>
      <button class="completeTaskButton" onclick="completeTask(event)">✓</button>
      </div>`;
    taskElement.dataset.taskId = task._id; // Asignar el ID de la tarea como atributo de datos en el elemento de tarea
    tasksContainer.appendChild(taskElement);
  });
};


/* Esta función cambia la clase de estilo de el elemento div de la tarea al hacer clic en él, para hacerlo parecer completado o no completado. */
const changeTaskState = event => {
  event.target.classList.toggle('done');

  // Ordenar  las tareas
  renderOrderedTasks();
};

setDate();

tasksContainer.addEventListener('resize', () => {
  // Desplazar el contenedor de tareas hacia abajo cuando se cambia el tamaño
  tasksContainer.scrollTop = tasksContainer.scrollHeight;
});