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

let currentRotation = 0;

function spinWheel() {
  const anglePerSlice = 360 / prizes.length;

  // Generate random prize index
  const randomIndex = Math.floor(Math.random() * prizes.length);
  console.log("Random Index:", randomIndex);

  // Calculate total rotation
  const fullRotation = 5 * 360;
  const prizeAngle = (prizes.length - randomIndex) * anglePerSlice;
  const totalRotation = fullRotation + prizeAngle;

  // Rotate the wheel
  pointerContainer.style.transition = 'transform 4s ease-out';
  pointerContainer.style.transform = `rotate(${currentRotation + totalRotation}deg)`;

  currentRotation += totalRotation;

  // After spin, show popup
  setTimeout(() => {
    const normalizedAngle = currentRotation % 360;
    console.log("Normalized Angle:", normalizedAngle);

    let index = Math.floor(normalizedAngle / anglePerSlice);
    index = (prizes.length - index) % prizes.length;
    console.log("Calculated Index:", index);

    const prize = prizes[index];
    console.log("Selected Prize:", prize);

    popup.style.display = "block";
    popupText.textContent = `You won: ${prize.text}`;
    popupImg.src = prize.image;
  }, 4000);
}

function closePopup() {
  popup.style.display = "none";
}
