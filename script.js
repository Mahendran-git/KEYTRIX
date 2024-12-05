// script.js
// particles.js

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Particle Class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1 + 1;
    this.speedX = Math.random() * 5 - 1;
    this.speedY = Math.random() * 5 - 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Reset position if out of bounds
    if (this.x > canvas.width || this.x < 0) {
      this.x = Math.random() * canvas.width;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.y = Math.random() * canvas.height;
    }
  }

  draw() {
    ctx.fillStyle = '#6600ff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

// Initialize Particles
function initParticles() {
  particlesArray = [];
  const numberOfParticles = 100;
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// Animate Particles
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

// Resize Canvas on Window Resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Start Animation
initParticles();
animateParticles();


const textSamples = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing tests help improve your speed and accuracy.",
    "Practice makes perfect when it comes to typing.",
    "Coding is fun, and practice leads to mastery.",
    "Learning new skills opens the door to endless possibilities.",
    "In the world of design, creativity knows no bounds.",
    "Consistency is the key to mastering any craft.",
    "The beauty of nature inspires creativity in unexpected ways.",
    "Small steps today lead to big achievements tomorrow.",
    "Explore, experiment, and embrace the power of innovation."
  ];
  
  const displayText = document.getElementById('display-text');
  const inputBox = document.getElementById('input-box');
  const timerElement = document.getElementById('timer');
  const wpmElement = document.getElementById('wpm');
  const accuracyElement = document.getElementById('accuracy');
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');
  
  let timeLeft = 60;
  let timer = null;
  let totalTyped = 0;
  let correctTyped = 0;
  let currentText = '';
  
  startBtn.addEventListener('click', startTest);
  restartBtn.addEventListener('click', restartTest);
  
  function startTest() {
    resetStats();
    displayRandomText();
    inputBox.disabled = false;
    inputBox.focus();
    timer = setInterval(updateTimer, 1000);
    startBtn.classList.add('hidden');
    restartBtn.classList.remove('hidden');
    toggleDoneButton(true);
  }
  
  function restartTest() {
    clearInterval(timer);
    timeLeft = 60;
    startTest();
  }
  
  function resetStats() {
    totalTyped = 0;
    correctTyped = 0;
    wpmElement.textContent = 0;
    accuracyElement.textContent = 100;
    timerElement.textContent = timeLeft;
    inputBox.value = '';
  }
  
  function displayRandomText() {
    currentText = textSamples[Math.floor(Math.random() * textSamples.length)];
    displayText.textContent = currentText;
  }
  
  function updateTimer() {
    if (timeLeft > 0) {
      timeLeft--;
      timerElement.textContent = timeLeft;
      calculateStats();
    } else {
      clearInterval(timer);
      inputBox.disabled = true;
      alert('Time is up! Check your results.');
      toggleDoneButton(false);
    }
  }
  
  function calculateStats() {
    totalTyped = inputBox.value.length;
    const correctChars = inputBox.value.split('').filter((char, index) => char === currentText[index]).length;
    correctTyped = correctChars;
    const wpm = Math.round((correctTyped / 5) / ((60 - timeLeft) / 60));
    const accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 100;
  
    wpmElement.textContent = wpm;
    accuracyElement.textContent = accuracy;
  }
  
  // Add event listener for "Done" button
document.getElementById('done-btn').addEventListener('click', () => {
  const wpm = document.getElementById('wpm').textContent;
  const accuracy = document.getElementById('accuracy').textContent;
  const typingScore = calculateTypingScore(wpm, accuracy);

  // Update popup with results
  document.getElementById('popup-wpm').textContent = wpm;
  document.getElementById('popup-accuracy').textContent = accuracy;
  document.getElementById('popup-score').textContent = typingScore;

  // Show the popup
  document.getElementById('result-popup').classList.remove('hidden');
});

// Add event listener for "Close" button
document.getElementById('close-popup').addEventListener('click', () => {
  // Hide the popup
  document.getElementById('result-popup').classList.add('hidden');
});

// Function to calculate typing score (example formula)
function calculateTypingScore(wpm, accuracy) {
  return Math.round(wpm * (accuracy / 100));
}

// Show "Done" button when typing starts and hide it when completed
function toggleDoneButton(show) {
  const doneBtn = document.getElementById('done-btn');
  if (show) {
    doneBtn.classList.remove('hidden');
  } else {
    doneBtn.classList.add('hidden');
  }
}
