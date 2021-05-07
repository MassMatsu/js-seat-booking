import {data, setData} from '../app.js'

//const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const allSeats = document.querySelectorAll('.row .seat');
const movieSelect = document.getElementById('movie');

const count = document.getElementById('count');
const total = document.getElementById('total');

const successMsg = document.getElementById('message');
const purchaseMsg = document.getElementById('ticket-info');
const instruction = document.getElementById('instruction');

// 
export const populateUI = () => {
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

// update selected seats data, total and count, also UI
export const updateSeatsAndSummary = () => {
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

//render purchase messages
export const populateMessage = () => {
  const data = JSON.parse(localStorage.getItem('transactions'));

  if (data && data[data.length - 1].seats.length > 0) {
    const { movieIndex, seats, moviePrice } = data[data.length - 1];

    purchaseMsg.innerHTML = `
    <p>${seats.length} ticket${seats.length === 1 ? '' : 's'} purchase</p>
    <p>for ${movieSelect[movieIndex].textContent}</p>
    <p>total of $${seats.length * moviePrice} - Seat no: ${seats.join(
      ', '
    )} </p>
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
