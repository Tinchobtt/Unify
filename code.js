class Task {
    constructor(nom, desc) {
        this.nombre = nom;
        this.descripcion = desc;
    }
}
let tareas = [];

const verTareas = ()=>{
    let content = '';
    if(listaVAcia(tareas)){
        alert('La lista esta vacía');
    }else{
        tareas.forEach(task => {
            content += `Tarea: ${task.nombre}\nDescripcion: ${task.descripcion}`;
        });
        alert(content);
    }
}
const crearTarea = ()=>{
    let nom = prompt('Ingrese el nombre de la tarea:');
    let desc = prompt('Ingrese la descripcion de la tarea:');
    if(verificarVacio(nom) || verificarVacio(desc)){
        alert('No ingresaste ninguna tarea, intentelo de nuevo');
    }else{
        tareas.push(new Task(nom, desc));
    }
}
const eliminarTarea = ()=>{
    let task = prompt('Ingrese la tarea a eliminar:');
    if(tareas.includes(task)){
        let index = tareas.indexOf(task);
        tareas.splice(index, 1);
    }else{
        alert('La tarea seleccionada no existe!');
    }
}
//VERIFICADORES
const verificarVacio = (str)=>{
    return !str || str.trim().length === 0;
}
const listaVAcia = (lista)=>{
    return !lista || lista.length === 0;
}

let i = true;
while(i === true){
    let menu = parseInt(prompt('1- Ver Tareas \n2- Crear nueva tarea \n3- Eliminar tarea \n4- Salir'));
    switch(menu){
        case 1:
            verTareas();
            break;
        case 2:
            crearTarea();
            break;
        case 3:
            eliminarTarea();
            break;
        default:
            i = false;
    }
}
