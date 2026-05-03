import { describe, it, expect } from "vitest";
import { GameObject } from "../game/core/GameObject.mjs";

describe("GameObject", () => {
  it("should create an object with correct properties", () => {
    const obj = new GameObject(10, 20, 100, 50, "#ff0000");
    expect(obj.x).toBe(10);
    expect(obj.y).toBe(20);
    expect(obj.width).toBe(100);
    expect(obj.height).toBe(50);
    expect(obj.color).toBe("#ff0000");
  });

  it("should have default status as active", () => {
    const obj = new GameObject(0, 0, 10, 10, "#fff");
    expect(obj.status).toBe("active");
  });

  it("should accept custom status", () => {
    const obj = new GameObject(0, 0, 10, 10, "#fff", "inactive");
    expect(obj.status).toBe("inactive");
  });
});
