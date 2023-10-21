// Audio elements
const soundEffect = new Audio('SFX/objectsSFX.mp3');
const backgroundMusic = document.getElementById("backgroundMusic");

// Background music control functions
function startBackgroundMusic() {
    backgroundMusic.play().catch(error => {
        console.error("Error playing background music:", error);
    });
}

function stopBackgroundMusic() {
    backgroundMusic.currentTime = 0;
    backgroundMusic.pause();
}

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
