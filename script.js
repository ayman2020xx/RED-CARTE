const matches = document.querySelectorAll('.match-card');
const modal = document.getElementById('ticket-modal');
const ticketsContainer = modal.querySelector('.tickets');
const closeBtn = modal.querySelector('.close');
const addToCartBtn = modal.querySelector('.add-to-cart');
const errorMessage = modal.querySelector('.error-message'); // Target the error message element
const successMessage = modal.querySelector('.success-message'); // Target the error message element

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
    errorMessage.textContent = ''; // Clear error on new modal open

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
    errorMessage.textContent = ''; // Clear error when selection is made
  }
});

// Store cart items
const cartItems = [];

// Handle 'Add to Cart' click
addToCartBtn.addEventListener('click', () => {
  if (!selectedTicket) {
    errorMessage.textContent = '⚠️Please select a ticket type before adding to cart.';
    return;
  }

  cartItems.push({
    match: currentMatch.replace(/-/g, ' ').toUpperCase(),
    type: selectedTicket.type,
    price: selectedTicket.price
  });

  errorMessage.textContent = ''; // Clear any error
  console.log(cartItems); // For debugging

  // Optional: Show a success message
  successMessage.textContent = `${selectedTicket.type} ticket added to cart!`;

  // Reset selection after adding
  document.querySelectorAll('.ticket-option').forEach(opt => opt.classList.remove('selected'));
  selectedTicket = null;
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
  errorMessage.textContent = '';
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    errorMessage.textContent = '';
  }
});

