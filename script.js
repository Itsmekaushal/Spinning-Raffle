let currentRotation = 0;

function spinWheel() {
  const wheel = document.getElementById('wheel');
  const randomDegree = Math.floor(Math.random() * 360) + 3600; // 3600 for at least 10 full spins
  const spinDuration = 4000; // 4 seconds for the spin

  wheel.style.transition = `transform ${spinDuration}ms ease-out`;
  currentRotation += randomDegree;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  // Show popup when the wheel stops spinning
  setTimeout(() => {
    showPopup();
  }, spinDuration);
}

function showPopup() {
  const popup = document.getElementById('popup');
  const overlay = document.querySelector('.overlay');
  const popupMessage = document.getElementById('popup-message');
  popupMessage.innerText = "Congratulations, you won Prize 3!";
  popup.style.display = 'block';
  overlay.style.display = 'block';

  // Close button functionality
  const closeButton = document.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
  });
}
