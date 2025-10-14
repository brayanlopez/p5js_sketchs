export class GameObject {
  constructor(x, y, width, height, color, status = "active") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.status = status;
  }
}

export class Player extends GameObject {
  constructor(
    x,
    y,
    width,
    height,
    color,
    velocity,
    jump,
    jumpPower,
    jumpCounter,
    lives = 3
  ) {
    super(x, y, width, height, color);
    this.velocity = velocity;
    this.jump = jump;
    this.jumpPower = jumpPower;
    this.jumpCounter = jumpCounter;
    this.lives = lives;
  }

  resetPosition() {
    this.x = 0;
    this.y = 0;
  }
}

export const SCENES = {
  SPLASH: "SPLASH",
  GAME: "GAME",
  PAUSE: "PAUSE",
  GAME_OVER: "GAME_OVER",
  LEVEL_1: "LEVEL_1",
  LEVEL_2: "LEVEL_2",
  LEVEL_3: "LEVEL_3",
};

export const gameSettings = {
  stage: SCENES.SPLASH,
  totalTime: undefined,
  score: 0,
};

export const gravitySettings = {
  direction: 1,
  velocity: 9,
  failingSpeed: 9,
  minHeight: 0,
  maxHeight: 0,
};

export const player = new Player(0, 0, 50, 100, "#ff0000", 10, false, 13, 0);

export const platforms = [
  new GameObject(0, 350, 200, 30, "#00ff00"),
  new GameObject(400, 270, 200, 30, "#00ff00"),
  new GameObject(150, 240, 200, 30, "#00ff00"),
  new GameObject(600, 160, 200, 30, "#00ff00"),
  new GameObject(450, 80, 200, 30, "#00ff00"),
];

export const coins = [new GameObject(200, 500, 25, 25, "#ffff00")];

/**
 * Checks if two axis-aligned rectangles are colliding.
 * @param {GameObject} a - First object with x, y, width, height.
 * @param {GameObject} b - Second object with x, y, width, height.
 * @returns {boolean} True if colliding, false otherwise.
 */
export function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
