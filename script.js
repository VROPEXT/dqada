document.addEventListener('DOMContentLoaded', function() {
  const player = document.getElementById('player');
  const ball = document.getElementById('ball');
  const goal = document.getElementById('goal');

  let playerPosition = 50; // Initial player position
  let ballPositionX = 50; // Initial ball position
  let ballPositionY = 50;
  let ballSpeedX = 2; // Ball speed in X direction
  let ballSpeedY = 1; // Ball speed in Y direction

  document.addEventListener('keydown', function(event) {
    // Left arrow key
    if (event.key === 'ArrowLeft' && playerPosition > 0) {
      playerPosition -= 10;
      updatePlayerPosition();
    }

    // Right arrow key
    if (event.key === 'ArrowRight' && playerPosition < window.innerWidth - 50) {
      playerPosition += 10;
      updatePlayerPosition();
    }
  });

  function updatePlayerPosition() {
    player.style.left = playerPosition + 'px';
  }

  function updateBallPosition() {
    ballPositionX += ballSpeedX;
    ballPositionY += ballSpeedY;

    // Check for collisions with walls
    if (ballPositionX < 0 || ballPositionX > window.innerWidth - 20) {
      ballSpeedX = -ballSpeedX;
    }

    // Check for collisions with the player
    if (
      ballPositionY + 20 >= window.innerHeight - 50 &&
      ballPositionX >= playerPosition &&
      ballPositionX <= playerPosition + 50
    ) {
      ballSpeedY = -ballSpeedY;
    }

    // Check for scoring in the goal
    if (
      ballPositionY <= 60 &&
      ballPositionX >= window.innerWidth / 2 - 50 &&
      ballPositionX <= window.innerWidth / 2 + 50
    ) {
      alert('Goal! You win!');
      resetGame();
    }

    ball.style.left = ballPositionX + 'px';
    ball.style.bottom = ballPositionY + 'px';
  }

  function resetGame() {
    playerPosition = 50;
    ballPositionX = 50;
    ballPositionY = 50;
    updatePlayerPosition();
  }

  function gameLoop() {
    updateBallPosition();
    requestAnimationFrame(gameLoop);
  }

  // Initial position setup
  updatePlayerPosition();
  gameLoop();
});
