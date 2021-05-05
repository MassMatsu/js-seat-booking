const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const allSeats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const purchase  = document.getElementById('purchase')
const message = document.getElementById('message')
const msg = document.getElementById('ticket-info')


let ticketPrice = +movieSelect.value;

let ticket = {
  movieIndex: 0,
  seats: [],
  moviePrice: 10,
};

let tickets = []

const setData = (updates = {}) => {
  if (localStorage.getItem('movieData')) {
    ticket = JSON.parse(localStorage.getItem('movieData'))
  }
  ticket = {
    ...ticket,
    ...updates
  }
  localStorage.setItem('movieData', JSON.stringify(ticket))
};

const populateUI = () => {
  const data = JSON.parse(localStorage.getItem('movieData'))
  if (data !== null && data.seats.length > 0) {
    allSeats.forEach((seat, index) => {
      if (data.seats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  } else {
    allSeats.forEach((seat) => {
      seat.classList.remove('selected')
    })
  }
  if (data) {
    movieSelect.selectedIndex = data.movieIndex
    ticketPrice = data.moviePrice
  } else {
    console.log('hello')
    movieSelect.selectedIndex = 0
  }
}

// render purchase details
const populateMessage = () => {
  msg.classList.add('show')
  setTimeout(() => {
    msg.classList.remove('show')
  }, 5000)
  const data = JSON.parse(localStorage.getItem('tickets'))
  const {movieIndex, seats, moviePrice} = data[data.length - 1]
  console.log(data)
  msg.innerHTML = `
    <p>${seats.length} tickets purchase</p>
    <p>for ${movieSelect[movieIndex].textContent}</p>
    <p>seat no: ${[...seats]}    total of $${seats.length * moviePrice}</p>
  `;
}

// update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsCount = selectedSeats.length;

  count.innerText = seatsCount;
  total.innerText = seatsCount * ticketPrice;

  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...allSeats].indexOf(seat);
  });
  console.log(movieSelect.selectedIndex);
  setData({seats: seatsIndex})
};

// select seats by clicking and add class to node
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

  setData({
    movieIndex: e.target.selectedIndex, 
    moviePrice: +e.target.value
  })
  updateSelectedCount()
});

// purchase event
purchase.addEventListener('click', () => {
  const data = JSON.parse(localStorage.getItem('movieData'))
  tickets.push(data)
  localStorage.setItem('tickets', JSON.stringify(tickets))
  localStorage.removeItem('movieData')
  message.classList.add('success')
  setTimeout(() => {
    message.classList.remove('success')
  }, 5000)
  populateUI()
  updateSelectedCount()
  populateMessage()
})

populateUI()
updateSelectedCount()



