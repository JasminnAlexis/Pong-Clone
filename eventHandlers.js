// Variables to track key presses
let upArrowPressed = false;
let downArrowPressed = false;
let wKeyPressed = false;
let sKeyPressed = false;

// Event listeners for arrow keys


document.addEventListener("keydown", function(event) {
    switch (event.keyCode) {
        case 38: // Up arrow
            upArrowPressed = true;
            break;
        case 40: // Down arrow
            downArrowPressed = true;
            break;
        case 87: // W key
            wKeyPressed = true;
            break;
        case 83: // S key
            sKeyPressed = true;
            break;
    }
});

document.addEventListener("keyup", function(event) {
    switch (event.keyCode) {
        case 38: // Up arrow
            upArrowPressed = false;
            break;
        case 40: // Down arrow
            downArrowPressed = false;
            break;
        case 87: // W key
            wKeyPressed = false;
            break;
        case 83: // S key
            sKeyPressed = false;
            break;
    }
});

const playBtn = document.getElementById('playBtn');
const titleScreen = document.getElementById('titleScreen');

playBtn.addEventListener('click', function() {
    playButtonClicked();
    titleScreen.style.display = 'none';
    startMenu.style.display = "block";
    startMenu.style.display = "flex";
    startMenu.style.justifyContent = "center";
    startMenu.style.alignItems = "center";
});

canvas.addEventListener("click", function() {
    if (!gameStarted) {
        gameStarted = true;
        startTime = Date.now(); // Reset the timer
        update(); // Start the game loop
    }
});

onePlayerBtn.addEventListener("click", function() {
    playButtonClicked();
    if (localStorage.getItem('highScore')) {
        highScore = parseInt(localStorage.getItem('highScore'));
    }
    gameStarted = true;
    gameMode = "1-Player";
    startTime = Date.now(); // Start the timer
    startMenu.style.display = "none";
    update();
});


twoPlayerBtn.addEventListener("click", function() {
    playButtonClicked();
    gameStarted = true;
    gameMode = "2-Player";
    startMenu.style.display = "none";
    update();
});

const backToHomeBtn = document.getElementById('backToHome');

backToHomeBtn.addEventListener('click', function() {
    playButtonClicked();
    // Hide the start menu
    startMenu.style.display = 'none';
    
    // Show the title screen
    titleScreen.style.display = 'block';
    titleScreen.style.display = "flex";
    titleScreen.style.justifyContent = "center";
    titleScreen.style.alignItems = "center";
});

playAgainBtn.addEventListener("click", function() {
    playButtonClicked();
    // Reset game state
    playerLives = 3;
    opponentLives = 3;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4;
    ball.dy = 4;
    gameOver = false;
    startTime = Date.now();
    gameOverMenu.style.display = "none";
    update();
});

returnToMenuBtn.addEventListener("click", function() {
    playButtonClicked();
    // Reset game state and show start menu
    playerLives = 3;
    opponentLives = 3;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4;
    ball.dy = 4;
    gameOver = false;
    gameStarted = false;
    gameMode = "";
    gameOverMenu.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startMenu.style.display = "block";
    startMenu.style.display = "flex";
    startMenu.style.justifyContent = "center";
    startMenu.style.alignItems = "center";

});
