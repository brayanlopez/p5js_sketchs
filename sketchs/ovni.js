const container = document.getElementById("canvas-container");

const ovni = {
  x: 400,
  y: 300,
  size: 1,
  ammunition: 10,
  maxAmmunition: 10,
  shotsFired: 0,
  speed: 5,
};

// Ray system
const rays = [];
const maxRays = 10; // Maximum number of rays to keep on screen

// Star system
const stars = [];
const numStars = 100;

// Enemy system
const enemies = [];
const maxEnemies = 8;
let enemySpawnTimer = 0;
const enemySpawnRate = 120; // Spawn every 2 seconds at 60fps

// Ammo regeneration system
let ammoRegenTimer = 0;
const ammoRegenRate = 60; // Regenerate every 1 second at 60fps

// Key state tracking
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

function setup() {
  let cnv = createCanvas(container.offsetWidth, container.offsetHeight);
  cnv.parent("canvas-container");

  // Initialize OVNI position to center of canvas
  ovni.x = width / 2;
  ovni.y = height / 2;

  // Generate stars once for better performance
  generateStars();

  // Generate initial enemies
  generateInitialEnemies();
}

function draw() {
  background(20, 20, 40);

  // Handle movement based on key states
  if (keys.w) {
    ovni.y -= ovni.speed;
  }
  if (keys.s) {
    ovni.y += ovni.speed;
  }
  if (keys.a) {
    ovni.x -= ovni.speed;
  }
  if (keys.d) {
    ovni.x += ovni.speed;
  }

  // Keep ovni within canvas bounds
  ovni.x = constrain(ovni.x, 40, width - 40);
  ovni.y = constrain(ovni.y, 40, height - 40);

  drawOvni(ovni.x, ovni.y, ovni.size);

  drawTarget(mouseX, mouseY, 10);

  // Draw all active rays
  drawRays();

  drawStars();

  // Update ammunition regeneration
  updateAmmoRegen();

  // Update and draw enemies
  updateEnemies();
  drawEnemies();

  // Draw ammunition progress bar
  drawAmmoBar();
}

function mousePressed() {
  // Check if UFO has ammunition left
  if (ovni.shotsFired >= ovni.maxAmmunition) {
    return; // Cannot fire anymore
  }

  // Add new ray to the array
  rays.push({
    startX: ovni.x,
    startY: ovni.y,
    endX: mouseX,
    endY: mouseY,
    alpha: 255, // Start with full opacity
    life: 120, // Ray will fade over 120 frames (2 seconds at 60fps)
  });

  // Increment shots fired
  ovni.shotsFired++;
  ovni.ammunition = ovni.maxAmmunition - ovni.shotsFired;

  // Remove oldest ray if we exceed maximum
  if (rays.length > maxRays) {
    rays.shift();
  }
}

// Key event handlers for WASD movement
function keyPressed() {
  if (key === "w" || key === "W") {
    keys.w = true;
  }
  if (key === "a" || key === "A") {
    keys.a = true;
  }
  if (key === "s" || key === "S") {
    keys.s = true;
  }
  if (key === "d" || key === "D") {
    keys.d = true;
  }
}

function keyReleased() {
  if (key === "w" || key === "W") {
    keys.w = false;
  }
  if (key === "a" || key === "A") {
    keys.a = false;
  }
  if (key === "s" || key === "S") {
    keys.s = false;
  }
  if (key === "d" || key === "D") {
    keys.d = false;
  }
}

