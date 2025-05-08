const prizes = [
  "💰💎 $1,000 Cash!",
  "🔄✨ Try Again!",
  "🍕🍕 10 Large Pizzas",
  "💵 $500 Cash",
  "❓🎁 Mystery Box",
  "🎬🍿 2 Movie Tickets",
  "💸 $100 Bonus",
  "🍽️👑 Luxury Lunch",
  "🎉🎁 Gift Hamper",
  "🛍️💳 $50 Gift Card"
];

const wheel = document.getElementById('wheel');
const numSegments = prizes.length;
const angle = 360 / numSegments;

// Create wheel segments
prizes.forEach((prize, i) => {
  const segment = document.createElement('div');
  segment.style.transform = `rotate(${i * angle}deg) skewY(-${90 - angle}deg)`;
  segment.style.background = i % 2 === 0 ? '#FFD700' : '#FF6347';
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
}
.segment span {
  display: block;
  padding: 10px;
  font-size: 14px;
  text-align: center;
  transform-origin: center center;
  color: white;
  font-weight: bold;
}
`;
document.head.appendChild(style);

// Spin logic
function spinWheel() {
  const randomDeg = Math.floor(Math.random() * 360) + 1800; // multiple spins
  wheel.style.transform = `rotate(${randomDeg}deg)`;
}
