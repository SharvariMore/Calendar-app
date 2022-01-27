let nav = 0;                 //display current month looking at
let clickable = null;        //display date of a month when clicked
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];  //display array of objects

const calendar = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
