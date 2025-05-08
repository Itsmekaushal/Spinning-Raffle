const wheel = document.getElementById('wheel');
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

let deg = 0;

function spinWheel() {
  const randomIndex = Math.floor(Math.random() * prizes.length);
  const anglePerSlice = 360 / prizes.length;
  const rotation = 360 * 5 + (360 - randomIndex * anglePerSlice - anglePerSlice / 2);

  deg = rotation;
  wheel.style.transform = `rotate(${deg}deg)`;

  setTimeout(() => {
    popup.style.display = "block";
    popupText.textContent = `You won: ${prizes[randomIndex].text}`;
    popupImg.src = prizes[randomIndex].image;
  }, 4000);
}

function closePopup() {
  popup.style.display = "none";
}
