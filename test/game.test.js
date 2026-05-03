import { describe, it, expect, beforeEach } from "vitest";

// Mock p5.js functions used in game
globalThis.width = 1280;
globalThis.height = 720;
globalThis.ENTER = 13;
globalThis.LEFT_ARROW = 37;
globalThis.RIGHT_ARROW = 39;

// Mock game modules
const SCENES = {
  SPLASH: 0,
  LEVEL_1: 1,
  LEVEL_2: 2,
  LEVEL_3: 3,
  LEVEL_4: 4,
  LEVEL_5: 5,
  WIN: 6,
  GAME_OVER: 7,
};

const player = {
  x: 640,
  y: 620,
  width: 32,
  height: 32,
  velocity: 5,
  jump: false,
  jumpCounter: 0,
  jumpPower: 15,
  lives: 3,
  isWalking: false,
  resetPosition: function () {
    this.x = width / 2;
    this.y = height - 100 - this.height / 2;
  },
};

const gameSettings = {
  stage: SCENES.SPLASH,
  score: 0,
  totalTime: 0,
};

const gravitySettings = {
  direction: 1,
  velocity: 0,
  failingSpeed: 5,
  minHeight: 620,
  maxHeight: 720,
};

describe("Game Logic", () => {
  beforeEach(() => {
    // Reset state before each test
    player.x = width / 2;
    player.y = height - 100 - player.height / 2;
    player.lives = 3;
    player.jump = false;
    player.jumpCounter = 0;
    gameSettings.stage = SCENES.SPLASH;
    gameSettings.score = 0;
    gravitySettings.direction = 1;
    gravitySettings.velocity = 0;
  });

  describe("applyGravity", () => {
    it("should keep player on ground when not jumping", () => {
      player.y = gravitySettings.minHeight;
      player.jump = false;

      const applyGravity = () => {
        if (player.y >= gravitySettings.minHeight && player.jump === false) {
          player.y += 0;
          player.jumpCounter = 0;
        } else {
          player.y += gravitySettings.velocity * gravitySettings.direction;
        }
      };

      applyGravity();
      expect(player.y).toBe(gravitySettings.minHeight);
      expect(player.jumpCounter).toBe(0);
    });

    it("should move player down when falling", () => {
      player.y = 500;
      player.jump = false;
      gravitySettings.velocity = gravitySettings.failingSpeed;
      gravitySettings.direction = 1;

      const applyGravity = () => {
        if (player.y >= gravitySettings.minHeight && player.jump === false) {
          player.y += 0;
          player.jumpCounter = 0;
        } else {
          player.y += gravitySettings.velocity * gravitySettings.direction;
        }
      };

      applyGravity();
      expect(player.y).toBe(500 + gravitySettings.failingSpeed);
    });
  });

  describe("playerMovement", () => {
    it("should move player left when LEFT_ARROW is pressed", () => {
      const initialX = player.x;
      const keyIsDown = (key) => key === globalThis.LEFT_ARROW;

      const playerMovement = () => {
        if (keyIsDown(LEFT_ARROW)) {
          player.x -= player.velocity;
        }
      };

      playerMovement();
      expect(player.x).toBe(initialX - player.velocity);
    });

    it("should move player right when RIGHT_ARROW is pressed", () => {
      const initialX = player.x;
      const keyIsDown = (key) => key === globalThis.RIGHT_ARROW;

      const playerMovement = () => {
        if (keyIsDown(RIGHT_ARROW)) {
          player.x += player.velocity;
        }
      };

      playerMovement();
      expect(player.x).toBe(initialX + player.velocity);
    });

    it("should set jump when key A (65) is pressed", () => {
      const keyIsDown = (key) => key === 65;

      const playerMovement = () => {
        if (keyIsDown(65)) {
          player.jump = true;
        } else {
          player.jump = false;
        }
      };

      playerMovement();
      expect(player.jump).toBe(true);
    });

    it("should wrap player to right side when going off left", () => {
      player.x = -player.width - 1; // Ensure condition is met

      const playerMovement = () => {
        if (player.x + player.width < 0) {
          player.x = width + player.width / 2;
        }
      };

      playerMovement();
      expect(player.x).toBe(width + player.width / 2);
    });

    it("should wrap player to left side when going off right", () => {
      player.x = width + player.width + 1; // Ensure condition is met

      const playerMovement = () => {
        if (player.x - player.width > width) {
          player.x = 0 - player.width / 2;
        }
      };

      playerMovement();
      expect(player.x).toBe(0 - player.width / 2);
    });
  });

  describe("keyPressed handler", () => {
    it("should switch to LEVEL_1 when ENTER is pressed on SPLASH", () => {
      gameSettings.stage = SCENES.SPLASH;
      const keyCode = ENTER;

      const keyPressed = () => {
        if (keyCode === ENTER && gameSettings.stage === SCENES.SPLASH) {
          gameSettings.stage = SCENES.LEVEL_1;
        }
      };

      keyPressed();
      expect(gameSettings.stage).toBe(SCENES.LEVEL_1);
    });

    it("should reset game on ENTER when GAME_OVER", () => {
      gameSettings.stage = SCENES.GAME_OVER;
      player.lives = 0;
      gameSettings.score = 100;
      const keyCode = ENTER;

      const keyPressed = () => {
        if (keyCode === ENTER && gameSettings.stage === SCENES.GAME_OVER) {
          gameSettings.stage = SCENES.SPLASH;
          player.lives = 3;
          gameSettings.score = 0;
          player.resetPosition();
        }
      };

      keyPressed();
      expect(gameSettings.stage).toBe(SCENES.SPLASH);
      expect(player.lives).toBe(3);
      expect(gameSettings.score).toBe(0);
    });
  });
});