const drawOvni = (x, y, size = 1) => {
  // // Light beam (optional - you can toggle this)
  // fill(255, 255, 100, 30);
  // noStroke();
  // triangle(x, y, mouseX + 10, mouseY + 10, mouseX, mouseY);

  // Shadow/glow underneath
  fill(100, 100, 255, 50);
  ellipse(x, y + 5 * size, 90 * size, 35 * size);

  // Main saucer body - bottom part
  fill(180, 180, 200);
  stroke(120, 120, 140);
  strokeWeight(1);
  ellipse(x, y, 80 * size, 30 * size);

  // Metallic shine on bottom
  noStroke();
  fill(200, 200, 220, 150);
  ellipse(x - 10 * size, y + 2 * size, 40 * size, 12 * size);

  // Middle ring detail
  stroke(100, 100, 120);
  strokeWeight(2);
  noFill();
  ellipse(x, y, 80 * size, 30 * size);

  // Top dome - outer glass
  fill(150, 200, 255, 120);
  stroke(100, 150, 200);
  strokeWeight(1);
  ellipse(x, y - 10 * size, 35 * size, 35 * size);

  // Dome reflection
  noStroke();
  fill(200, 230, 255, 100);
  ellipse(x - 5 * size, y - 15 * size, 15 * size, 20 * size);

  // Windows on dome
  fill(50, 100, 150, 180);
  stroke(30, 70, 120);
  strokeWeight(1);
  ellipse(x, y - 8 * size, 8 * size, 8 * size);
  ellipse(x - 12 * size, y - 10 * size, 6 * size, 6 * size);
  ellipse(x + 12 * size, y - 10 * size, 6 * size, 6 * size);

  // Window lights/glow
  noStroke();
  fill(255, 255, 150, 150);
  ellipse(x, y - 8 * size, 4 * size, 4 * size);
  ellipse(x - 12 * size, y - 10 * size, 3 * size, 3 * size);
  ellipse(x + 12 * size, y - 10 * size, 3 * size, 3 * size);

  // Bottom lights
  fill(255, 100, 100, 200);
  ellipse(x - 25 * size, y + 8 * size, 6 * size, 6 * size);
  fill(100, 255, 100, 200);
  ellipse(x, y + 10 * size, 6 * size, 6 * size);
  fill(100, 100, 255, 200);
  ellipse(x + 25 * size, y + 8 * size, 6 * size, 6 * size);

  // Light halos
  fill(255, 100, 100, 80);
  ellipse(x - 25 * size, y + 8 * size, 12 * size, 12 * size);
  fill(100, 255, 100, 80);
  ellipse(x, y + 10 * size, 12 * size, 12 * size);
  fill(100, 100, 255, 80);
  ellipse(x + 25 * size, y + 8 * size, 12 * size, 12 * size);
};

function drawRays() {
  if (rays.length === maxRays) return;
  // Update and draw all rays
  for (let i = rays.length - 1; i >= 0; i--) {
    let ray = rays[i];

    // Calculate fading alpha based on remaining life
    ray.alpha = map(ray.life, 0, 120, 0, 255);

    // Check collision with enemies
    checkRayEnemyCollision(ray, i);

    // Draw the ray line with fading effect
    stroke(0, 255, 0, ray.alpha);
    strokeWeight(3);
    line(ray.startX, ray.startY, ray.endX, ray.endY);

    // Draw impact circle at end point
    fill(0, 255, 0, ray.alpha);
    noStroke();
    circle(ray.endX, ray.endY, 8);

    // Add a glowing effect
    fill(0, 255, 0, ray.alpha * 0.3);
    circle(ray.endX, ray.endY, 16);

    // Decrease life
    ray.life--;

    // Remove ray when it's completely faded
    if (ray.life <= 0) {
      rays.splice(i, 1);
    }
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.brightness = random(100, 255);
    this.twinkleSpeed = random(0.02, 0.08);
    this.size = random(1, 3);
    this.twinkleOffset = random(TWO_PI);
    this.colorType = floor(random(4)); // 0-3 for different colors

    // Movement properties
    this.vx = random(-0.1, 0.1); // Very slow horizontal movement
    this.vy = random(-0.1, 0.1); // Very slow vertical movement
    this.driftSpeed = random(0.01, 0.03); // Subtle drift effect
    this.driftOffset = random(TWO_PI);
  }

  // Update star properties with subtle movement
  update() {
    // Basic linear movement
    this.x += this.vx;
    this.y += this.vy;

    // Add subtle drift using sine waves for organic movement
    this.x += sin(frameCount * this.driftSpeed + this.driftOffset) * 0.2;
    this.y += cos(frameCount * this.driftSpeed + this.driftOffset * 1.3) * 0.15;

    // Wrap around screen edges
    if (this.x < -10) this.x = width + 10;
    if (this.x > width + 10) this.x = -10;
    if (this.y < -10) this.y = height + 10;
    if (this.y > height + 10) this.y = -10;
  }

  // Draw the star with twinkling effect
  draw() {
    // Create twinkling effect using sine wave
    let twinkle = sin(frameCount * this.twinkleSpeed + this.twinkleOffset);
    let alpha = map(twinkle, -1, 1, this.brightness * 0.3, this.brightness);

    // Set color based on star type
    noStroke();
    switch (this.colorType) {
      case 0:
        fill(255, 255, 200, alpha); // Warm white
        break;
      case 1:
        fill(200, 220, 255, alpha); // Cool blue
        break;
      case 2:
        fill(255, 220, 220, alpha); // Warm pink
        break;
      default:
        fill(255, 255, 255, alpha); // Pure white
    }

    // Draw star as small circle
    circle(this.x, this.y, this.size);

    // Add occasional bright twinkle effect
    if (twinkle > 0.8) {
      fill(255, 255, 255, alpha * 0.5);
      circle(this.x, this.y, this.size * 2);
    }
  }

  // Check if star is within screen bounds
  isOnScreen() {
    return this.x >= 0 && this.x <= width && this.y >= 0 && this.y <= height;
  }

  // Reset star position (useful for regenerating off-screen stars)
  reset() {
    this.x = random(width);
    this.y = random(height);
  }
}

