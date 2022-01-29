let nav = 0;                 //display current month looking at
let clickable = null;        //display date of a month when clicked
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];  //display array of objects

const calendar = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function load()
{
    const date = new Date();

    if (nav!==0) {
        date.setMonth(new Date().getMonth() + nav);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);   //1st day in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();   //last day in previous month

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {  
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });                                              //get weekday of that month's date

    const paddingDays = weekdays.indexOf(dateString.split(',')[0]);  //calculate total no. of weekdays before present weekday

    document.getElementById('monthDisplay').innerText = 
    `${date.toLocaleDateString('en-us', {month: 'long'})} ${year}`;  //display month & year

    calendar.innerHTML = '';  //wipeout all padding in between
    
    //adding sqaure boxes for each days
    for (let i = 0; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if (i > paddingDays) {
           daySquare.innerText = i - paddingDays;  //display no of padding days
           
           daySquare.addEventListener('click', () => console.log('click'));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);   
    }
}

function initButtons() 
{
    document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
    });
}

initButtons();

load();
