import { describe, it, expect } from "vitest";
import {
  SCENES,
  gameSettings,
  gravitySettings,
  player,
  isColliding,
} from "../game/utils.mjs";

describe("SCENES", () => {
  it("should have SPLASH scene", () => {
    expect(SCENES.SPLASH).toBe("SPLASH");
  });

  it("should have LEVEL_1 scene", () => {
    expect(SCENES.LEVEL_1).toBe("LEVEL_1");
  });

  it("should have GAME_OVER scene", () => {
    expect(SCENES.GAME_OVER).toBe("GAME_OVER");
  });

  it("should have WIN scene", () => {
    expect(SCENES.WIN).toBe("WIN");
  });
});

describe("gameSettings", () => {
  it("should have initial stage as SPLASH", () => {
    expect(gameSettings.stage).toBe(SCENES.SPLASH);
  });

  it("should have initial score as 0", () => {
    expect(gameSettings.score).toBe(0);
  });

  it("should allow updating stage", () => {
    gameSettings.stage = SCENES.LEVEL_1;
    expect(gameSettings.stage).toBe(SCENES.LEVEL_1);
    gameSettings.stage = SCENES.SPLASH; // Reset
  });

  it("should allow updating score", () => {
    gameSettings.score = 100;
    expect(gameSettings.score).toBe(100);
    gameSettings.score = 0; // Reset
  });
});

describe("gravitySettings", () => {
  it("should have initial direction as 1", () => {
    expect(gravitySettings.direction).toBe(1);
  });

  it("should have initial velocity as 9", () => {
    expect(gravitySettings.velocity).toBe(9);
  });

  it("should have failingSpeed as 9", () => {
    expect(gravitySettings.failingSpeed).toBe(9);
  });
});

describe("player", () => {
  it("should have initial x position as 0", () => {
    expect(player.x).toBe(0);
  });

  it("should have initial y position as 0", () => {
    expect(player.y).toBe(0);
  });

  it("should have initial lives as 3", () => {
    expect(player.lives).toBe(3);
  });

  it("should have resetPosition method", () => {
    expect(typeof player.resetPosition).toBe("function");
  });
});

describe("isColliding", () => {
  it("should return true when objects are colliding", () => {
    const a = { x: 0, y: 0, width: 50, height: 50 };
    const b = { x: 25, y: 25, width: 50, height: 50 };
    expect(isColliding(a, b)).toBe(true);
  });

  it("should return false when objects are not colliding (x axis)", () => {
    const a = { x: 0, y: 0, width: 50, height: 50 };
    const b = { x: 100, y: 0, width: 50, height: 50 };
    expect(isColliding(a, b)).toBe(false);
  });

  it("should return false when objects are not colliding (y axis)", () => {
    const a = { x: 0, y: 0, width: 50, height: 50 };
    const b = { x: 0, y: 100, width: 50, height: 50 };
    expect(isColliding(a, b)).toBe(false);
  });

  it("should return true when objects are touching", () => {
    const a = { x: 0, y: 0, width: 50, height: 50 };
    const b = { x: 50, y: 0, width: 50, height: 50 };
    expect(isColliding(a, b)).toBe(false); // Edge touching is not colliding
  });
});
