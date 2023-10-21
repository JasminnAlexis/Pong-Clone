// Constants for ball colors and game settings
const ballColors = ["#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF", "#4B0082", "#9400D3", "#CC3F63"]; // Colors: red, orange, yellow, green, blue, indigo, violet, pink
const ballSpeedIncrement = 0.5;
const paddleSpeedIncrement = 0.1;
const powerUpDuration = 5 * 60; // Duration in frames (5 seconds * 60 frames/second)
const speedBoostDuration = 300; // Duration in frames
const initialAISpeed = 4;

// Game state variables
let currentBallColorIndex = 0;
let frameCount = 0;
let powerUpCounter = 0;
let aiReactionDelay = 0;
let playerLives = 3;
let opponentLives = 3;
let difficultyTimer = 0;
let gameStarted = false;
let gameMode = "";
let gameOver = false;
let startTime = Date.now();
let elapsedTime = 0;
let powerUpSpawned = false;
let speedBoostCounter = 0;
let highScore = 0;
let playerScore = 0;
let playerHasBoost = false;
let opponentHasBoost = false;
