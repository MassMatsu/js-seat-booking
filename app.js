const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const allSeats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const purchaseBtn = document.getElementById('purchase')


let ticketPrice = +movieSelect.value;

// get data from localStorage and populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

  if (selectedSeats.length > 0) {
    // check if selectedSeats index matches any seat index and add selected class
    allSeats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex
  }
};

// save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
};

// update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsCount = selectedSeats.length;

  count.innerText = seatsCount;
  total.innerText = seatsCount * ticketPrice;

  const seatsIndex = [...selectedSeats].map((seat) =>[...allSeats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
};

// seats select event
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
  setMovieData(e.target.selectedIndex, e.target.value)
  updateSelectedCount()
});


// initial render
populateUI();

// initial count and total set when loaded
updateSelectedCount()
