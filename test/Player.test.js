import { describe, it, expect, beforeEach } from "vitest";
import { Player } from "../game/core/Player.mjs";

describe("Player", () => {
  let player;

  beforeEach(() => {
    player = new Player(0, 0, 50, 100, "#ff0000", 10, false, 13, 0);
  });

  it("should create a player with correct properties", () => {
    expect(player.x).toBe(0);
    expect(player.y).toBe(0);
    expect(player.width).toBe(50);
    expect(player.height).toBe(100);
    expect(player.color).toBe("#ff0000");
    expect(player.velocity).toBe(10);
  });

  it("should have initial lives as 3 by default", () => {
    const defaultPlayer = new Player(0, 0, 50, 100, "#ff0000", 10, false, 13);
    expect(defaultPlayer.lives).toBe(3);
  });

  it("should have maxLives as 5", () => {
    expect(player.maxLives).toBe(5);
  });

  it("should have resetPosition method", () => {
    player.x = 100;
    player.y = 200;
    player.resetPosition();
    expect(player.x).toBe(0);
    expect(player.y).toBe(0);
  });

  it("should have jump method", () => {
    expect(typeof player.jump).toBe("function");
  });

  it("should set isJumping to true when jump is called", () => {
    player.jump();
    expect(player.isJumping).toBe(true);
  });

  it("should reset jumpCounter when jump is called", () => {
    player.jumpCounter = 10;
    player.jump();
    expect(player.jumpCounter).toBe(0);
  });

  it("should have addLife method", () => {
    expect(typeof player.addLife).toBe("function");
  });

  it("should increase lives when addLife is called", () => {
    player.lives = 2;
    player.addLife();
    expect(player.lives).toBe(3);
  });

  it("should not exceed maxLives when addLife is called", () => {
    player.lives = 5;
    player.addLife();
    expect(player.lives).toBe(5);
  });
});
