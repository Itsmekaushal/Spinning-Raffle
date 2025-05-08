let rotation = 0;

function spinWheel() {
  // Generate a random number for rotation between 0 and 360
  let randomRotation = Math.floor(Math.random() * 360) + 1800;  // Ensure it spins multiple times

  // Apply the random rotation to the wheel
  document.getElementById('wheel').style.transition = "transform 4s ease-out";
  document.getElementById('wheel').style.transform = `rotate(${randomRotation}deg)`;

  // Show the popup after the spin is complete
  setTimeout(() => {
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('#popup').style.display = 'block';
    document.querySelector('#popup-message').textContent = "You won!";  // Customize message
  }, 4000);  // Popup appears after 4 seconds (end of rotation)
}

// Close the popup
document.querySelector('.close-button').addEventListener('click', () => {
  document.querySelector('.overlay').style.display = 'none';
  document.querySelector('#popup').style.display = 'none';
});
