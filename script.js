const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const popup = document.getElementById("popup");
const overlay = document.querySelector(".overlay");
const popupMessage = document.getElementById("popup-message");

const prizes = [
  "₹500 Amazon Voucher",
  "Free Movie Ticket",
  "Bluetooth Earbuds",
  "1-Month Netflix",
  "Free Pizza Coupon",
  "Smart Watch",
  "Mystery Gift Box",
  "Better Luck Next Time 😢"
];

const colors = ["#ff4d4d", "#ffcc00", "#4dd2ff", "#33cc33", "#ff4d4d", "#ffcc00", "#4dd2ff", "#33cc33"];

let startAngle = 0;
const arc = Math.PI * 2 / prizes.length;

function drawWheel() {
  for (let i = 0; i < prizes.length; i++) {
    let angle = startAngle + i * arc;
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, angle, angle + arc, false);
    ctx.lineTo(200, 200);
    ctx.fill();

    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(angle + arc / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "right";
    ctx.fillText(i + 1, 170, 10); // Slice number
    ctx.restore();
  }
}

drawWheel();

let rotation = 0;
let isSpinning = false;

function spinWheel() {
  if (isSpinning) return;

  isSpinning = true;
  const spins = Math.floor(Math.random() * 41) + 10;  // Spins between 10 and 50
  const stopSlice = Math.floor(Math.random() * prizes.length);
  const degreesPerSlice = 360 / prizes.length;
  const targetRotation = 360 * spins + (360 - stopSlice * degreesPerSlice - degreesPerSlice / 2);

  let duration = 5000;
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const easedProgress = easeOutCubic(Math.min(progress / duration, 1));
    const current = rotation + easedProgress * (targetRotation - rotation);

    canvas.style.transform = `rotate(${current}deg)`;

    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      rotation = targetRotation % 360;
      showPopup(prizes[stopSlice]);
      isSpinning = false;
    }
  }

  requestAnimationFrame(animate);
}



function easeOutCubic(t) {
  return (--t) * t * t + 1;
}

function showPopup(prize) {
  popupMessage.textContent = `🎉 Congratulations! You won: ${prize}`;
  popup.style.display = "block";
  overlay.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
    overlay.style.display = "none";
  }, 4000);
}

document.querySelector(".close-button").onclick = () => {
  popup.style.display = "none";
  overlay.style.display = "none";
};
