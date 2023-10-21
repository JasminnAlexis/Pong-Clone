// DOM Elements
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");
const startMenu = document.getElementById("startMenu");
const onePlayerBtn = document.getElementById("onePlayerBtn");
const twoPlayerBtn = document.getElementById("twoPlayerBtn");
const gameOverMenu = document.getElementById("gameOverMenu");
const gameOverMessage = document.getElementById("gameOverMessage");
const playAgainBtn = document.getElementById("playAgainBtn");
const returnToMenuBtn = document.getElementById("returnToMenuBtn");

// Main game update function
function update() {
    // Return if game hasn't started or is over
    if (!gameStarted) return;
    if (gameOver) {
        gameOverMenu.style.display = "block";
        return;
    }

    frameCount++;

    // Handle game mechanics
    handleBallMovement();
    handleBallCollisions();
    handleOutOfBounds();
    handlePaddleMovement();
    handlePowerUpSpawn();
    handlePowerUpCollision();
    endGame();

    // Check and handle speed boost duration
    if (speedBoostCounter > 0) {
        speedBoostCounter++;
        if (speedBoostCounter >= speedBoostDuration) {
            playerPaddle.dy = originalPlayerPaddleSpeed;
            opponentPaddle.dy = originalPlayerPaddleSpeed;
            speedBoostCounter = 0;
            playerHasBoost = false;
            opponentHasBoost = false;
        }
    }

    // Render game elements
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    drawPaddle(opponentPaddle.x, opponentPaddle.y, opponentPaddle.width, opponentPaddle.height);
    drawPowerUp();
    drawLives();
    drawTimer();

    // Display boost label if active
    if (playerHasBoost) {
        ctx.fillStyle = "#FF0000";
        ctx.font = "20px Arial";
        ctx.fillText("BOOST", playerPaddle.x + playerPaddle.width / 2 - 40, playerPaddle.y + playerPaddle.height + 20);
    }
    if (opponentHasBoost) {
        ctx.fillStyle = "#FF0000";
        ctx.font = "20px Arial";
        ctx.fillText("BOOST", opponentPaddle.x + opponentPaddle.width / 2 - 40, opponentPaddle.y + opponentPaddle.height + 20);
    }

    // Display scores and request next frame
    displayCurrentScore(elapsedTime);
    requestAnimationFrame(update);
}

// Display high score
function displayHighScore() {
    const highScoreElement = document.getElementById("highScoreMessage");
    highScoreElement.innerText = "High Score: " + highScore + " seconds";
}

// Display current score
function displayCurrentScore(score) {
    const currentScoreElement = document.getElementById("currentScoreMessage");
    currentScoreElement.innerText = "Your Score: " + score + " seconds";
}

// Display game over or win message
function displayMessage(message) {
    const gameOverMessageElement = document.getElementById("gameOverMessage");
    gameOverMessageElement.innerText = message;
}

// Handle game end scenarios
function endGame() {
    stopBackgroundMusic();
    if (gameMode === "1-Player") {
        if (playerLives <= 0) {
            if (elapsedTime > highScore){
                playWinner();
            } else {
                playGameOver();
            }
            displayMessage("Game Over");
            displayCurrentScore(elapsedTime);
            if (elapsedTime > highScore) {
                highScore = elapsedTime;
                localStorage.setItem('highScore', highScore);
                displayHighScore();
                displayMessage("New High Score: " + highScore + " seconds");
            } else {
                displayHighScore();
            }
            gameOverMenu.style.display = "block";
        }
    } else if (gameMode === "2-Player") {
        if (playerLives <= 0) {
            displayMessage("Player 2 Wins");
            gameOverMenu.style.display = "block";
            playWinner();
        } else if (opponentLives <= 0) {
            displayMessage("Player 1 Wins");
            gameOverMenu.style.display = "block";
            playWinner();
        }
        document.getElementById("highScoreMessage").style.display = "none";
        document.getElementById("currentScoreMessage").style.display = "none";
    }
}

// Start the game loop
update();
