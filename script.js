const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-button');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 200;

const prizes = [
  { text: 'iPhone', image: 'images/iphone.png' },
  { text: 'Watch', image: 'images/watch.png' },
  { text: 'Laptop', image: 'images/laptop.png' },
  { text: 'Gift Card', image: 'images/giftcard.png' },
  { text: 'Headphones', image: 'images/headphones.png' },
  { text: 'Nothing', image: 'images/nothing.png' }
];

const numSlices = prizes.length;
const anglePerSlice = (2 * Math.PI) / numSlices;
let rotationAngle = 0;
let spinning = false;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numSlices; i++) {
    const startAngle = rotationAngle + i * anglePerSlice;
    const endAngle = startAngle + anglePerSlice;

    // Background
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.fillStyle = i % 2 === 0 ? '#ffcc00' : '#ff9900';
    ctx.fill();
    ctx.stroke();

    // Image
    const img = new Image();
    img.src = prizes[i].image;
    const angle = startAngle + anglePerSlice / 2;
    const x = centerX + 120 * Math.cos(angle) - 20;
    const y = centerY + 120 * Math.sin(angle) - 20;
    img.onload = () => {
      ctx.save();
      ctx.translate(x + 20, y + 20);
      ctx.rotate(angle + Math.PI / 2);
      ctx.drawImage(img, -20, -20, 40, 40);
      ctx.restore();
    };

    // Text
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + anglePerSlice / 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(prizes[i].text, 120, 10);
    ctx.restore();
  }
}

function spinWheel() {
  if (spinning) return;
  spinning = true;

  const randomSpin = Math.floor(3600 + Math.random() * 360); // 10 full spins + random angle
  const finalAngle = (randomSpin % 360) * Math.PI / 180;
  const duration = 5000;
  const start = performance.now();

  function animate(time) {
    const progress = Math.min((time - start) / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3); // easing function
    rotationAngle = (randomSpin * easeOut * Math.PI / 180) % (2 * Math.PI);
    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      showResult();
    }
  }

  requestAnimationFrame(animate);
}

function showResult() {
  const normalizedAngle = (2 * Math.PI - (rotationAngle % (2 * Math.PI))) % (2 * Math.PI);
  const index = Math.floor(normalizedAngle / anglePerSlice) % numSlices;
  const prize = prizes[index];

  popupMessage.innerHTML = `You won <strong>${prize.text}</strong>!`;
  popup.style.display = 'block';
  overlay.style.display = 'block';
}

closeButton.addEventListener('click', () => {
  popup.style.display = 'none';
  overlay.style.display = 'none';
});

drawWheel();
