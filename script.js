const prizes = [
  "💰 Win $1,000",
  "🍕 Free Pizza",
  "🎁 Gift Hamper",
  "🎟️ Movie Tickets",
  "💳 $50 Gift Card",
  "❌ Try Again"
];

const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#A66DD4", "#FF922B"];

const wheel = document.getElementById('wheel');
const numSegments = prizes.length;
const angle = 360 / numSegments;

// Create wheel segments
prizes.forEach((prize, i) => {
  const segment = document.createElement('div');
  segment.style.transform = `rotate(${i * angle}deg) skewY(-${90 - angle}deg)`;
  segment.style.background = colors[i % colors.length];
  segment.className = 'segment';
  segment.innerHTML = `<span style="transform: skewY(${90 - angle}deg) rotate(${angle / 2}deg)">${prize}</span>`;
  wheel.appendChild(segment);
});

// Add CSS for segments
const style = document.createElement('style');
style.textContent = `
.segment {
  position: absolute;
  width: 50%;
  height: 50%;
  left: 50%;
  top: 50%;
  transform-origin: 0% 0%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.segment span {
  display: block;
  padding: 10px;
  font-size: 15px;
  text-align: center;
  transform-origin: center center;
  color: white;
  font-weight: bold;
  max-width: 100px;
}
`;
document.head.appendChild(style);

// Spin logic
function spinWheel() {
  const randomDeg = Math.floor(Math.random() * 360) + 1440; // 4 spins minimum
  wheel.style.transform = `rotate(${randomDeg}deg)`;
}
