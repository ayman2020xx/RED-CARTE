const matches = document.querySelectorAll('.match-card');
const modal = document.getElementById('ticket-modal');
const ticketsContainer = modal.querySelector('.tickets');
const closeBtn = modal.querySelector('.close');
const addToCartBtn = modal.querySelector('.add-to-cart');
const errorMessage = modal.querySelector('.error-message');
const successMessage = modal.querySelector('.success-message');

const ticketData = {
    'morocco-egypt': [
    { type: 'VIP', price: 1000 },
    { type: 'Premium', price: 500 },
    { type: 'Standard', price: 300 },
  ],
  'morocco-spain': [
    { type: 'VIP', price: 1200 },
    { type: 'Premium', price: 600 },
    { type: 'Standard', price: 350 },
  ],
  'morocco-france': [
    { type: 'VIP', price: 1500 },
    { type: 'Premium', price: 700 },
    { type: 'Standard', price: 400 },
  ],
  'morocco-gabon': [
    { type: 'VIP', price: 900 },
    { type: 'Premium', price: 450 },
    { type: 'Standard', price: 250 },
  ],
  'morocco-algeria': [
    { type: 'VIP', price: 1300 },
    { type: 'Premium', price: 650 },
    { type: 'Standard', price: 380 },
  ],
  'morocco-senegal': [
    { type: 'VIP', price: 1400 },
    { type: 'Premium', price: 680 },
    { type: 'Standard', price: 390 },
  ],
  'morocco-tunisia': [
    { type: 'VIP', price: 1100 },
    { type: 'Premium', price: 550 },
    { type: 'Standard', price: 330 },
  ],
  'morocco-portugal': [
    { type: 'VIP', price: 1600 },
    { type: 'Premium', price: 800 },
    { type: 'Standard', price: 450 },
  ],
  'morocco-croatia': [
    { type: 'VIP', price: 1250 },
    { type: 'Premium', price: 620 },
    { type: 'Standard', price: 360 },
  ],
  'morocco-belgium': [
    { type: 'VIP', price: 1350 },
    { type: 'Premium', price: 670 },
    { type: 'Standard', price: 370 },
  ],
  'morocco-brazil': [
    { type: 'VIP', price: 1700 },
    { type: 'Premium', price: 850 },
    { type: 'Standard', price: 480 },
  ],
  // ... other matches
};

let selectedTicket = null;
let currentMatch = null;

// Open modal and display ticket options
matches.forEach(card => {
  card.addEventListener('click', () => {
    const matchKey = card.dataset.match;
    currentMatch = matchKey;
    const tickets = ticketData[matchKey];
    ticketsContainer.innerHTML = '';
    selectedTicket = null;
    errorMessage.textContent = '';
    successMessage.textContent = '';

    if (tickets) {
      tickets.forEach(ticket => {
        const div = document.createElement('div');
        div.classList.add('ticket-option');
        div.dataset.type = ticket.type;
        div.dataset.price = ticket.price;
        div.innerHTML = `<strong>${ticket.type}</strong> - ${ticket.price} MAD`;
        ticketsContainer.appendChild(div);
      });
    } else {
      ticketsContainer.innerHTML = '<p>No tickets available</p>';
    }

    modal.classList.add('show');
  });
});

// Handle selecting a ticket
ticketsContainer.addEventListener('click', (e) => {
  const option = e.target.closest('.ticket-option');
  if (option) {
    document.querySelectorAll('.ticket-option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    selectedTicket = {
      type: option.dataset.type,
      price: parseFloat(option.dataset.price)
    };
    errorMessage.textContent = '';
    successMessage.textContent = '';
  }
});

// Store cart items
addToCartBtn.addEventListener('click', () => {
  if (!selectedTicket) {
    errorMessage.textContent = '⚠️ Please select a ticket type before adding to cart.';
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.push({
    match: formatMatchName(currentMatch),
    type: selectedTicket.type,
    price: selectedTicket.price
  });

function formatMatchName(matchKey) {
  // Example: morocco-egypt → Morocco vs Egypt
  const parts = matchKey.split('-');
  return `${capitalize(parts[0])} vs ${capitalize(parts[1])}`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


  localStorage.setItem('cart', JSON.stringify(cartItems));

  errorMessage.textContent = '';
  successMessage.textContent = `${selectedTicket.type} ticket added to cart!`;

  // Reset selection
  document.querySelectorAll('.ticket-option').forEach(opt => opt.classList.remove('selected'));
  selectedTicket = null;
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
  errorMessage.textContent = '';
  successMessage.textContent = '';
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    errorMessage.textContent = '';
    successMessage.textContent = '';
  }
});



// Navbar toggle
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar && nav) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (close && nav) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}