'use strict';

// let firstPlayerScore = document.querySelector('#current--0');
// let secondPlayerScore = document.querySelector('#current--1');
// console.log(firstPlayerScore, secondPlayerScore);

// function switchPlayers() {
//   let rolledNumber = Math.trunc(Math.random() * 6) + 1;
//   let current0 = document.querySelector('#current--0');
//   let current1 = document.querySelector('#current--1');
//   if (rolledNumber > 1) {
//     current0.textContent = `${rolledNumber + Number(current0.textContent)} `;
//     console.log(rolledNumber);
//   } else if (rolledNumber === 1) {
//     current0.textContent = 0;
//     // current1.textContent = `${rolledNumber + Number(current1.textContent)} `;
//     // console.log(rolledNumber);
//   }
// }

// document.querySelector('.btn--roll').addEventListener('click', function () {
//   switchPlayers();
// });

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

function playGame() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

playGame();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function rollDice() {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}

btnRoll.addEventListener('click', rollDice);

function holdScores() {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('active-player');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
}

btnHold.addEventListener('click', holdScores);

btnNew.addEventListener('click', playGame);
