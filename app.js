import {populateUI, populateMessage, updateSeatsAndSummary} from './views/view.js'

const container = document.querySelector('.container');
const allSeats = document.querySelectorAll('.row .seat');
const movieSelect = document.getElementById('movie');
const purchase = document.getElementById('purchase');


// a single movie data
export let data = {
  movieIndex: 0,
  seats: [],
  moviePrice: 10,
};

// all purchase history
let transactions = [];

// fetch localstorage data and set to global variable 'data' used as the copy of current localstorage
export const setData = (updates = {}) => {
  let newData = {};
  if (localStorage.getItem('movieData')) {
    newData = JSON.parse(localStorage.getItem('movieData'));
  }

  data = {
    ...data,
    ...newData,
    ...updates,
  };

  localStorage.setItem('movieData', JSON.stringify(data));
};

// reset data on local strage, global variable, and class 'selected' for each seat
const resetData = () => {
  // remove localStorage movieData
  localStorage.removeItem('movieData');
  
  // set global data to default
  data = {
    movieIndex: 0,
    seats: [],
    moviePrice: 10,
  };
  
  // remove selected class off all seats
  allSeats.forEach((seat) => {
    seat.classList.remove('selected');
  });

  // update summary and its UI
  updateSeatsAndSummary();
};

// select seats by clicking and add class to node
container.addEventListener('click', (e) => {
  // add 'selected' class on the clicked seat excluding a seat with 'seat occupied' class 
  if ( 
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSeatsAndSummary();
  }
});

// get value of selected movie
movieSelect.addEventListener('change', (e) => {
  setData({
    ...data,
    movieIndex: e.target.selectedIndex,
    moviePrice: +e.target.value,
  });
  updateSeatsAndSummary();
});

// purchase event
purchase.addEventListener('click', () => {
  transactions.push(data);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  resetData();
  setData();
  populateUI();
  populateMessage();
});

// initial render
setData();
populateUI();
