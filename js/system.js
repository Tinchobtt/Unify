const dateFormat = (date)=>{
    let splitDate = date.split('-');
    let day = splitDate[2];
    let month = splitDate[1];
    let year = splitDate[0];

    let format = day + '/' + month + '/' + year;
    return format;
}

class Task{
    constructor(id, title, content, start, end) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.start = start;
        this.end = end;
        this.checked = false;
    }
}
let taskList = JSON.parse(localStorage.getItem('tasks'));

const saveTask = ()=>{
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

const createTask = (title, content, start, end)=>{
    if(verificarVacio(content)){
        alert('No ingresaste ninguna tarea, intentelo de nuevo');
    }else{
        id = taskList.length;
        taskList.push(new Task(id, title, content, start, end));
        showTasks(taskList);
        saveTask();
        updatePercentage();
    }
}

const deleteTask = (id)=>{
    if(confirm('¿Deseas eliminar esta tarea?')){
        let i = 0;
        while (i < taskList.length) {
            if (taskList[i].id == id) {
                taskList.splice(i, 1);
            } else {
                i++;
            }
        }
        showTasks(taskList);
        updatePercentage()
        saveTask();
    }
}

const updatePercentage = ()=>{
    const spanPercentage = document.querySelector('#percentage span');
    if(listaVacia(taskList)){
        spanPercentage.innerHTML = '';
    }else{
        let taskChecked = taskList.filter( task => task.checked );
        let checkedAmount = taskChecked.length;
        let totalTask = taskList.length;
        let percentage = checkedAmount * 100 / totalTask;
        spanPercentage.innerHTML = Math.round(percentage) + '%';
    }
}

const checkTask = (id, cond)=>{
    let task = taskList.find( (item)=> item.id == id );
    task.checked = cond ? true : false;
    updatePercentage();
    saveTask();
}

const putCheck = (btn)=>{
    let id = btn.getAttribute('data-id');
    let task = taskList.find( task => task.id == id);
    btn.checked = task.checked ? true : false;
}

const addTaskButtons = ()=>{
    /*Delete button*/
    let deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', ()=>{
            let id = btn.getAttribute('data-id');
            deleteTask(id);
        })
    });
    /*Check button*/
    let checkBtns = document.querySelectorAll('.checkbox');
    checkBtns.forEach(btn => {
        putCheck(btn);
        btn.addEventListener('change', (event)=>{
            if(event.target.checked){
                checkTask(btn.getAttribute('data-id'), true);
            }else{
                checkTask(btn.getAttribute('data-id'), false);
            }
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
                        <p class="xs-text"><span>Inicio: ${dateFormat(task.start)}</span></p>
                        <p class="xs-text"><span>Fin: ${dateFormat(task.end)}</span></p>
                    </div>
                </div>
                <div class="task-btns">
                    <input type="checkbox" class="checkbox" data-id="${task.id}">
                    <span class="edit-btn" data-id="${task.id}"><i class="fa-solid fa-pencil"></i></span>
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
    let searchListTask = taskList.filter( (task)=> task.title === search );
    if(listaVacia(searchListTask)){
        alert('No se encontró la tarea solicitada!');
    }else{
        showTasks(searchListTask);
    }
}

const sortTask = (filtro)=>{
    let date = new Date();
    if(filtro === 'hoy'){
        let day = date.getDate().toString().padStart(2, "0");
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let year = date.getFullYear().toString();
        let today = year + '-' + month + '-' + day;
        let filterTaskList = taskList.filter((task)=> task.start === today);

        showTasks(filterTaskList);
    }else if(filtro === 'semana'){
        //Fecha de hoy
        let today = date.getDay();

        //Fecha del primer día de la semana (Lunes)
        const firstDay = new Date(date);
        firstDay.setDate(date.getDate() - today);
        
        //Fecha del último día de la semana (Domingo)
        const lastDay = new Date(date);
        lastDay.setDate(date.getDate() + (7 - today));

        let filterTaskList = taskList.filter((task)=> {
            let taskDate = new Date(task.start)
            return taskDate >= firstDay && taskDate <= lastDay;
        });

        showTasks(filterTaskList);
    }else if(filtro === 'mes'){
        let thisMonth = (date.getMonth() + 1).toString().padStart(2, "0");
        let thisYear = date.getFullYear().toString();
        let thisMonthYear = thisYear + "-" + thisMonth;
 
        let filterTaskList = taskList.filter((task)=> {
            let taskMonth = task.start.slice(0, 7);
            return taskMonth === thisMonthYear;
        })

        showTasks(filterTaskList);
    }else{
        showTasks(taskList);
    }
}

//VERIFICADORES
const verificarVacio = (str)=>{
    return !str || str.trim().length === 0;
}
const listaVacia = (lista)=>{
    return !lista || lista.length === 0;
}

//-------------------------------------------------------------------------------

/*INTERFAZ PARA AGREGAR TAREA*/
const addBtn = document.querySelector('.add-btn');
const addTaskSection = document.querySelector('.add-task-section');

addBtn.addEventListener('click', ()=>{
    addTaskSection.classList.add('showAddTask');
})

//Botones para enviar o cancelar el agregado de una tarea
const taskForm = document.querySelector('#task-form');
const cancelTask = document.querySelector('#cancelTask');

cancelTask.addEventListener('click', ()=>{
    addTaskSection.classList.remove('showAddTask');
})

//Envio del formulario (tarea)
taskForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    let taskTitle = document.querySelector('#taskTitle').value;
    let taskContent = document.querySelector('#taskContent').value;
    let taskStart = document.querySelector('#taskStart').value;
    let taskEnd = document.querySelector('#taskEnd').value;
    createTask(taskTitle, taskContent, taskStart, taskEnd);
    addTaskSection.classList.remove('showAddTask');
    taskForm.reset();
})

/*BUSCADOR*/
const searchBar = document.querySelector('.searchBar');
const lupa = document.querySelector('.fa-magnifying-glass');
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');

/*lupa.addEventListener('click', ()=>{
    searchBar.classList.toggle('showSearchBar');
})*/
searchBtn.addEventListener('click', ()=>{
    let search = searchInput.value;
    if(search === '' || search === null || search === 'todo'){
        showTasks(taskList);
    }else{
        searchTask(search);
    }
    searchInput.value = '';
})

/*FILTRO*/
const sortSelect = document.querySelector('#sortSelect');

sortSelect.addEventListener('change', ()=>{
    sortTask(sortSelect.value);
})

/*INICIO*/
showTasks(taskList);
updatePercentage();