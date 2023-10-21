
// Create the ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    dx: 4,
    dy: 4,
    color: "#CC3F63"
};

// Create the paddles
const playerPaddle = {
    x: canvas.width - 30,
    y: canvas.height / 2 - 40,
    width: 10,
    height: 80,
    color: "#CC3F63",
    dy: 4
};
const originalPlayerPaddleSpeed = playerPaddle.dy;


const opponentPaddle = {
    x: 20,
    y: canvas.height / 2 - 40,
    width: 10,
    height: 80,
    color: "#CC3F63",
    dy: 4
};

// Define the power-up object
const powerUp = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    type: "", // "speedBoost" or "extraLife"
    active: false
};

function handleBallMovement() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Increment ball speed every 30 seconds (assuming 60 frames per second)
    if (frameCount % (30 * 60) === 0) {
        console.log("Increasing ball and paddle speed...");
    
        ball.dx += ball.dx > 0 ? ballSpeedIncrement : -ballSpeedIncrement;
        ball.dy += ball.dy > 0 ? ballSpeedIncrement : -ballSpeedIncrement;
    
        playerPaddle.dy += paddleSpeedIncrement;
    }    
    
}

function changeBallColor() {
    currentBallColorIndex = (currentBallColorIndex + 1) % ballColors.length;
    ball.color = ballColors[currentBallColorIndex];
}

function handleBallCollisions() {
    // Ball collision with top and bottom
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
        changeBallColor();
        playBallBounce();
    }

    // Ball collision with paddles
    if (
        (ball.dx > 0 && ball.x + ball.radius > playerPaddle.x && ball.y + ball.radius > playerPaddle.y && ball.y - ball.radius < playerPaddle.y + playerPaddle.height) ||
        (ball.dx < 0 && ball.x - ball.radius < opponentPaddle.x + opponentPaddle.width && ball.y + ball.radius > opponentPaddle.y && ball.y - ball.radius < opponentPaddle.y + opponentPaddle.height)
    ) {
        ball.dx = -ball.dx;
        changeBallColor();
        playBallBounce();
    }
}




function handleOutOfBounds() {
    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -ball.dx;
        playerLives--;
        if (playerLives <= 0) {
            gameOver = true;
        }
    }
    if (ball.x - ball.radius < 0) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -ball.dx;
        opponentLives--;
        if (opponentLives <= 0) {
            gameOver = true;
        }
    }
}

function lerp(a, b, t) {
    return a + t * (b - a);
}
function predictBallPosition() {
    // Predict where the ball will be when it reaches the AI paddle's x position
    const timeToReachPaddle = (opponentPaddle.x - ball.x) / ball.dx;
    return ball.y + ball.dy * timeToReachPaddle;
}

function handlePaddleMovement() {
    if (gameMode === "1-Player") {
        const paddleCenter = opponentPaddle.y + opponentPaddle.height / 2;
        const distanceToBall = ball.y - paddleCenter;
        
        // Determine the direction the paddle should move
        const direction = Math.sign(distanceToBall);

        // Adjust the AI paddle speed based on the distance to the ball
        const maxSpeed = Math.abs(ball.dy) + 1;
        opponentPaddle.dy = Math.min(maxSpeed, Math.abs(distanceToBall) * 0.3);

        if (direction > 0 && opponentPaddle.y + opponentPaddle.height < canvas.height) {
            opponentPaddle.y += opponentPaddle.dy;
        } else if (direction < 0 && opponentPaddle.y > 0) {
            opponentPaddle.y -= opponentPaddle.dy;
        }
    } else if (gameMode === "2-Player") {
        // Player controls for opponent paddle
        if (wKeyPressed && opponentPaddle.y > 0) {
            opponentPaddle.y -= opponentPaddle.dy;
        } else if (sKeyPressed && (opponentPaddle.y < canvas.height - opponentPaddle.height)) {
            opponentPaddle.y += opponentPaddle.dy;
        }
    }

    // Move the player paddle
    if (upArrowPressed && playerPaddle.y > 0) {
        playerPaddle.y -= playerPaddle.dy;
    } else if (downArrowPressed && (playerPaddle.y < canvas.height - playerPaddle.height)) {
        playerPaddle.y += playerPaddle.dy;
    }
}
function handlePowerUpSpawn() {
    if (frameCount % 1000 === 0) {
        powerUp.active = true;
        powerUp.type = Math.random() < 0.5 ? "speedBoost" : "extraLife";
        
        // Randomly decide which side the power-up appears on
        if (Math.random() < 0.5 || gameMode === "1-Player") {
            // Player's side
            powerUp.x = playerPaddle.x - powerUp.width;
            powerUp.y = Math.random() * (canvas.height - powerUp.height); // Random position along the canvas height
        } else {
            // Opponent's side
            powerUp.x = opponentPaddle.x + opponentPaddle.width;
            powerUp.y = Math.random() * (canvas.height - powerUp.height); // Random position along the canvas height
        }
        
        powerUpCounter = 0;
    }
    if (powerUp.active) {
        powerUpCounter++;
        if (powerUpCounter >= powerUpDuration) {
            powerUp.active = false;
        }
    }
}

function isColliding(rect1, rect2) {
    return rect1.x <= rect2.x + rect2.width &&
           rect1.x + rect1.width >= rect2.x &&
           rect1.y <= rect2.y + rect2.height &&
           rect1.y + rect1.height >= rect2.y;
}

function handlePowerUpCollision() {
    if (powerUp.active) {
        if (isColliding(powerUp, playerPaddle)) {
            console.log("Collision with player paddle detected!");
            applyPowerUpEffect("player");
            powerUp.active = false;
        } else if (gameMode === "2-Player" && isColliding(powerUp, opponentPaddle)) {
            console.log("Collision with opponent paddle detected!");
            applyPowerUpEffect("opponent");
            powerUp.active = false;
        }
    }
}

function applyPowerUpEffect(paddle) {
    if (powerUp.type === "speedBoost") {
        playSpeedPowerup();
        speedBoostCounter = 1; // Reset the counter when speed boost is applied
        if (paddle === "player") {
            playerPaddle.dy *= 1.5; // Increase player paddle speed by 50%
            playerHasBoost = true;
        } else {
            opponentPaddle.dy *= 1.5; // Increase opponent paddle speed by 50%
            opponentHasBoost = true;
        }
    } else if (powerUp.type === "extraLife") {
        playLifePowerup();
        if (paddle === "player") {
            playerLives++;
        } else {
            opponentLives++;
        }
    }
}

function checkHighScore() {
    if (playerScore > highScore) {
        highScore = playerScore;
        displayMessage("New high score!");
    }
}

function displayMessage(message) {
    const gameOverMessageElement = document.getElementById("gameOverMessage");
    gameOverMessageElement.innerText = message;
}
