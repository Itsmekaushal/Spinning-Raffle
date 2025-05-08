const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const prizes = [
  { name: "Phone", img: "images/phone.png" },
  { name: "Headphones", img: "images/headphones.png" },
  { name: "Watch", img: "images/watch.png" },
  { name: "Camera", img: "images/camera.png" },
  { name: "Gift Card", img: "images/giftcard.png" },
  { name: "Laptop", img: "images/laptop.png" }
];

const totalSegments = prizes.length;
const segmentAngle = 2 * Math.PI / totalSegments;
let currentAngle = 0;
let isSpinning = false;
let spinAngle = 0;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  prizes.forEach((prize, i) => {
    const angle = i * segmentAngle;

    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, angle, angle + segmentAngle);
    ctx.fillStyle = i % 2 === 0 ? "#ff6f61" : "#fbd14b";
    ctx.fill();
    ctx.save();

    ctx.translate(200, 200);
    ctx.rotate(angle + segmentAngle / 2);
    const img = new Image();
    img.src = prize.img;
    img.onload = () => ctx.drawImage(img, 120, -25, 40, 40);
    ctx.restore();
  });
}

function spinWheel() {
  if (isSpinning) return;

  isSpinning = true;
  const spins = 10 + Math.floor(Math.random() * 5);
  const spinDeg = spins * 360 + Math.floor(Math.random() * 360);
  const spinRad = (spinDeg * Math.PI) / 180;

  let duration = 3000;
  const start = performance.now();

  function animate(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 4);
    currentAngle = spinRad * easeOut;

    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(currentAngle);
    ctx.translate(-200, -200);
    drawWheel();
    ctx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      const winningIndex = totalSegments - Math.floor(((currentAngle % (2 * Math.PI)) / segmentAngle)) - 1;
      showPopup(prizes[winningIndex]);
    }
  }

  requestAnimationFrame(animate);
}

function showPopup(prize) {
  document.querySelector(".overlay").style.display = "block";
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  popupMessage.innerHTML = `<img src="${prize.img}" width="100"><br><strong>You won: ${prize.name}!</strong>`;
  popup.style.display = "block";
}

document.querySelector(".close-button").onclick = function () {
  document.getElementById("popup").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
};

drawWheel();
