// Draw functions
function drawBall() {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function drawPaddle(x, y, width, height) {
    ctx.fillStyle = "#CC3F63";
    ctx.fillRect(x, y, width, height);
}

function drawLives() {
    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.fillText("Player Lives: " + playerLives, canvas.width - 200, 25);
    if (gameMode === "2-Player") {
        ctx.fillText("Opponent Lives: " + opponentLives, 10, 25);
    }
}
function drawHeart(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    
    // Left curve of the heart
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    
    // Right curve of the heart
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y + size / 4);
    
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function drawHeart(x, y, width, height, color) {
    var topCurveHeight = height * 0.3;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(
        x, y, 
        x - width / 2, y, 
        x - width / 2, y + topCurveHeight
    );

    // bottom left curve
    ctx.bezierCurveTo(
        x - width / 2, y + (height + topCurveHeight) / 2, 
        x, y + (height + topCurveHeight) / 2, 
        x, y + height
    );

    // bottom right curve
    ctx.bezierCurveTo(
        x, y + (height + topCurveHeight) / 2, 
        x + width / 2, y + (height + topCurveHeight) / 2, 
        x + width / 2, y + topCurveHeight
    );

    // top right curve
    ctx.bezierCurveTo(
        x + width / 2, y, 
        x, y, 
        x, y + topCurveHeight
    );

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}


function drawPowerUp() {
    if (powerUp.active) {
        ctx.fillStyle = "#fff";
        if (powerUp.type === "speedBoost") {
            // Draw a lightning bolt
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.moveTo(powerUp.x, powerUp.y);
            ctx.lineTo(powerUp.x + (powerUp.width / 2), powerUp.y + (powerUp.height / 3));
            ctx.lineTo(powerUp.x + (powerUp.width / 3), powerUp.y + (powerUp.height / 3));
            ctx.lineTo(powerUp.x + (2 * powerUp.width / 3), powerUp.y + powerUp.height);
            ctx.closePath();
            ctx.fill();
        } else if (powerUp.type === "extraLife") {
            // Draw a heart shape using the new function
            drawHeart(powerUp.x + powerUp.width / 2, powerUp.y, powerUp.width, powerUp.height, "red");
        }
    }
}




function drawTimer() {
    if (gameMode === "1-Player") {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Convert to seconds
        if (gameMode === "1-Player" && gameStarted && !gameOver) {
            difficultyTimer++;
        }        
        ctx.fillStyle = "#fff";
        ctx.font = "24px Arial";
        ctx.fillText("Time: " + elapsedTime + "s", canvas.width / 2 - 70, 25);
    }
}