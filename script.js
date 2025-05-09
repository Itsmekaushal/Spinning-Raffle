const wheel = document.getElementById('wheel');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const popupImg = document.getElementById('popup-img');

const prizes = [
  { text: "Headphones", image: "images/headphones.png" }, // position 0
  { text: "Gift Card", image: "images/giftcard.png" },     // position 1
  { text: "Laptop", image: "images/laptop.png" },          // position 2
  { text: "Watch", image: "images/watch.png" },            // position 3
  { text: "iPhone", image: "images/iphone.png" },          // position 4
  { text: "Try Again", image: "images/nothing.png" }       // position 5
];

let currentRotation = 0;

function spinWheel() {
  const anglePerSlice = 360 / prizes.length;
  const randomIndex = Math.floor(Math.random() * prizes.length);

  const fullRotation = 5 * 360;
  const prizeAngle = randomIndex * anglePerSlice + anglePerSlice / 2;
  const totalRotation = fullRotation - prizeAngle;

  wheel.style.transition = 'transform 4s ease-out';
  wheel.style.transform = `rotate(${currentRotation + totalRotation}deg)`;

  currentRotation += totalRotation;

  setTimeout(() => {
    const normalizedAngle = (currentRotation % 360 + 360) % 360;
    const index = Math.floor((normalizedAngle + anglePerSlice / 2) % 360 / anglePerSlice);

    const prize = prizes[index];
    popup.style.display = "block";
    popupText.textContent = `You won: ${prize.text}`;
    popupImg.src = prize.image;
  }, 4000);
}

function closePopup() {
  popup.style.display = "none";
}
