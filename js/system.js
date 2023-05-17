class Task{
    constructor(id, title, content, start, end) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.start = start;
        this.end = end;
    }
}
let taskList = [ new Task(0, 'PreEntrega2', 'Proyecto aprobado', '15/05/2023', '20/05/2023')];

const createTask = (title, content, start, end)=>{
    if(verificarVacio(content)){
        alert('No ingresaste ninguna tarea, intentelo de nuevo');
    }else{
        id = taskList.length;
        taskList.push(new Task(id, title, content, start, end));
        showTasks(taskList);
    }
}

const deleteTask = (id)=>{
    if(confirm('¿Deseas eliminar esta tarea?')){
        taskList.splice(id, 1);
        showTasks(taskList);
    }
}

const addTaskButtons = ()=>{
    /*Delete*/
    let deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', ()=>{
            let id = btn.getAttribute('data-id');
            deleteTask(id);
        })
    });
}

const showTasks = (taskList)=>{
    let tasks = '';
    const tasksSection = document.querySelector('.tasks');
    if(listaVacia(taskList)){
        tasks = '<p class="s-text" style="text-align: center; margin: 1em;">No hay tareas pendientes</p>';
        tasksSection.innerHTML = tasks;
    }else{
        taskList.forEach(task => {
            tasks += `
            <div class="task">
                <div class="task-info">
                    <h3 class="task-title md-text">${task.title}</h3>
                    <p class="task-text s-text">${task.content}</p>
                    <button class="info-btn"><i class="fa-solid fa-circle-info"></i></button>
                    <div class="task-dates">
                        <p class="xs-text"><span>Inicio: ${task.start}</span></p>
                        <p class="xs-text"><span>Fin: ${task.end}</span></p>
                    </div>
                </div>
                <div class="task-btns">
                    <input type="checkbox" name="" id="">
                    <span class="edit-btn"><i class="fa-solid fa-pencil"></i></span>
                    <span class="delete-btn" data-id="${task.id}"><i class="fa-solid fa-trash"></i></span>
                </div>
            </div>
            `;
        });
        tasksSection.innerHTML = tasks;
        addTaskButtons();
    }
}

const searchTask = (search)=>{
    let searchListTask = new Array();
    let taskSearched = taskList.find( (task)=> task.title === search );
    if(taskSearched === undefined){
        alert('No se encontró la tarea solicitada!');
    }else{
        searchListTask.push(taskSearched);
        showTasks(searchListTask);
    }
}

const sortTask = ()=>{

}

//VERIFICADORES
const verificarVacio = (str)=>{
    return !str || str.trim().length === 0;
}
const listaVacia = (lista)=>{
    return !lista || lista.length === 0;
}

const addBtn = document.querySelector('.add-btn');
const addTaskSection = document.querySelector('.add-task-section');

addBtn.addEventListener('click', ()=>{
    addTaskSection.classList.add('showAddTask');
})

const taskTitle = document.querySelector('#taskTitle');
const taskContent = document.querySelector('#taskContent');
const taskStart = document.querySelector('#taskStart');
const taskEnd = document.querySelector('#taskEnd');

let title = 'Sin título';
let content, start, end, flag = 0;

taskTitle.addEventListener('click', ()=>{
    title = '';
    title = prompt('Ingrese el titulo:');
})
taskContent.addEventListener('click', ()=>{
    content = '';
    content = prompt('Ingrese su tarea:');
    flag++;
})
taskStart.addEventListener('click', ()=>{
    start = '';
    start = prompt('Ingrese la fecha de inicio (dia/mes/año):');
    flag++;
})
taskEnd.addEventListener('click', ()=>{
    end = '';
    end = prompt('Ingrese la fecha de finalización (dia/mes/año):');
    flag++;
})

const confirmTask = document.querySelector('#confirmTask');
const cancelTask = document.querySelector('#cancelTask');

cancelTask.addEventListener('click', ()=>{
    addTaskSection.classList.remove('showAddTask');
})
confirmTask.addEventListener('click', ()=>{
    if(flag >= 3){
        createTask(title, content, start, end);
        addTaskSection.classList.remove('showAddTask');
    }else{
        alert('Complete los campos requeridos!');
    }
})

/*BUSCADOR*/
const searchInput = document.querySelector('#searchInput');
const lupa = document.querySelector('.fa-magnifying-glass');

lupa.addEventListener('click', ()=>{
    searchInput.classList.toggle('showInput');
})
searchInput.addEventListener('click', ()=>{
    let search = prompt('Ingrese la tarea que busca por su titulo:');
    console.log(search)
    if(search === '' || search === null || search === 'todo'){
        showTasks(taskList);
    }else{
        searchTask(search);
    }
})

/*FILTRO*/
const arrow = document.querySelector('.fa-caret-down');
const sortSelect = document.querySelector('#sortSelect');

sortSelect.addEventListener('click', ()=>{
    arrow.classList.toggle('spin90');
})

/*INICIO*/
showTasks(taskList);