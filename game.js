const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.8; // Make it responsive
canvas.height = 300;

let gameRunning = false;
let score = 0;
let speed = 3; // Game speed (increases over time)
let gravity = 0.6;

// Character
let player = {
    x: 50,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    velocityY: 0,
    jumping: false
};

// Obstacles
let obstacles = [];

// // Handle Jump
// document.addEventListener("keydown", function (event) {
//     if (event.code === "Space" && !player.jumping) {
//         player.velocityY = -12;
//         player.jumping = true;
//     }
// });

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
    player.y = canvas.height - 60;
    player.velocityY = 0;
    document.getElementById("score").innerText = "Score: 0"; // Reset score display
    document.getElementById("startScreen").style.display = "none"; // Hide start screen
    gameLoop();
}

let obstacleCooldown = 80; // Prevents obstacles from appearing too frequently
let obstacleTimer = 0;

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player
    ctx.fillStyle = "#ff4081";
    ctx.fillRect(player.x, player.y, player.width, player.height);

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

