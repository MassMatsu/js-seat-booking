const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const allSeats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

let data = {
  movieIndex: 0,
  seats: [],
  moviePrice: 10,
};

let tickets = []

const setData = (updates) => {
  if (localStorage.getItem('movieData')) {
    data = JSON.parse(localStorage.getItem('movieData'))
  }
  data = {
    ...data,
    ...updates
  }
  localStorage.setItem('movieData', JSON.stringify(data))
  console.log(data)
};

const populateUI = (data) => {
  if (data.seats !== null && data.seats.length > 0)
   {
    seats.forEach((seat, index) => {
      
    })  
  }
}

// save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {};

// update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsCount = selectedSeats.length;

  count.innerText = seatsCount;
  total.innerText = seatsCount * ticketPrice;

  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...allSeats].indexOf(seat);
  });
  //console.log(seatsIndex)
  
  setData({seats: seatsIndex})
  console.log(data)
};

//
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// get value of selected movie
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);

  setData({
    movieIndex: e.target.selectedIndex, 
    moviePrice: +e.target.value
  })
});

window.addEventListener('DOMContentLoaded', () => {
  // const movieIndex = 3
  // const seats = [4, 8, 9, 10]
  // const moviePrice = 12
  // const newData = {
  //   movieIndex,
  //   seats,
  //   moviePrice,
  // };
  //setData()
})
