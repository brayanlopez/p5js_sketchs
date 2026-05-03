import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["test/**/*.test.js"],
    coverage: {
      provider: "v8",
      include: ["game/**/*.js"],
      exclude: ["game/public/**/*"],
      reporter: ["text", "lcov"],
      thresholds: {
        statements: 20,
        branches: 15,
        functions: 20,
        lines: 20,
      },
    },
  },
});
