/**
 * Reference to the div element for dynamic canvas sizing.
 * @type {HTMLElement}
 */
const container = document.getElementById("canvas-container");

/**
 * Color palette for harmonious colors used in the scene.
 * @type {Object}
 * @property {number[]} skyTop - RGB for top of sky gradient.
 * @property {number[]} skyBottom - RGB for bottom of sky gradient.
 * @property {number[]} sunOuter - RGBA for outer sun glow.
 * @property {number[]} sunInner - RGBA for inner sun.
 * @property {number[]} mountain1 - RGB for first mountain.
 * @property {number[]} mountain2 - RGB for second mountain.
 * @property {number[]} mountain3 - RGB for third mountain.
 * @property {number[]} mountain4 - RGB for fourth mountain.
 * @property {number[]} mountain5 - RGB for fifth mountain.
 * @property {number[]} mountain6 - RGB for sixth mountain.
 */
const palette = {
  skyTop: [135, 206, 250], // light blue
  skyBottom: [255, 170, 80], // warm orange
  sunOuter: [255, 135, 5, 60],
  sunInner: [255, 100, 0, 100],
  mountain1: [110, 50, 18],
  mountain2: [110, 95, 20],
  mountain3: [150, 75, 0],
  mountain4: [100, 50, 12],
  mountain5: [150, 100, 0],
  mountain6: [120, 80, 50],
};

/**
 * Height of the sun above the horizon.
 * @type {number}
 */
let sunHeight = 0;

let increaseLimit;

let keyHaveBeenPress = false;

const cactusCoordinates = [];
const clouds = [];

/**
 * p5.js setup function. Initializes canvas and drawing settings.
 */
function setup() {
  cnv = createCanvas(container.offsetWidth, container.offsetHeight);
  cnv.parent("canvas-container");
  sunHeight = 120;
  increaseLimit = height * 3;
  noStroke();

  // create cactus array
  for (let i = 0; i < 7; i++) {
    cactusCoordinates.push({
      x: random(0, width),
      y: random(height * 0.8, height * 0.95),
      size: random(5, 50),
    });
  }

  // Create clouds
  for (let i = 0; i < 10; i++) {
    clouds.push(new Cloud(random(0, width), random(0, height * 0.5)));
  }
}

/**
 * p5.js draw function. Renders the scene each frame.
 */
function draw() {
  if (sunHeight < increaseLimit) {
    drawGradientBackground();

    drawCloud(mouseX, mouseY);

    clouds.forEach((cloud) => {
      cloud.draw();
      cloud.move();
    });

    drawSun();
    drawMountains();
    drawSandGround();
    cactusCoordinates.forEach((cactus) =>
      drawCactus(cactus.x, height * 0.8, cactus.size)
    );

    animationLogic();
  } else {
    if (!explosionTriggered) {
      triggerExplosion(width / 2, height / 2);
      explosionTriggered = true;
    }
    drawExplosion();
  }
  !keyHaveBeenPress &&
    text(
      "Oprime ↑ y ↓ para ver la magia \nCualquier tecla para ocultar texto\ns: guardar",
      width / 20,
      height / 10
    );
}

/**
 * p5.js keyPressed event handler. Triggers image saving.
 */
function keyPressed() {
  saveImage();
}

/**
 * Save the image with different options when the user presses a key.
 */
const saveImage = () => {
  if (key === "s") {
    save(cnv, "sketch_1");
  }
  if (!keyHaveBeenPress) {
    keyHaveBeenPress = true;
  }
  //  else if (key === "j") {
  //   img.save("rockies.jpg");
  // } else if (key === "p") {
  //   img.save("rockies", "png");
  // }
};

function drawCloud(x, y) {
  fill(255); // White color for the cloud
  ellipse(x, y, 80, 60);
  ellipse(x - 40, y + 10, 60, 50);
  ellipse(x + 40, y + 10, 60, 50);
  ellipse(x - 20, y - 20, 60, 50);
  ellipse(x + 20, y - 20, 60, 50);
}

function drawSandGround() {
  // Draw sand-colored rectangle at the bottom
  fill(194, 178, 128); // Sandy beige color
  const sandHeight = height * 0.9;
  rect(0, sandHeight, width, height * 0.25);
}

function drawCactus(x, y, size = 10) {
  fill(34, 139, 34); // Dark green cactus color
  // rect(x, y, 1, 1);
  noStroke();

  // Main body
  rect(x, y, size, (size * 8) / 3, 10); // Rounded corners

  // Left arm
  rect(x - (size * 2) / 3, y + (size * 4) / 3, (size * 2) / 3, size / 2, 10);
  rect(x - size / 3, y + (size * 25) / 30, size / 2, (size * 2) / 3, 10);

  // Right arm
  rect(x + size, y + (size * 2) / 3, size / 2, (size * 4) / 3, 10);

  // Add some vertical lines to simulate cactus ribs
  stroke(0, 100, 0);
  strokeWeight(2);
  for (let i = 0; i < size / 6; i++) {
    let xpos = x + i * 6;
    line(xpos, y, xpos, y + (size * 8) / 3);
  }

  // Lines on arms
  line(
    x - (size * 5) / 30,
    y + (size * 25) / 30,
    x - (size * 5) / 30,
    y + (size * 55) / 30
  );
  line(
    x + (size * 37) / 30,
    y + (size * 2) / 3,
    x + (size * 37) / 30,
    y + size * 2
  );

  noStroke();
}

