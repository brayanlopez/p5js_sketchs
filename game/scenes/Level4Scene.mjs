/**
 * @description this is an adaptation of space invaders game
 */

import { drawSpaceship } from "./draws.mjs";

let player;
let aliens = [];
let bullets = [];
let alienBullets = [];
let score = 0;
let lives = 3;
let gameOver = false;
let alienDir = 1;
let alienSpeed = 1;
let lastAlienShot = 0;

export const setupLevel4 = () => {
  // Create player
  player = {
    x: width / 2,
    y: height - 60,
    w: 40,
    h: 30,
    speed: 5,
  };

  // Create aliens (5 rows, 11 columns)
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 11; col++) {
      aliens.push({
        x: col * 60 + 80,
        y: row * 50 + 80,
        w: 40,
        h: 30,
        alive: true,
      });
    }
  }
};

export const drawScene4 = () => {
  rectMode(CORNER);
  imageMode(CORNER);
  ellipseMode(CENTER);

  background(0);

  if (gameOver) {
    drawGameOver();
    return;
  }

  // Draw and move player
  drawSpaceship(player.x, player.y, player.w, player.h);
  movePlayer();

  // Draw and move aliens
  moveAliens();
  drawAliens();

  // Draw and move bullets
  moveBullets();
  drawBullets();

  // Alien shooting
  alienShoot();

  // Check collisions
  checkCollisions();

  // Update UI
  updateUI();

  // Check win/lose
  if (aliens.filter((a) => a.alive).length === 0) {
    gameOver = true;
  }

  if (lives <= 0) {
    gameOver = true;
  }
};

function movePlayer() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    // A
    player.x -= player.speed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    // D
    player.x += player.speed;
  }

  // Keep player in bounds
  player.x = constrain(player.x, player.w / 2, width - player.w / 2);
}

function drawAliens() {
  for (let alien of aliens) {
    if (alien.alive) {
      fill(255, 0, 0);
      rect(alien.x, alien.y, alien.w, alien.h);
      // Eyes
      fill(255);
      rect(alien.x + 8, alien.y + 8, 8, 8);
      rect(alien.x + 24, alien.y + 8, 8, 8);
    }
  }
}

function moveAliens() {
  let moveDown = false;
  let aliveAliens = aliens.filter((a) => a.alive);

  // Check if any alien hit edge
  for (let alien of aliveAliens) {
    if (
      (alien.x + alien.w >= width && alienDir > 0) ||
      (alien.x <= 0 && alienDir < 0)
    ) {
      moveDown = true;
      break;
    }
  }

  // Move aliens
  for (let alien of aliveAliens) {
    if (moveDown) {
      alien.y += 20;
    }
    alien.x += alienDir * alienSpeed;

    // Check if aliens reached player
    if (alien.y + alien.h >= player.y) {
      lives = 0;
    }
  }

  if (moveDown) {
    alienDir *= -1;
  }
}

function drawBullets() {
  fill(255, 255, 0);
  for (let bullet of bullets) {
    rect(bullet.x - 2, bullet.y, 4, 15);
  }

  fill(255, 0, 255);
  for (let bullet of alienBullets) {
    rect(bullet.x - 2, bullet.y, 4, 15);
  }
}

function moveBullets() {
  // Player bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= 7;
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }

  // Alien bullets
  for (let i = alienBullets.length - 1; i >= 0; i--) {
    alienBullets[i].y += 5;
    if (alienBullets[i].y > height) {
      alienBullets.splice(i, 1);
    }
  }
}

function alienShoot() {
  if (millis() - lastAlienShot > 1000) {
    let aliveAliens = aliens.filter((a) => a.alive);
    if (aliveAliens.length > 0) {
      let shooter = random(aliveAliens);
      alienBullets.push({
        x: shooter.x + shooter.w / 2,
        y: shooter.y + shooter.h,
      });
      lastAlienShot = millis();
    }
  }
}

function checkCollisions() {
  // Player bullets hit aliens
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let alien of aliens) {
      if (
        alien.alive &&
        bullets[i].x > alien.x &&
        bullets[i].x < alien.x + alien.w &&
        bullets[i].y > alien.y &&
        bullets[i].y < alien.y + alien.h
      ) {
        alien.alive = false;
        bullets.splice(i, 1);
        score += 10;
        break;
      }
    }
  }

  // Alien bullets hit player
  for (let i = alienBullets.length - 1; i >= 0; i--) {
    if (
      alienBullets[i].x > player.x - player.w / 2 &&
      alienBullets[i].x < player.x + player.w / 2 &&
      alienBullets[i].y > player.y &&
      alienBullets[i].y < player.y + player.h
    ) {
      alienBullets.splice(i, 1);
      lives--;
    }
  }
}

function updateUI() {
  // document.getElementById("score").textContent = score;
  // document.getElementById("lives").textContent = lives;
}

function drawGameOver() {
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(255, 0, 0);

  if (lives <= 0) {
    text("GAME OVER", width / 2, height / 2 - 30);
  } else {
    text("YOU WIN!", width / 2, height / 2 - 30);
    fill(0, 255, 0);
  }

  textSize(24);
  fill(255);
  text("Final Score: " + score, width / 2, height / 2 + 20);
  text("Press R to Restart", width / 2, height / 2 + 60);
}

export function keyPressedLevel4() {
  if (keyCode === 32 && !gameOver) {
    // Space bar
    bullets.push({
      x: player.x,
      y: player.y - 10,
    });
  }

  if (keyCode === 82 && gameOver) {
    // R to restart
    restartLevel4();
  }
}

export function restartLevel4() {
  score = 0;
  lives = 3;
  gameOver = false;
  bullets = [];
  alienBullets = [];
  alienDir = 1;

  player.x = width / 2;

  aliens = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 11; col++) {
      aliens.push({
        x: col * 60 + 80,
        y: row * 50 + 80,
        w: 40,
        h: 30,
        alive: true,
      });
    }
  }
}