// Generate stars using OOP approach
function generateStars() {
  stars.length = 0; // Clear existing stars
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
}

// Draw all stars using their individual draw methods
function drawStars() {
  for (let star of stars) {
    star.update(); // Update star state
    star.draw(); // Draw the star
  }
}

function drawTarget(x, y, size) {
  push();

  // Outer targeting ring with glow effect
  noFill();
  stroke(255, 50, 50, 100);
  strokeWeight(3);
  circle(x, y, size * 2);

  // Main targeting circle
  stroke(255, 100, 100, 200);
  strokeWeight(2);
  circle(x, y, size);

  // Inner precise circle
  stroke(255, 150, 150);
  strokeWeight(1);
  circle(x, y, size * 0.3);

  // Crosshair lines
  stroke(255, 200, 200);
  strokeWeight(2);

  // Horizontal crosshair
  line(x - size * 0.8, y, x - size * 0.4, y);
  line(x + size * 0.4, y, x + size * 0.8, y);

  // Vertical crosshair
  line(x, y - size * 0.8, x, y - size * 0.4);
  line(x, y + size * 0.4, x, y + size * 0.8);

  // Corner brackets for tactical look
  stroke(255, 255, 100, 180);
  strokeWeight(2);

  // Top-left bracket
  line(x - size * 0.6, y - size * 0.6, x - size * 0.4, y - size * 0.6);
  line(x - size * 0.6, y - size * 0.6, x - size * 0.6, y - size * 0.4);

  // Top-right bracket
  line(x + size * 0.4, y - size * 0.6, x + size * 0.6, y - size * 0.6);
  line(x + size * 0.6, y - size * 0.6, x + size * 0.6, y - size * 0.4);

  // Bottom-left bracket
  line(x - size * 0.6, y + size * 0.4, x - size * 0.6, y + size * 0.6);
  line(x - size * 0.6, y + size * 0.6, x - size * 0.4, y + size * 0.6);

  // Bottom-right bracket
  line(x + size * 0.6, y + size * 0.4, x + size * 0.6, y + size * 0.6);
  line(x + size * 0.4, y + size * 0.6, x + size * 0.6, y + size * 0.6);

  // Center dot
  fill(255, 255, 255, 200);
  noStroke();
  circle(x, y, 3);

  pop();
}

// Enemy system functions
function generateInitialEnemies() {
  for (let i = 0; i < 3; i++) {
    spawnEnemy();
  }
}

function spawnEnemy() {
  if (enemies.length >= maxEnemies) return;

  // Spawn from edges of screen
  let side = floor(random(4)); // 0=top, 1=right, 2=bottom, 3=left
  let x, y, vx, vy;

  switch (side) {
    case 0: // Top
      x = random(width);
      y = -30;
      vx = random(-1, 1);
      vy = random(0.5, 2);
      break;
    case 1: // Right
      x = width + 30;
      y = random(height);
      vx = random(-2, -0.5);
      vy = random(-1, 1);
      break;
    case 2: // Bottom
      x = random(width);
      y = height + 30;
      vx = random(-1, 1);
      vy = random(-2, -0.5);
      break;
    case 3: // Left
      x = -30;
      y = random(height);
      vx = random(0.5, 2);
      vy = random(-1, 1);
      break;
  }

  enemies.push({
    x: x,
    y: y,
    vx: vx,
    vy: vy,
    size: random(15, 25),
    health: 1,
    color: {
      r: random(150, 255),
      g: random(50, 150),
      b: random(50, 150),
    },
    rotation: 0,
    rotationSpeed: random(-0.05, 0.05),
  });
}

