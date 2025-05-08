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
  const index = Math.floor(Math.random() * prizes.length);
  const angle = 360 / prizes.length;
  const rotateTo = (360 * 5) + (360 - index * angle) - angle / 2;

  currentRotation += rotateTo;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    popupText.innerText = `You won: ${prizes[index].name}`;
    popupImg.src = prizes[index].img;
    popup.style.display = "block";
  }, 4000);
}

function closePopup() {
  popup.style.display = "none";
}
