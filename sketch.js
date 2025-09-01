/**
 * Reference to the body element for dynamic canvas sizing.
 * @type {HTMLElement}
 */
const body = document.getElementsByTagName("body")[0];

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

/**
 * p5.js setup function. Initializes canvas and drawing settings.
 */
function setup() {
  cnv = createCanvas(body.offsetWidth, body.offsetHeight);
  sunHeight = 120;
  increaseLimit = height * 2;
  noStroke();
}

/**
 * p5.js draw function. Renders the scene each frame.
 */
function draw() {
  if (sunHeight < increaseLimit) {
    drawGradientBackground();
    drawSun();
    drawMountains();
    animationLogic();
  } else {
    if (!explosionTriggered) {
      triggerExplosion(width / 2, height / 2);
      explosionTriggered = true;
    }
    drawExplosion();
  }
  frameCount < 150 &&
    text("Oprime ↑ y ↓ para ver la magia", width / 20, height / 10);
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
  //  else if (key === "j") {
  //   img.save("rockies.jpg");
  // } else if (key === "p") {
  //   img.save("rockies", "png");
  // }
};

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
