const pointerContainer = document.getElementById('pointer-container');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const popupImg = document.getElementById('popup-img');

const prizes = [
  { text: "iPhone", image: "images/iphone.png" },
  { text: "Watch", image: "images/watch.png" },
  { text: "Laptop", image: "images/laptop.png" },
  { text: "Gift Card", image: "images/giftcard.png" },
  { text: "Headphones", image: "images/headphones.png" },
  { text: "Try Again", image: "images/nothing.png" }
];

const anglePerSegment = 360 / prizes.length;
let currentRotation = 0;

function spinWheel() {
  const randomSpin = Math.floor(Math.random() * 360);
  const fullRotation = 5 * 360;
  const finalAngle = currentRotation + fullRotation + randomSpin;

  pointerContainer.style.transform = `rotate(${finalAngle}deg)`;
  currentRotation = finalAngle;

  setTimeout(() => {
    const normalizedAngle = finalAngle % 360;
    const index = Math.floor((360 - normalizedAngle + anglePerSegment / 2) % 360 / anglePerSegment);
    const prize = prizes[index];

    popup.style.display = "block";
    popupText.textContent = `You won: ${prize.text}`;
    popupImg.src = prize.image;
  }, 4000);
}

function closePopup() {
  popup.style.display = "none";
}
