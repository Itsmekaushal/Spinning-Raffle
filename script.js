const segments = document.querySelectorAll('.segment');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupImage = document.getElementById('popup-image');
const overlay = document.querySelector('.overlay');

const prizes = [
  { name: 'iPhone', image: 'iphone.png' },
  { name: 'Laptop', image: 'laptop.png' },
  { name: 'Headphones', image: 'headphones.png' },
  { name: 'Smart Watch', image: 'watch.png' },
  { name: 'Tablet', image: 'tablet.png' },
  { name: 'Gift', image: 'gift.png' }
];

function spinWheel() {
  const randomDeg = Math.floor(Math.random() * 360) + 3600; // Random spin angle
  const prizeIndex = Math.floor((randomDeg % 360) / 60); // Divide 360 into 6 segments
  const prize = prizes[prizeIndex];

  document.querySelector('.wheel').style.transition = 'transform 3s ease-out';
  document.querySelector('.wheel').style.transform = `rotate(${randomDeg}deg)`;

  overlay.style.display = 'block';
  popup.style.display = 'block';
  popupMessage.innerText = `Congratulations! You won a ${prize.name}!`;
  popupImage.src = prize.image;
}

document.querySelector('.close-button').addEventListener('click', () => {
  popup.style.display = 'none';
  overlay.style.display = 'none';
});
