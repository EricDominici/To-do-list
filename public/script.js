const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

// Contenedor
const tasksContainer = document.getElementById('tasksContainer');

/*Esta función crea un objeto Date ,esta función actualiza la fecha y hora en la página. */
const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};
/* La función addNewTask se ejecuta cuando se envía el formulario con un campo . 
tambien crea un nuevo elemento div con el valor del campo de texto y lo agrega a la lista de tareas. 
También borra el contenido del campo de texto del formulario, para hacer una nieva tarea. */



const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if (!value) return;
    const truncatedValue = value.length > 30 ? value.substring(30, 0) + '...' : value;
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    task.addEventListener('click', changeTaskState);
    task.innerHTML = `${truncatedValue} 
    <button class="deleteTaskButton" onclick="deleteTask(event)">x</button>
    <button class="completeTaskButton" onclick="completeTask(event)">✓</button>`;
    tasksContainer.prepend(task);
    event.target.reset();
};

const deleteTask = event => {
    event.stopPropagation(); // evitar que el evento se propague al elemento contenedor
    event.target.parentNode.remove();
};
const completeTask = event => {
    event.stopPropagation(); // evitar que el evento se propague al elemento contenedor
    const task = event.target.parentNode;
    task.classList.add('done');
    setTimeout(() => task.remove(), 1000); // eliminar la tarea después de 1 segundo
  };
/*Esta función cambia la clase de estilo de el elemento div de la tarea al hacer clic en él, para hacerlo parecer completado o no completado. */

const changeTaskState = event => {
    event.target.classList.toggle('done');
};
/*Esta función divide las tareas en completadas e incompletas y las combina en un nuevo arreglo en el orden de incompletas primero y completadas después. */
const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach( el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el)
    })
    return [...toDo, ...done];
}

/* Esta función ordena visualmente las tareas incompletas al principio y las completadas al final en el contenedor de tareas,  */
const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el))
}
setDate();