'use strict';
//  Elements selection вибір елементів
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');

const diceElement = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const currentScoreOElement = document.getElementById('current--0');
const currentScore1Element = document.getElementById('current--1');

const playerOElement = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

//  Get initial Condstins -  початкові умови гри

let currentScore, totalScores, activePlayer, isPlaying;



const initGame = function () {
    
    totalScores = [0, 0];
    
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;
    
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentScoreOElement.textContent = 0;
    currentScore1Element.textContent = 0;
    // document.getElementById('current--0').textContent = 0;
    // document.getElementById('current--1').textContent = 0;
    
    document.querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
    
    playerOElement.classList.add('player--active');
    
    diceElement.classList.add('hidden');
};

initGame ();

const switchActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOElement.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Roll the dice

btnRoll.addEventListener('click', function () {
  // 1. Generate random nomber
  if (isPlaying) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. Display number on the dice

    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;
    console.log(diceNumber);

    // 3. Switch on the next player if the number is 1, if not equal 1 - add number to the current score

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      console.log('current score:' + currentScore);
      // player1Element.classList.remove('.player--active')
      // currentScoreOElement.textContent = currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 1. add current score to active player total score
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // 2. if total score of active player >= 100,  active player won, if not switch active player
    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
        diceElement.classList.add('hidden');  
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener('click', initGame); 


// КОД ВОРС
// const array = ['a', 'b', 'c'];

// console.log(array);
// var number = function(array){
//     const newArray = [];
//     for ( let i = 0; i < array.length; i++) {
//       console.log(i)
//       return newArray.push(i);
//     }
//   };

// number(array);
