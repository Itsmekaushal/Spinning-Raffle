const pointerContainer = document.getElementById('pointer-container');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const popupImg = document.getElementById('popup-img');

const prizes = [
  { text: "Headphones", image: "images/headphones.png" },
  { text: "Try Again", image: "images/nothing.png" },
  { text: "iPhone", image: "images/iphone.png" },
  { text: "Watch", image: "images/watch.png" },
  { text: "Laptop", image: "images/laptop.png" },
  { text: "Gift Card", image: "images/giftcard.png" }
];

let currentRotation = 0;

function spinWheel() {
  const anglePerSlice = 360 / prizes.length;
  const randomIndex = Math.floor(Math.random() * prizes.length);
  const fullRotation = 5 * 360;
  const prizeAngle = randomIndex * anglePerSlice + anglePerSlice / 2;
  const totalRotation = fullRotation + prizeAngle;

  pointerContainer.style.transition = 'transform 4s ease-out';
  pointerContainer.style.transform = `rotate(${currentRotation + totalRotation}deg)`;

  currentRotation += totalRotation;

  setTimeout(() => {
    const normalizedAngle = ((currentRotation - 120) % 360 + 360) % 360; // Adjust this part if needed
    const index = Math.floor(normalizedAngle / anglePerSlice); // Fix index calculation here

    const prize = prizes[index];
    showPopup(prize);
  }, 4000);
}

function showPopup(prize) {
  popup.style.display = "block";
  popupText.textContent = `You won: ${prize.text}`;
  popupImg.src = prize.image;
}

function closePopup() {
  popup.style.display = "none";
}
