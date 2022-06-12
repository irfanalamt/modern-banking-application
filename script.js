'use strict';

// Data
const account1 = {
  owner: 'Irfan Alam',
  movements: [500, 250, -600, 3000, -750, -30, 90, 1380],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: 'Kevin Nash',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steve Harry',
  movements: [100, -200, 540, -200, -80, 150, 300, -660],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Jake Cole',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 2345,
};

const accounts = [account1, account2, account3, account4];

//Elements
const labelWelcome = document.querySelector('.login-text');
const inputLoginUsername = document.querySelector('.form_input_id');
const inputLoginPin = document.querySelector('.form_input_password');
const btnLogin = document.querySelector('.form_login_button');
const navbar = document.querySelector('.navbar');
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const containerApp = document.querySelector('.app');

const inputTransferTo = document.querySelector('.transfer_to');
const inputTransferAmount = document.querySelector('.transfer_amount');
const btnTransfer = document.querySelector('.transfer_button');

const containerMovements = document.querySelector('.movements');
const labelBalance = document.querySelector('.balance_amount');

const toastLive = document.getElementById('liveToast');
const toastBody = document.querySelector('.toast-body');

// To display [movements] of single user to screen
const displayMovements = (movements) => {
  containerMovements.innerHTML = '';

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const themeClass =
      mov > 0 ? 'badge text-bg-success' : 'badge text-bg-danger';
    const html = `<div class="row movement_row mb-2 p-1">
    <div class="movement_item ${themeClass}">${type}</div>
    <div class="movement_item"></div>
    <div class="movement_item">${mov}$</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//To generate username using first letter of each letter in name
const userNameGenerator = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};
userNameGenerator(accounts);

// Calculate, update balance from [movements]
const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}$`;
};

//Create custom alerts and append to html
const alert = (message, type) => {
  alertPlaceholder.innerText = `${message}`;
  alertPlaceholder.className = `alert alert-${type} mx-auto text-center mt-3 w-50`;
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);
};

//Event handlers

//login click event
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    alertPlaceholder.remove();
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  } else {
    alert('Invalid PIN!', 'danger');
  }
});

//transfer operation
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    toastBody.innerText = `${amount}$ transferred to ${receiverAcc.owner}.✅`;
    const toast = new bootstrap.Toast(toastLive);
    toast.show();

    // Update UI
    updateUI(currentAccount);
  } else {
    toastBody.innerText = `Transfer unsuccessful!❌`;
    const toast = new bootstrap.Toast(toastLive);
    toast.show();
  }
});
