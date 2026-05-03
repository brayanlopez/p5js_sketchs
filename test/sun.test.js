import { describe, it, expect, beforeEach, vi } from "vitest";
import { Cloud, ExplosionParticle, drawCloud, drawCactus, animationLogic, setSunHeight, setIncreaseLimit } from "../sketchs/sun.js";

beforeEach(() => {
  let randomCallCount = 0;
  globalThis.random = vi.fn((min, max) => {
    if (max === undefined) return min / 2;
    randomCallCount++;
    if (randomCallCount % 2 === 0) return min + (max - min) * 0.75;
    return min + (max - min) * 0.25;
  });
  globalThis.color = (r, g, b, a) => {
    const c = { r, g, b };
    if (a !== undefined) c.a = a;
    c.setAlpha = (alpha) => { c.a = alpha; };
    return c;
  };
  globalThis.cos = () => 0.5;
  globalThis.sin = () => 0.5;
  globalThis.TWO_PI = Math.PI * 2;
  globalThis.circle = vi.fn();
  globalThis.ellipse = vi.fn();
  globalThis.fill = vi.fn();
  globalThis.rect = vi.fn();
  globalThis.line = vi.fn();
  globalThis.stroke = vi.fn();
  globalThis.noStroke = vi.fn();
  globalThis.strokeWeight = vi.fn();
  globalThis.width = 800;
  globalThis.height = 600;
  globalThis.keyIsPressed = false;
  globalThis.key = "";
  globalThis.constrain = (val, min, max) => Math.min(Math.max(val, min), max);

  // Reset module-level variables
  setSunHeight(120);
  setIncreaseLimit(1800);
});

describe("Cloud", () => {
  let cloud;

  beforeEach(() => {
    cloud = new Cloud(100, 200);
  });

  it("should create a cloud with correct position", () => {
    expect(cloud.x).toBe(100);
    expect(cloud.y).toBe(200);
  });

  it("should move cloud to the right", () => {
    const initialX = cloud.x;
    cloud.move();
    expect(cloud.x).toBeGreaterThan(initialX);
  });

  it("should wrap around when cloud goes off screen", () => {
    cloud.x = 900;
    cloud.speed = 50;
    cloud.move();
    expect(cloud.x).toBe(-100);
  });
});

describe("ExplosionParticle", () => {
  let particle;

  beforeEach(() => {
    particle = new ExplosionParticle(100, 100);
  });

  it("should create a particle with correct initial position", () => {
    expect(particle.x).toBe(100);
    expect(particle.y).toBe(100);
  });

  it("should update position based on velocity", () => {
    const initialX = particle.x;
    const initialY = particle.y;
    particle.update();
    expect(particle.x).not.toBe(initialX);
    expect(particle.y).not.toBe(initialY);
  });

  it("should decrease life on update", () => {
    const initialLife = particle.life;
    particle.update();
    expect(particle.life).toBe(initialLife - 3);
  });

  it("should be alive when life > 0 and radius > 1", () => {
    expect(particle.isAlive()).toBe(true);
  });

  it("should not be alive when life <= 0", () => {
    particle.life = 0;
    expect(particle.isAlive()).toBe(false);
  });
});

describe("drawCloud function", () => {
  it("should call ellipse multiple times", () => {
    const ellipseMock = vi.fn();
    globalThis.ellipse = ellipseMock;
    globalThis.fill = vi.fn();
    drawCloud(100, 100);
    expect(ellipseMock).toHaveBeenCalledTimes(5);
  });
});

describe("drawCactus function", () => {
  it("should call rect when drawing", () => {
    const rectMock = vi.fn();
    globalThis.rect = rectMock;
    globalThis.fill = vi.fn();
    drawCactus(100, 500, 30);
    expect(rectMock).toHaveBeenCalled();
  });
});

describe("animationLogic", () => {
  it("should call animationLogic without errors", () => {
    setSunHeight(100);
    setIncreaseLimit(1800);
    globalThis.keyIsPressed = true;
    globalThis.key = "ArrowUp";
    expect(() => animationLogic()).not.toThrow();
  });
});
