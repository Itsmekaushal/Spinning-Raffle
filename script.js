const wheel = document.getElementById("wheel");
const result = document.getElementById("result");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");

const prizes = [
  "$100", "Movie Tickets", "$500", "Lunch Voucher", "Nothing",
  "$1000", "Gift Card $50", "Spin Again", "10 Large Pizzas", "Slime Gift"
];

const colors = [
  "#f44336", "#ff9800", "#4caf50", "#2196f3", "#9c27b0",
  "#ffeb3b", "#3f51b5", "#009688", "#e91e63", "#8bc34a"
];

const sliceAngle = 360 / prizes.length;

// Create slices
prizes.forEach((prize, i) => {
  const slice = document.createElement("div");
  slice.className = "slice";
  slice.innerText = prize;
  slice.style.transform = `rotate(${i * sliceAngle}deg)`;
  slice.style.background = colors[i % colors.length];
  wheel.appendChild(slice);
});

let currentRotation = 0;

function spin() {
  const randomIndex = Math.floor(Math.random() * prizes.length);
  const spinTo = 360 * 5 + (360 - randomIndex * sliceAngle - sliceAngle / 2);
  currentRotation += spinTo;

  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    showPopup(prizes[randomIndex]);
  }, 4000);
}

function showPopup(text) {
  result.innerText = "You won: " + text;
  overlay.style.display = "block";
  popup.style.display = "block";
}

function closePopup() {
  overlay.style.display = "none";
  popup.style.display = "none";
}
