import { describe, it, expect } from "vitest";
import { GameConfig } from "../game/core/GameConfig.mjs";

describe("GameConfig", () => {
  it("should have canvas width as 1280", () => {
    expect(GameConfig.CANVAS.WIDTH).toBe(1280);
  });

  it("should have canvas height as 720", () => {
    expect(GameConfig.CANVAS.HEIGHT).toBe(720);
  });

  it("should have player jump power as 13", () => {
    expect(GameConfig.PLAYER.JUMP_POWER).toBe(13);
  });

  it("should have player initial lives as 3", () => {
    expect(GameConfig.PLAYER.LIVES).toBe(3);
  });

  it("should have gravity as 9", () => {
    expect(GameConfig.PHYSICS.GRAVITY).toBe(9);
  });

  it("should have jump key as 65 (A)", () => {
    expect(GameConfig.KEYS.JUMP).toBe(65);
  });

  it("should have enter key as 13", () => {
    expect(GameConfig.KEYS.ENTER).toBe(13);
  });

  it("should have level 1 platforms defined", () => {
    expect(GameConfig.LEVELS.LEVEL_1.PLATFORMS).toBeDefined();
    expect(GameConfig.LEVELS.LEVEL_1.PLATFORMS.length).toBeGreaterThan(0);
  });

  it("should have level 1 coins defined", () => {
    expect(GameConfig.LEVELS.LEVEL_1.COINS).toBeDefined();
  });

  it("should have level 1 enemies defined", () => {
    expect(GameConfig.LEVELS.LEVEL_1.ENEMIES).toBeDefined();
  });
});
