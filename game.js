const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerImage = new Image();
playerImage.src = "assets/player.png";

const proseccoImage = new Image();
proseccoImage.src = "assets/prosecco.png"; // Ensure the path is correct

let proseccoBottles = [];
let proseccoMeter = 0;
const proseccoMessages = [
    "You're on fire! 🔥",
    "Prosecco Power! 🍾",
    "You're unstoppable! 💪",
    "Keep going, my love! 💖",
    "Double the love, double the score! ❤️",
    "More prosecco, more fun! 🍷",
    "You're a Prosecco Queen! 👑",
    "Pop the bottles! 🎉",
    "I could be convinced to go out",
    "Should we smoke too?"
];

canvas.width = window.innerWidth * 0.8; // Make it responsive
canvas.height = 300;

let gameRunning = false;
let score = 0;
let speed = 3; // Game speed (increases over time)
let gravity = 0.6;


let player = {
    x: 50,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    velocityY: 0,
    jumping: false,
    ducking: false // New state
};


// Obstacles
let obstacles = [];

function jump() {
    if (!player.jumping) {
        player.velocityY = -12;
        player.jumping = true;
    }
}

// Handle keyboard jump (spacebar)
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jump();
    }
});

// Handle tap jump (mobile)
document.addEventListener("touchstart", function () {
    jump();
});



// Start the Game
document.getElementById("startScreen").addEventListener("click", function () {
    if (!gameRunning) {
        resetGame(); // Ensure everything resets
    }
});


function resetGame() {
    gameRunning = true;
    score = 0;
    speed = 3;
    obstacles = []; // Remove old obstacles
    proseccoBottles = []; // Clear prosecco bottles
    proseccoMeter = 0; // Reset prosecco meter
    player.y = canvas.height - 60;
    player.velocityY = 0;

    // Reset UI elements
    document.getElementById("score").innerText = "Score: 0"; 
    document.getElementById("prosecco-meter").style.width = "0%"; // ✅ Reset prosecco meter UI
    document.getElementById("prosecco-message").style.display = "none"; // ✅ Hide message

    document.getElementById("startScreen").style.display = "none"; 
    gameLoop();
}


let obstacleCooldown = 80; // Prevents obstacles from appearing too frequently
let obstacleTimer = 0;

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    player.width = 60;  // Adjust to match the aspect ratio
    player.height = 60; // Adjust to match the image size


    // Apply Gravity
    player.velocityY += gravity;
    player.y += player.velocityY;

    // Prevent falling through the ground
    if (player.y >= canvas.height - 60) {
        player.y = canvas.height - 60;
        player.jumping = false;
    }

    // **Obstacle Timer Logic**
    if (obstacleTimer <= 0) {
        obstacles.push({
            x: canvas.width,
            y: canvas.height - 50,
            width: 30,
            height: 50
        });
        obstacleTimer = obstacleCooldown; // Reset the cooldown
    } else {
        obstacleTimer--; // Reduce the timer each frame
    }

    // Move Obstacles
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= speed;

        // Draw Obstacle
        ctx.fillStyle = "black";
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

        // Collision Detection
        if (
            player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.width > obstacles[i].x &&
            player.y + player.height > obstacles[i].y
        ) {
            gameRunning = false;
            document.getElementById("startScreen").style.display = "block";
            document.getElementById("startScreen").innerText = "Game Over! Tap to Restart";
            return;
        }
    }

    // Remove passed obstacles
    obstacles = obstacles.filter((obstacle) => obstacle.x > -30);

    // Spawn prosecco bottles after score 800
    if (score > 800 && Math.random() < 0.02) { 
        proseccoBottles.push({
            x: canvas.width,
            y: canvas.height - 150, // High enough to require a jump
            width: 30,
            height: 40
        });
    }

    // Move and draw prosecco bottles
    for (let i = 0; i < proseccoBottles.length; i++) {
        proseccoBottles[i].x -= speed;

        // Draw prosecco bottle
        ctx.drawImage(proseccoImage, proseccoBottles[i].x, proseccoBottles[i].y, 30, 40);

        // Collision Detection for Prosecco Bottles
        if (
            player.x < proseccoBottles[i].x + 30 &&
            player.x + player.width > proseccoBottles[i].x &&
            player.y < proseccoBottles[i].y + 40
        ) {
            proseccoBottles.splice(i, 1); // Remove bottle after collection
            i--;

            // Increase prosecco meter
            proseccoMeter += 12.5; // 1/8 of 100%

            // Update prosecco meter UI
            document.getElementById("prosecco-meter").style.width = `${proseccoMeter}%`;

            // Check if the meter is full
            if (proseccoMeter >= 100) {
                score *= 2; // Double the score
                proseccoMeter = 0; // Reset meter
                document.getElementById("prosecco-meter").style.width = "0%";

                // Show a random message
                let message = proseccoMessages[Math.floor(Math.random() * proseccoMessages.length)];
                let messageBox = document.getElementById("prosecco-message");
                messageBox.innerText = message;
                messageBox.style.display = "block";

                // Hide message after 3 seconds
                setTimeout(() => {
                    messageBox.style.display = "none";
                }, 3000);
            }
        }
    }

    // Remove off-screen prosecco bottles
    proseccoBottles = proseccoBottles.filter(bottle => bottle.x > -30);


    // Increase Score
    score++;
    document.getElementById("score").style.display = "block"; // Ensure visible
    document.getElementById("score").innerText = "Score: " + score;



    // Speed Increases Over Time
    if (score % 100 === 0) {
        speed += 0.5;
    }

    requestAnimationFrame(gameLoop);
}


function checkOrientation() {
    const rotateMessage = document.getElementById("rotateMessage");
    const gameContainer = document.getElementById("game-container");

    if (window.innerWidth < window.innerHeight) {
        rotateMessage.style.display = "block"; // Show rotate message
        gameContainer.classList.add("hide-game"); // Hide the game
        gameRunning = false; // Stop the game loop
    } else {
        rotateMessage.style.display = "none"; // Hide rotate message
        gameContainer.classList.remove("hide-game"); // Show the game
    }
}

// Check on page load and when resizing
window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);

