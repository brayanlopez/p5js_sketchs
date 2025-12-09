/**
 * Game Configuration
 * Centralized configuration for all game settings
 */
export const GameConfig = {
  // Canvas settings
  CANVAS: {
    WIDTH: 1280,
    HEIGHT: 720,
    BACKGROUND_COLOR: [150, 230, 240],
  },

  // Player settings
  PLAYER: {
    WIDTH: 50,
    HEIGHT: 100,
    VELOCITY: 10,
    JUMP_POWER: 13,
    LIVES: 3,
    COLOR: "#ff0000",
  },

  // Physics settings
  PHYSICS: {
    GRAVITY: 9,
    FALLING_SPEED: 9,
    GROUND_LEVEL_OFFSET: 100,
  },

  // Game settings
  GAME: {
    INITIAL_SCORE: 0,
    FONT_SIZE: {
      TITLE: 100,
      SUBTITLE: 40,
      UI: 32,
      WIN: 200,
    },
  },

  // Input keys
  KEYS: {
    JUMP: 65, // 'A' key
    LEFT: 37, // LEFT_ARROW
    RIGHT: 39, // RIGHT_ARROW
    ENTER: 13, // ENTER
    PAUSE: 80, // 'P' key
  },

  // Asset paths
  ASSETS: {
    IMAGES: {
      MARIO: "./game/public/img/8bit_Mario.png",
      CUBEROS: "./game/public/img/icon.jpeg",
      BRICK: "./game/public/img/mario_bricks.jpeg",
      COIN: "./game/public/img/mario_coin.png",
      GOOMBA: "./game/public/img/mario_goomba.png",
      POWERUP: "./game/public/img/mario_powerup.png",
      BACKGROUND: "./game/public/img/supermario_background.jpg",
    },
    SOUNDS: {
      JUMP: "./game/public/Mario-jump-sound.mp3",
    },
    FONTS: {
      GAME: "./game/public/smbfont.ttf",
    },
  },

  // Level configurations
  LEVELS: {
    LEVEL_1: {
      PLATFORMS: [
        // new GameObject(0, 350, 200, 30, "#00ff00"),
        // new GameObject(400, 270, 200, 30, "#00ff00"),
        // new GameObject(150, 240, 200, 30, "#00ff00"),
        // new GameObject(600, 160, 200, 30, "#00ff00"),
        // new GameObject(450, 80, 200, 30, "#00ff00"),

        { x: 0, y: 350, width: 200, height: 30, color: "#00ff00" },
        { x: 400, y: 270, width: 200, height: 30, color: "#00ff00" },
        { x: 150, y: 240, width: 200, height: 30, color: "#00ff00" },
        { x: 600, y: 160, width: 200, height: 30, color: "#00ff00" },
        { x: 450, y: 80, width: 200, height: 30, color: "#00ff00" },
      ],
      COINS: [{ x: 200, y: 500, width: 25, height: 25, color: "#ffff00" }],
      ENEMIES: [{ x: 853, y: 620, width: 50, height: 50, color: "#ff0000" }],
      DOOR: { x: 1180, y: 520, width: 50, height: 100, color: "#00ff00" },
    },
  },
};
