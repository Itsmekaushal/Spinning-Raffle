const wheel = document.getElementById("wheel");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const popupImg = document.getElementById("popup-img");

const prizes = [
  { name: "iPhone", img: "images/iphone.png" },
  { name: "Laptop", img: "images/laptop.png" },
  { name: "Smart Watch", img: "images/watch.png" },
  { name: "Headphones", img: "images/headphones.png" },
  { name: "Camera", img: "images/camera.png" },
  { name: "Gift Card", img: "images/voucher.png" }
];

let currentRotation = 0;

function spinWheel() {
  const randomIndex = Math.floor(Math.random() * prizes.length);
  const anglePerSlice = 360 / prizes.length;
  const extraSpins = 5; // for visual spin effect
  const angle = (360 - (randomIndex * anglePerSlice)) + (360 * extraSpins);

  currentRotation += angle;

  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    popupText.innerText = `You won: ${prizes[randomIndex].name}`;
    popupImg.src = prizes[randomIndex].img;
    popup.style.display = "block";
  }, 4000);
}

function closePopup() {
  popup.style.display = "none";
}
