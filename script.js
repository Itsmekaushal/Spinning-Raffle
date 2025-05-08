const wheel = document.getElementById("wheel");
const prizes = ["$100", "$500", "Spin Again", "Nothing", "Gift Card", "Free Pizza"];
const colors = ["#FFD700", "#ADFF2F", "#FF6347", "#87CEEB", "#FF69B4", "#40E0D0"];
const total = prizes.length;

function createSlices() {
  for (let i = 0; i < total; i++) {
    const slice = document.createElement("div");
    slice.className = "slice";
    slice.style.background = colors[i];
    slice.style.transform = `rotate(${i * (360 / total)}deg)`;
    slice.innerText = prizes[i];
    wheel.appendChild(slice);
  }
}

let currentRotation = 0;

function spin() {
  const spinDeg = 360 * 5 + Math.floor(Math.random() * 360);
  currentRotation += spinDeg;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  const sliceDeg = 360 / total;
  const normalized = (360 - (currentRotation % 360)) % 360;
  const index = Math.floor(normalized / sliceDeg);

  setTimeout(() => {
    document.getElementById("result").innerText = `You got: ${prizes[index]}`;
    document.getElementById("popup").style.display = "block";
  }, 4000);
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

createSlices();
