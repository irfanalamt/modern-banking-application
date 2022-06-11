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
  owner: 'Steven Thomas Williams',
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
const containerMovements = document.querySelector('.movements');

const displayMovements = (movements) => {
  containerMovements.innerHTML = '';

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const themeClass =
      mov > 0 ? 'badge text-bg-success' : 'badge text-bg-danger';
    const html = `<div class="row movement_row mb-2 p-1">
    <div class="movement_item ${themeClass}">${type}</div>
    <div class="movement_item"></div>
    <div class="movement_item">${mov}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);
