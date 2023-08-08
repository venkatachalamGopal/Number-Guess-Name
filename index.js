let computerNumber;
let attempts = 0;
let bestScore = Infinity; 

document.getElementById('newGameBtn').addEventListener('click', startNewGame);

function startNewGame() {
  const playerName = prompt('Enter your name:');
  if (playerName === null || playerName === '') {
    alert('Please enter a valid name.');
    return;
  }

  computerNumber = generateRandomNumber();
  attempts = 0;

  document.getElementById('gameContainer').style.display = 'block';
  document.getElementById('guessInput').value = '';
  document.getElementById('guessResult').textContent = '';
  document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
  document.getElementById('bestScore').textContent = `Best Score: ${bestScore}`;
}

document.getElementById('submitGuessBtn').addEventListener('click', submitGuess);

function submitGuess() {
  const userGuess = document.getElementById('guessInput').value;

  if (!isValidGuess(userGuess)) {
    alert('Please enter a valid four-digit number.');
    return;
  }

  attempts++;

  const result = compareGuess(userGuess);
  document.getElementById('guessResult').textContent = `Result: ${result}`;
  document.getElementById('attempts').textContent = `Attempts: ${attempts}`;

  if (result === '++++') {
    updateBestScore();
    alert(`Congratulations! You found the number ${computerNumber} in ${attempts} attempts.`);
    document.getElementById('gameContainer').style.display = 'none';
  }
}

function generateRandomNumber() {
  const digits = [];
  while (digits.length < 4) {
    const digit = Math.floor(Math.random() * 10);
    if (!digits.includes(digit)) {
      digits.push(digit);
    }
  }
  return digits.join('');
}

function isValidGuess(guess) {
  return /^\d{4}$/.test(guess);
}

function compareGuess(guess) {
    console.log(guess);
    console.log(computerNumber);
  let result = '';
  for (let i = 0; i < 4; i++) {
    // console.log(guess[i],computer);
    if (guess[i] === computerNumber[i]) {
      result += '+';
    } else if (computerNumber.includes(guess[i])) {
      result += '-';
    } else {
      result += '*';
    }
  }
  return result;
}

function updateBestScore() {
  bestScore = Math.min(bestScore, attempts);
  document.getElementById('bestScore').textContent = `Best Score: ${bestScore}`;
}