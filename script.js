const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.querySelector('.spin-button');
const overlay = document.querySelector('.overlay');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const closeButton = document.querySelector('.close-button');

const prizes = [
  { name: 'iPhone', img: 'images/iphone.png' },
  { name: 'Laptop', img: 'images/laptop.png' },
  { name: 'Watch', img: 'images/watch.png' },
  { name: 'Headphones', img: 'images/headphones.png' },
  { name: 'Gift Card', img: 'images/giftcard.png' },
  { name: 'Camera', img: 'images/camera.png' },
  { name: 'Tablet', img: 'images/tablet.png' },
  { name: 'Vacation', img: 'images/vacation.png' }
];

const numSlices = prizes.length;
const anglePerSlice = (2 * Math.PI) / numSlices;
let currentAngle = 0;
let isSpinning = false;

// Preload images
const loadedImages = [];
prizes.forEach((prize, index) => {
  const img = new Image();
  img.src = prize.img;
  loadedImages[index] = img;
});

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numSlices; i++) {
    const angle = i * anglePerSlice;

    // Draw slice
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, angle, angle + anglePerSlice);
    ctx.fillStyle = i % 2 === 0 ? '#ffcc00' : '#ff6666';
    ctx.fill();
    ctx.stroke();

    // Draw prize name
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(angle + anglePerSlice / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText(prizes[i].name, 170, 10);
    ctx.restore();

    // Draw prize image (after image is loaded)
    const img = loadedImages[i];
    if (img.complete) {
      const imgAngle = angle + anglePerSlice / 2;
      const imgX = 200 + Math.cos(imgAngle) * 120 - 20;
      const imgY = 200 + Math.sin(imgAngle) * 120 - 20;
      ctx.save();
      ctx.translate(imgX + 20, imgY + 20);
      ctx.rotate(imgAngle + Math.PI / 2);
      ctx.drawImage(img, -20, -20, 40, 40);
      ctx.restore();
    }
  }
}

function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;

  const spinAngle = Math.floor(Math.random() * 360) + 360 * 5; // 5 full spins
  const duration = 5000; // spin duration
  const start = performance.now();

  function animate(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const easing = 1 - Math.pow(1 - progress, 3); // ease-out
    currentAngle = (spinAngle * easing) % 360;

    canvas.style.transform = `rotate(${currentAngle}deg)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      showResult();
      isSpinning = false;
    }
  }

  requestAnimationFrame(animate);
}

function showResult() {
  const degrees = 360 - (currentAngle % 360);
  const index = Math.floor((degrees % 360) / (360 / numSlices));
  const prize = prizes[index];

  popupMessage.innerHTML = `
    <img src="${prize.img}" alt="${prize.name}" style="width: 100px; height: 100px; margin-bottom: 10px;"><br>
    Congratulations! You won a <strong>${prize.name}</strong>!
  `;
  overlay.style.display = 'block';
  popup.style.display = 'block';
}

closeButton.onclick = function () {
  overlay.style.display = 'none';
  popup.style.display = 'none';
};

window.onload = drawWheel;
