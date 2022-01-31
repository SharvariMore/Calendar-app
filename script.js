let nav = 0;                 //display current month looking at
let clicked = null;        //display date of a month when clicked
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];  //display array of objects

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


//show for which date event is created
function openModal(date) {

    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        console.log("Event already exists");
    } else {
        newEventModal.style.display = 'block';
    }
    backDrop.style.display = 'block';
}

function load()
{
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

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
    `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`;  //display month & year

    calendar.innerHTML = ' ';  //wipeout all padding in between
    
    //adding sqaure boxes for each days
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if (i > paddingDays) {
           daySquare.innerText = i - paddingDays;  //display no of padding days
           
           daySquare.addEventListener('click', () => openModal(`$(month + 1)/$(i - paddingDays)/$(year)`));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);   
    }
}

function closeModal() 
{
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = ' ';
    clicked = null;
    load();
}

function saveEvent()
{
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value,
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    } else {
      eventTitleInput.classList.add('error');  
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

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
}

initButtons();

load();
