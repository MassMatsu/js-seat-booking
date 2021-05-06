const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const allSeats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const purchase = document.getElementById('purchase');
const successMsg = document.getElementById('message');
const purchaseMsg = document.getElementById('ticket-info');
const instruction = document.getElementById('instruction')

// a single movie data
let data = {
  movieIndex: 0,
  seats: [],
  moviePrice: 10,
};

// all purchase history
let transactions = [];

// fetch localstorage data and set to global variable 'data' used as the copy of current localstorage
const setData = (updates = {}) => {
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

const populateUI = () => {
  if (data !== null && data.seats.length > 0) {
    allSeats.forEach((seat, index) => {
      if (data.seats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  if (data !== null) {
    movieSelect.selectedIndex = data.movieIndex;
  }
};

//render purchase messages
const populateMessage = () => {
  const data = JSON.parse(localStorage.getItem('transactions'));
  
  if (data && data[data.length - 1].seats.length > 0) {
    const { movieIndex, seats, moviePrice } = data[data.length - 1];

    purchaseMsg.innerHTML = `
    <p>${seats.length} ticket${seats.length === 1 ? '' : 's'} purchase</p>
    <p>for ${movieSelect[movieIndex].textContent}</p>
    <p>total of $${seats.length * moviePrice} - Seat no: ${seats.join(', ')} </p>
  `;
    successMsg.classList.add('success');
    purchaseMsg.classList.add('show');
    instruction.classList.add('hide');
    setTimeout(() => {
      successMsg.classList.remove('success');
      purchaseMsg.classList.remove('show');
      instruction.classList.remove('hide');
    }, 5000);
  } 
};

// update selected seats data, total and count, also UI
const updateSeatsAndSummary = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  // get amount of selected seats and use it for count of seats and total price
  const seatsCount = selectedSeats.length;
  count.innerText = seatsCount;
  total.innerText = seatsCount * data.moviePrice;

  // check selected seats and update data on localstorage
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...allSeats].indexOf(seat);
  });
  setData({ ...data, seats: seatsIndex });
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
