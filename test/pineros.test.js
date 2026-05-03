import { describe, it, expect, beforeEach, vi } from "vitest";
import { pineros } from "../sketchs/test.js";

beforeEach(() => {
  globalThis.fill = vi.fn();
  globalThis.rect = vi.fn();
  globalThis.ellipse = vi.fn();
  globalThis.noStroke = vi.fn();
  globalThis.strokeWeight = vi.fn();
  globalThis.pushMatrix = vi.fn();
  globalThis.popMatrix = vi.fn();
  globalThis.translate = vi.fn();
  globalThis.rotate = vi.fn();
  globalThis.radians = vi.fn(() => -0.436); // radians(-25)
});

describe("pineros", () => {
  it("should call fill and rect for neck drawing", () => {
    const fillMock = vi.fn();
    const rectMock = vi.fn();
    globalThis.fill = fillMock;
    globalThis.rect = rectMock;

    pineros(100, 200);

    expect(fillMock).toHaveBeenCalledWith("#FFE8CC");
    expect(rectMock).toHaveBeenCalled();
  });

  it("should call ellipse for shoes drawing", () => {
    const ellipseMock = vi.fn();
    globalThis.ellipse = ellipseMock;

    pineros(100, 200);

    expect(ellipseMock).toHaveBeenCalledTimes(10); // Multiple ellipse calls
  });

  it("should call noStroke before drawing head", () => {
    const noStrokeMock = vi.fn();
    globalThis.noStroke = noStrokeMock;

    pineros(100, 200);

    expect(noStrokeMock).toHaveBeenCalled();
  });

  it("should draw all body parts", () => {
    const rectMock = vi.fn();
    const ellipseMock = vi.fn();
    globalThis.rect = rectMock;
    globalThis.ellipse = ellipseMock;

    pineros(100, 200);

    // Should draw neck, shoes, legs, torso, hat, head, hair, beard, glasses, arm
    expect(rectMock).toHaveBeenCalled();
    expect(ellipseMock).toHaveBeenCalled();
  });
});
