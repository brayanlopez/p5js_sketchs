import { Player } from "./core/Player.mjs";

export const SCENES = {
  SPLASH: "SPLASH",
  GAME: "GAME",
  PAUSE: "PAUSE",
  GAME_OVER: "GAME_OVER",
  WIN: "WIN",
  LEVEL_1: "LEVEL_1",
  LEVEL_2: "LEVEL_2",
  LEVEL_3: "LEVEL_3",
  LEVEL_4: "LEVEL_4",
  LEVEL_5: "LEVEL_5",
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
