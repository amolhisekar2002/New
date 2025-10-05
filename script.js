

let targetColor = "";
let score = 0;
let time = 30;
let timer;
let colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray", "cyan", "magenta", "lime", "teal", "navy", "maroon", "olive"];

const grid = document.getElementById("grid");
const targetColorDisplay = document.getElementById("target-color");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

function getRandomColor() {

}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createGrid() {
  grid.innerHTML = "";
  shuffleArray(colors);
  targetColor = colors[Math.floor(Math.random() * 16)];
  targetColorDisplay.textContent = targetColor;

  colors.forEach(color => {
    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = color;
    box.addEventListener("click", () => handleClick(color));
    grid.appendChild(box);
  });

}
function handleClick(clikedColor) {
  if (clikedColor === targetColor) {
    score++;
    scoreDisplay.textContent = score;
    correctSound.currentTime = 0; // restart sound
    correctSound.play();
    createGrid();
  } else {
    score--;
    scoreDisplay.textContent = score;
    wrongSound.currentTime = 0;
    wrongSound.play();
  }
}

function startGame() {
  score = 0;
  time = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;
  createGrid();
  clearInterval(timer);
  bgMusic.currentTime = 0;
  if (musicOn) bgMusic.play();
  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time === 0) {
      clearInterval(timer);
      alert(`Game Over! Your score is ${score}`);
      grid.innerHTML = "";
      targetColorDisplay.textContent = "#";
      timeDisplay.textContent = "30";
      scoreDisplay.textContent = "0";
    }
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  gameRunning = false;
  bgMusic.pause();
  alert("Game Over! 🎮 Your Score: " + score);
}

// End Button Click
endBtn.addEventListener("click", endGame);

// Update Timer & Score Display
function updateDisplay() {
  timerDisplay.textContent = `⏱ Timer Left: ${timeLeft} Sec`;
  scoreDisplay.textContent = `🏆 Score: ${score}`;
}


const bgMusic = document.getElementById("bgMusic");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const musicBtn = document.getElementById("musicBtn");

// Music toggle state
let musicOn = true;

// 🎶 Toggle Music On/Off
musicBtn.addEventListener("click", () => {
  if (musicOn) {
    bgMusic.pause();
    musicBtn.textContent = "🔇 Music Off";
  } else {
    bgMusic.play();
    musicBtn.textContent = "🔊 Music On";
  }
  musicOn = !musicOn;
});



const fullscreenBtn = document.getElementById("fullscreenBtn");

// Toggle fullscreen on click
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();   // Enter fullscreen
    fullscreenBtn.textContent = "🡼 Exit Fullscreen";
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();   // Exit fullscreen
      fullscreenBtn.textContent = "⛶ Fullscreen";
    }
  }
});

