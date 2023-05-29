const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

let completedTasks = [];
let deletedTasks = [];
let taskText = ''; // Variable para almacenar el texto de la tarea

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
    if (!value) return;
    const truncatedValue = value.length > 35 ? value.substring(35, 0) + '...' : value;
    
    // objeto para almacenar el texto y el estado de la tarea
    const taskObj = {
      text: truncatedValue,
      completed: false
    };
    
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    task.addEventListener('click', changeTaskState);
    task.innerHTML = `${truncatedValue} 
      <div class="buttonsContainerTask">
      <button class="deleteTaskButton" onclick="deleteTask(event)">x</button>
      <button class="completeTaskButton" onclick="completeTask(event)">✓</button>
      </div>`;
    tasksContainer.prepend(task); // Agrega la nueva tarea al comienzo del contenedor de tareas.
    event.target.reset(); //Borra el contenido del imput del formulario para ingresar una nueva tarea.
  
    // Agregar tarea al arreglo de tareas incompletas
    toDoTasks.push(taskObj);
    console.log(deletedTasks);
    tasksContainer.scrollTop = tasksContainer.scrollHeight;
  };
  
  const deleteTask = event => {
    event.stopPropagation();
    const task = event.target.closest('.task');
  
    // Obtener el texto de la tarea eliminada
    const deletedTaskText = task.textContent.trim();
  
    // Añadir el texto de la tarea eliminada al arreglo de tareas eliminadas
    deletedTasks.push(deletedTaskText);
    task.remove();
  
    // Imprimir el texto de la tarea eliminada
    console.log("Texto de la tarea eliminada:", deletedTaskText);
    tasksContainer.scrollTop = 0;
  };
  
  
  const completeTask = event => {
    event.stopPropagation();
    const task = event.target.closest('.task');
    task.classList.add('done');

    // Obtener el texto de la tarea completada
    const completedTaskText = task.textContent.trim();
  
    // Añadir el texto de la tarea completada al arreglo de tareas completadas
    completedTasks.push(completedTaskText);
    task.remove();
  
    // Imprimir el texto de la tarea completada
    console.log("Texto de la tarea completada:", completedTaskText);
    tasksContainer.scrollTop = 0;
  };
  
/* Esta función cambia la clase de estilo de el elemento div de la tarea al hacer clic en él, para hacerlo parecer completado o no completado. */
const changeTaskState = event => {
  event.target.classList.toggle('done');
};

/* Esta función divide las tareas en completadas e incompletas y las combina en un nuevo arreglo en el orden de incompletas primero y completadas después. */
const order = () => {
  const done = [];
  const toDo = [];
  tasksContainer.childNodes.forEach(el => {
    el.classList.contains('done') ? done.push(el) : toDo.push(el)
  });
  return [...toDo, ...done];
};

/* Esta función ordena visualmente las tareas incompletas al principio y las completadas al final en el contenedor de tareas,  */
const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el))
}
setDate();

tasksContainer.addEventListener('resize', () => {
  // Desplazar el contenedor de tareas hacia abajo cuando se cambia el tamaño
  tasksContainer.scrollTop = tasksContainer.scrollHeight;
});
