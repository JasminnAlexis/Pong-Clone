/// Audio elements
const soundEffect = new Audio('./sfx/objectsSFX.mp3'); 
const backgroundMusic = document.getElementById('backgroundMusic');

// Start music only after user interaction (autoplay rules)
function startBackgroundMusic() {
  if (!backgroundMusic) return;
  backgroundMusic.currentTime = 0;
  backgroundMusic.play().catch(err => console.warn('BG music blocked until interaction:', err));
}

// Optional: stop
function stopBackgroundMusic() {
  if (!backgroundMusic) return;
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

// One-time unlock on Play button
document.addEventListener('DOMContentLoaded', () => {
  const playBtn = document.getElementById('playBtn');
  if (playBtn && backgroundMusic) {
    playBtn.addEventListener('click', () => {
      backgroundMusic.play().catch(err => console.warn('Could not start BG music:', err));
    }, { once: true });
  }

  // iOS/Safari extra unlock (first tap/keypress)
  const unlock = () => {
    backgroundMusic.play().then(() => {
      backgroundMusic.pause();           
      backgroundMusic.currentTime = 0;
    }).catch(() => {});
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
  };
  window.addEventListener('pointerdown', unlock, { once: true });
  window.addEventListener('keydown', unlock, { once: true });
});


// Utility function to play specific segments of an audio file
function playSegment(audio, startTime, duration) {
    audio.currentTime = startTime;  // Set the start time
    audio.play();  // Start playing

    // Stop playback after the specified duration
    setTimeout(() => {
        audio.pause();
        audio.currentTime = startTime;  // Reset to start time for next play
    }, duration * 1000);  // Convert duration to milliseconds
}

// Sound effect functions
function playBallBounce() {
    playSegment(soundEffect, 1.9, 0.5);
}

function playGameOver() {
    playSegment(soundEffect, 20, 1.1);
}

function playWinner() {
    playSegment(soundEffect, 17, 5);
}

function playLifePowerup() {
    playSegment(soundEffect, 13, 1);
}

function playSpeedPowerup() {
    playSegment(soundEffect, 23, 1.3);
}

function playButtonClicked() {
    playSegment(soundEffect, 5, .5);
}
