import { describe, it, expect, beforeEach } from "vitest";

// Mock p5.js global functions
globalThis.random = vi.fn((min, max) => {
  if (max === undefined) {
    return min ? 5 : 0.5; // deterministic values for tests
  }
  return min + (max - min) / 2; // deterministic middle value for tests
});

globalThis.color = (r, g, b, a) => ({ r, g, b, a });
globalThis.cos = Math.cos;
globalThis.sin = Math.sin;
globalThis.TWO_PI = Math.PI * 2;
globalThis.constrain = (val, min, max) => Math.min(Math.max(val, min), max);

describe("p5.js mocks", () => {
  it("should mock random function", () => {
    expect(random(0, 100)).toBe(50);
    expect(random(10)).toBe(5);
  });

  it("should mock color function", () => {
    const c = color(255, 0, 0, 128);
    expect(c).toEqual({ r: 255, g: 0, b: 0, a: 128 });
  });

  it("should mock constrain function", () => {
    expect(constrain(150, 0, 100)).toBe(100);
    expect(constrain(-10, 0, 100)).toBe(0);
    expect(constrain(50, 0, 100)).toBe(50);
  });
});
