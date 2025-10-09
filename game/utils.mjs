class GameObject {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

class Player extends GameObject {
  constructor(
    x,
    y,
    width,
    height,
    color,
    velocity,
    jump,
    jumpPower,
    jumpCounter
  ) {
    super(x, y, width, height, color);
    this.velocity = velocity;
    this.jump = jump;
    this.jumpPower = jumpPower;
    this.jumpCounter = jumpCounter;
  }
}

export const gameSettings = {
  stage: 0,
  score: 0,
};

export const gravitySettings = {
  direction: 1,
  velocity: 9,
  failingSpeed: 9,
  minHeight: 0,
  maxHeight: 0,
};

export const player = new Player(0, 0, 50, 50, "#ff0000", 10, false, 13, 0);

export const platforms = [
  new GameObject(0, 350, 200, 20, "#00ff00"),
  new GameObject(400, 270, 200, 20, "#00ff00"),
  new GameObject(150, 240, 200, 20, "#00ff00"),
  new GameObject(600, 160, 200, 20, "#00ff00"),
  new GameObject(450, 80, 200, 20, "#00ff00"),
];
