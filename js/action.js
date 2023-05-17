/*HEADER*/
const dailyDay = document.querySelector('.daily-day span');
const dailyDate = document.querySelector('.daily-date span');
const dailyHour = document.querySelector('.daily-hour span');

let date = new Date();
//Watch
const currentTime = ()=>{
    let date = new Date();
    let hh = date.getHours()
    let mm = date.getMinutes()
    let ss = date.getSeconds()

    hh = hh < 10 ? '0' + hh : hh;
    mm = mm < 10 ? '0' + mm : mm;
    ss = ss < 10 ? '0' + ss : ss;

    let time = hh + ':' + mm + ':' + ss;
    dailyHour.innerHTML = time;
}
setInterval(()=>{
    currentTime();
}, 1000)

//Date
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let today = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
dailyDate.innerHTML = today;

//Day
let hoy = date.getDay()
let diaDeHoy;
switch(hoy){
    case 0:
        diaDeHoy = 'Domingo';
        break;
    case 1:
        diaDeHoy = 'Lunes';
        break;
    case 2:
        diaDeHoy = 'Martes';
        break;
    case 3:
        diaDeHoy = 'Miercoles';
        break;
    case 4:
        diaDeHoy = 'Jueves';
        break;
    case 5:
        diaDeHoy = 'Viernes';
        break;
    case 6:
        diaDeHoy = 'Sabado';
        break;
}
dailyDay.innerHTML = diaDeHoy;

/*SWITCH*/
const handle = document.querySelector('.handle');
const icon = document.querySelector('.fa-solid');

handle.addEventListener('click', ()=>{
    handle.classList.toggle('move');
})