function updateEnemies() {
  // Spawn new enemies periodically
  enemySpawnTimer++;
  if (enemySpawnTimer >= enemySpawnRate) {
    spawnEnemy();
    enemySpawnTimer = 0;
  }

  // Update enemy positions
  for (let i = enemies.length - 1; i >= 0; i--) {
    let enemy = enemies[i];

    enemy.x += enemy.vx;
    enemy.y += enemy.vy;
    enemy.rotation += enemy.rotationSpeed;

    // Remove enemies that go off screen
    if (
      enemy.x < -50 ||
      enemy.x > width + 50 ||
      enemy.y < -50 ||
      enemy.y > height + 50
    ) {
      enemies.splice(i, 1);
    }
  }
}

function drawEnemies() {
  for (let enemy of enemies) {
    push();
    translate(enemy.x, enemy.y);
    rotate(enemy.rotation);

    // Enemy body (diamond shape)
    fill(enemy.color.r, enemy.color.g, enemy.color.b, 180);
    stroke(enemy.color.r + 50, enemy.color.g + 50, enemy.color.b + 50);
    strokeWeight(2);

    beginShape();
    vertex(0, -enemy.size);
    vertex(enemy.size * 0.7, 0);
    vertex(0, enemy.size);
    vertex(-enemy.size * 0.7, 0);
    endShape(CLOSE);

    // Enemy core
    fill(255, 255, 100, 200);
    noStroke();
    circle(0, 0, enemy.size * 0.4);

    // Enemy glow
    fill(enemy.color.r, enemy.color.g, enemy.color.b, 50);
    circle(0, 0, enemy.size * 1.5);

    pop();
  }
}

function checkRayEnemyCollision(ray, rayIndex) {
  for (let i = enemies.length - 1; i >= 0; i--) {
    let enemy = enemies[i];

    // Check if ray endpoint is near enemy
    let distance = dist(ray.endX, ray.endY, enemy.x, enemy.y);

    if (distance < enemy.size) {
      // Hit! Remove enemy and ray
      enemies.splice(i, 1);
      rays.splice(rayIndex, 1);

      // Regenerate ammo for destroying enemy
      regenerateAmmo(1);

      // Create explosion effect
      createExplosion(enemy.x, enemy.y);
      break;
    }
  }
}

function createExplosion(x, y) {
  // Add multiple small particles for explosion effect
  for (let i = 0; i < 8; i++) {
    rays.push({
      startX: x,
      startY: y,
      endX: x + random(-30, 30),
      endY: y + random(-30, 30),
      alpha: 255,
      life: 30, // Short-lived explosion particles
    });
  }
}

// Ammunition regeneration functions
function updateAmmoRegen() {
  // Regenerate ammo over time (every second)
  ammoRegenTimer++;
  if (ammoRegenTimer >= ammoRegenRate) {
    regenerateAmmo(1);
    ammoRegenTimer = 0;
  }
}

function regenerateAmmo(amount) {
  // Only regenerate if not at maximum
  if (ovni.shotsFired > 0) {
    ovni.shotsFired = max(0, ovni.shotsFired - amount);
    ovni.ammunition = ovni.maxAmmunition - ovni.shotsFired;
  }
}

function drawAmmoBar() {
  push();

  // Position in upper right corner
  let barX = width - 200;
  let barY = 20;
  let barWidth = 180;
  let barHeight = 20;

  // Background bar
  fill(50, 50, 50, 150);
  stroke(100, 100, 100);
  strokeWeight(2);
  rect(barX, barY, barWidth, barHeight, 5);

  // Calculate fill percentage
  let fillPercentage = ovni.shotsFired / ovni.maxAmmunition;
  let fillWidth = barWidth * fillPercentage;

  // Filled portion (red as ammunition is used)
  noStroke();
  if (fillPercentage < 0.5) {
    fill(255, 200, 0, 180); // Yellow when plenty of ammo
  } else if (fillPercentage < 0.8) {
    fill(255, 150, 0, 180); // Orange when getting low
  } else {
    fill(255, 50, 50, 180); // Red when almost empty
  }
  rect(barX, barY, fillWidth, barHeight, 5);

  // Remaining ammunition (green)
  fill(50, 255, 50, 100);
  rect(barX + fillWidth, barY, barWidth - fillWidth, barHeight, 5);

  // Text label
  fill(255);
  noStroke();
  textAlign(RIGHT, TOP);
  textSize(14);
  text(
    `Ammo: ${ovni.ammunition}/${ovni.maxAmmunition}`,
    width - 10,
    barY + barHeight + 5
  );

  // Warning text when out of ammo
  if (ovni.ammunition <= 0) {
    fill(255, 100, 100);
    textAlign(RIGHT, TOP);
    textSize(12);
    text("OUT OF AMMO!", width - 10, barY + barHeight + 25);
  }

  pop();
}
