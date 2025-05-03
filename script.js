const dot = document.getElementById("dot");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const gameArea = document.querySelector(".game-area");

let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;
let gameActive = false;

// Move dot to random position
function moveDot() {
  const maxX = gameArea.clientWidth - dot.clientWidth;
  const maxY = gameArea.clientHeight - dot.clientHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  dot.style.left = `${randomX}px`;
  dot.style.top = `${randomY}px`;
}

// Handle dot click
dot.addEventListener("click", () => {
  if (!gameActive) return;

  score++;
  scoreDisplay.textContent = score;
  moveDot();
});

// Start game
startBtn.addEventListener("click", () => {
  if (gameActive) return;

  gameActive = true;
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  startBtn.disabled = true;

  moveDot();

  // Move dot every second
  gameInterval = setInterval(moveDot, 700);

  // Countdown timer
  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
});

// End game
function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  gameActive = false;
  startBtn.disabled = false;
  alert(`Game Over! Your score: ${score}`);
}