/**
 * Draws a vertical gradient background using the palette colors.
 */
const drawGradientBackground = () => {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(
      color(...palette.skyTop),
      color(...palette.skyBottom),
      inter
    );
    stroke(c);
    line(0, y, width, y);
  }
  noStroke();
};

/**
 * Draws the sun with two circles for glow and core.
 */
const drawSun = () => {
  fill(...palette.sunOuter);
  circle(width / 2, height * 0.9, sunHeight + 60);
  fill(...palette.sunInner);
  circle(width / 2, height * 0.9, sunHeight);
};

/**
 * Draws mountains using triangles and palette colors.
 */
const drawMountains = () => {
  fill(...palette.mountain1);
  triangle(
    width * 0.3,
    height,
    width * 0.85,
    height * 0.6,
    width * 1.3,
    height
  );

  fill(...palette.mountain2);
  triangle(width * 0.3, height, width * 0.85, height * 0.6, 350, height);

  fill(...palette.mountain3);
  triangle(-width / 6, height, width / 4, height / 2, height, height);
  fill(...palette.mountain4);
  triangle(-width / 6, height, width / 4, height / 2, 0, height);
  fill(...palette.mountain5);
  triangle(width / 3, height, width / 2, (height * 5) / 8, width * 1.3, height);
  fill(...palette.mountain6);
  triangle(width / 3, height, width / 2, (height * 5) / 8, width / 2, height);
};

/**
 * Handles sun animation logic based on key input.
 */
const animationLogic = () => {
  if (keyIsPressed && key === "ArrowUp") {
    sunHeight += 10;
    sunHeight = constrain(sunHeight, 0, increaseLimit);
  } else if (keyIsPressed && key === "ArrowDown" && sunHeight > 0) {
    sunHeight -= 10;
    sunHeight = constrain(sunHeight, 0, increaseLimit);
  }
};

/**
 * Particle class for explosion effect.
 */
class ExplosionParticle {
  /**
   * @param {number} x - Initial x position
   * @param {number} y - Initial y position
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(8, 100);
    this.angle = random(TWO_PI);
    this.speed = random(3, 8);
    this.life = 255;
    this.color = color(
      random(200, 255),
      random(100, 255),
      random(0, 80),
      this.life
    );
    this.vx = cos(this.angle) * this.speed;
    this.vy = sin(this.angle) * this.speed;
  }

  /**
   * Update particle position and fade out.
   */
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.radius *= 0.99;
    this.life -= 3;
    this.color.setAlpha(this.life);
  }
  /**
   * Draw the particle.
   */
  draw() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius);
  }
  /**
   * Is the particle still visible?
   * @returns {boolean}
   */
  isAlive() {
    return this.life > 0 && this.radius > 1;
  }
}

/**
 * Array to hold explosion particles.
 * @type {ExplosionParticle[]}
 */
let explosionParticles = [];
let explosionTriggered = false;

/**
 * Triggers the explosion by creating particles at (x, y).
 * @param {number} x
 * @param {number} y
 */
function triggerExplosion(x, y) {
  explosionParticles = [];
  for (let i = 0; i < 60; i++) {
    const particle = new ExplosionParticle(x, y);
    particle.radius = 100;
    explosionParticles.push(particle);
  }
}

/**
 * Draws and animates the explosion particles.
 */
function drawExplosion() {
  background(0, 0, 0);
  for (let p of explosionParticles) {
    p.update();
    p.draw();
  }
  // Remove dead particles
  explosionParticles = explosionParticles.filter((p) => p.isAlive());
  // Stop animation when all particles are gone
  // if (explosionParticles.length === 0) {
  //   noLoop();
  // }
}

class Cloud {
  constructor(x, y, size = null) {
    this.x = x;
    this.y = y;
    this.size = size || random(20, 60);
    this.speed = random(0.2, 1);
  }

  draw() {
    // TODO: make responsive to size param.
    fill(255); // White color for the cloud
    ellipse(this.x, this.y, 80, 60);
    ellipse(this.x - 40, this.y + 10, 60, 50);
    ellipse(this.x + 40, this.y + 10, 60, 50);
    ellipse(this.x - 20, this.y - 20, 60, 50);
    ellipse(this.x + 20, this.y - 20, 60, 50);
  }

  move() {
    this.x += this.speed;
    if (this.x > width + 100) this.x = -100;
  }
}
