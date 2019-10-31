 /* install random-words package
 Make sure you have node.JS installed */
 npm install random-words;

 // The game starts as soon as the window loads 
 window.addEventListener('load', init);
 
 // Global variables
 // Available levels: Change these times to change the number of seconds available for each level
 const levels = {
     easy: 5, 
     medium: 3,
     hard: 1
 }

 // DOM Elements
 const wordInput = document.querySelector('#word-input');
 const currentWord = document.querySelector('#current-word');
 const scoreDisplay = document.querySelector('#score');
 const timeDisplay = document.querySelector('#time');
 const message = document.querySelector('#message');
 const seconds = document.querySelector('#seconds');
 const play = document.querySelector('#play-button');
 const highScore = document.querySelector('#hiscore');
 const easyDifficulty = document.querySelector('#easy');
 const mediumDifficulty = document.querySelector('#medium');
 const hardDifficulty = document.querySelector('#hard');

 // To load default level
 let currentLevel = levels.medium;

 let time = currentLevel;
 let score = 0;
 var highscore = localStorage.getItem('highscore');
 let isPlaying;
 
 // Display high score
 highScore.innerHTML = highscore;

 // Words
 var randomWords = require('random-words');
 const words = randomWords(50);

// Initialise Game 
 function init() {
     // Show number of seconds in UI
     seconds.innerHTML = currentLevel;
     // Display word
     showWord();
     // Start matching on word input 
     wordInput.addEventListener('input', startMatch);
     // Countdown every second
     setInterval(countdown, 1000); 
     // Check game status
     setInterval(checkStatus, 50);
 }

// Select difficulty. This function is called in my HTML file.
 function difficultSelect() {
     if(easyDifficulty.checked) {
         currentLevel = levels.easy
     } else if (mediumDifficulty.checked) {
         currentLevel = levels.medium
     } else {
         currentLevel = levels.hard
     }
     seconds.innerHTML = currentLevel;
}

  // Pick and show random word
  function showWord() {
      // Generate random array index
      const randIndex = Math.floor(Math.random() * words.length);
      // Output random word
      usedWord = words[randIndex]
      currentWord.innerHTML = usedWord
      wordLength = usedWord.length
  }

  // Start match
  function startMatch() {
     if(matchWords()) {
         isPlaying = true;
         time =  currentLevel + 1;
         score = score + wordLength;
         message.innerHTML = 'Keep Going!';
         showWord(words);
         wordInput.value = '';
    }
     // if score = -1, display 0
     if(score === -1) {
         scoreDisplay.innerHTML = 0;  
     } else {
         scoreDisplay.innerHTML = score;  
     }
 }
  // Match currentWord to wordInput
  function matchWords() {
     if(wordInput.value === currentWord.innerHTML) {
         return true;
     } else {
         return false;
     }
 }
  // Countdown timer
  function countdown() {
      // Make sure time is not run out
      if(time > 0) {
        time--;
      } else if(time === 0) {
          //Game is over
          isPlaying = false;
      }
      // Show time
      timeDisplay.innerHTML = time;
 }

  // Check status
  function checkStatus() {
      if(!isPlaying && time === 0) {
          message.innerHTML = 'Game Over';
          message.style.color = '#8b0000';
          if(score > highscore) {
              highscore = score
              localStorage.setItem('highscore', highscore);
              highScore.innerHTML = highscore;
          }
          score = -1;
      }
  }