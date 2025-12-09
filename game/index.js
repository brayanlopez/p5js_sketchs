import { drawStage } from "./scenes/Level1Scene.mjs";
import { drawScene2 } from "./scenes/Level2Scene.mjs";
import { drawScene3 } from "./scenes/Level3Scene.mjs";
import {
  drawScene4,
  keyPressedLevel4,
  setupLevel4,
} from "./scenes/Level4Scene.mjs";

import {
  gameOverScreen,
  splashScreen,
  winScreen,
} from "./scenes/SceneManager.mjs";

import { gameSettings, gravitySettings, player, SCENES } from "./utils.mjs";

let mario, cuberos, brick, jumpSound, gameFont, coinSprite;

let isCuberos = false;

function setup() {
  // let cnv = createCanvas(container.offsetWidth, container.offsetHeight);
  let cnv = createCanvas(1280, 720);
  cnv.parent("canvas-container");
  background("#000");
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  player.x = width / 2;
  player.y = height - 100 - player.height / 2;
  gravitySettings.minHeight = height - 100;

  setupLevel4();
}

function draw() {
  if (gameSettings.stage === SCENES.SPLASH) {
    splashScreen(gameFont);
  } else if (gameSettings.stage === SCENES.LEVEL_1) {
    gameSettings.totalTime = millis();
    drawStage(width, height, brick, coinSprite, gameFont);
    applyGravity();
    playerMovement();
  } else if (gameSettings.stage === SCENES.LEVEL_2) {
    drawScene2();
    applyGravity();
    playerMovement();
  } else if (gameSettings.stage === SCENES.LEVEL_3) {
    drawScene3();
    applyGravity();
    playerMovement();
  } else if (gameSettings.stage === SCENES.LEVEL_4) {
    drawScene4();
  } else if (gameSettings.stage === SCENES.WIN) {
    winScreen(gameFont);
  } else if (gameSettings.stage === SCENES.GAME_OVER) {
    gameOverScreen(gameFont);
  }
}

function preload() {
  mario = loadImage("./game/public/img/8bit_Mario.png");
  cuberos = loadImage("./game/public/img/icon.jpeg");
  brick = loadImage("./game/public/img/mario_bricks.jpeg");
  jumpSound = loadSound("./game/public/Mario-jump-sound.mp3");
  gameFont = loadFont("./game/public/smbfont.ttf");
  coinSprite = loadImage("./game/public/img/mario_coin.png");
}

function keyPressed() {
  if (key === "p") {
    isCuberos = !isCuberos;
  }
  if (keyCode === ENTER && gameSettings.stage === SCENES.SPLASH) {
    gameSettings.stage = SCENES.LEVEL_1;
  }
  if (keyCode === ENTER && gameSettings.stage === SCENES.GAME_OVER) {
    gameSettings.stage = SCENES.SPLASH;
    player.lives = 3;
    gameSettings.score = 0;
    player.resetPosition();
  }
  if (keyCode === ENTER && gameSettings.stage === SCENES.LEVEL_2) {
    gameSettings.stage = SCENES.LEVEL_3;
  } else if (keyCode === ENTER && gameSettings.stage === SCENES.LEVEL_3) {
    gameSettings.stage = SCENES.WIN;
  }

  if (gameSettings.stage === SCENES.LEVEL_4) {
    keyPressedLevel4();
  }
}

const applyGravity = () => {
  if (player.y >= gravitySettings.minHeight && player.jump === false) {
    player.y += 0;
    player.jumpCounter = 0;
  } else {
    player.y += gravitySettings.velocity * gravitySettings.direction;
  }
  if (player.jump) {
    if (
      player.y <= gravitySettings.maxHeight - 200 ||
      player.jumpCounter > player.jumpPower
    ) {
      if (player.y >= gravitySettings.minHeight) {
        player.y = gravitySettings.minHeight;
      }
      gravitySettings.direction = 1;
      gravitySettings.velocity = gravitySettings.failingSpeed;
    } else {
      // jumpSound.play();
      gravitySettings.direction = -1;
      gravitySettings.velocity = player.jumpPower;
      player.jumpCounter++;
    }
    player.jump = false;
  } else {
    gravitySettings.direction = 1;
    gravitySettings.velocity = gravitySettings.failingSpeed;
  }
};

const playerMovement = () => {
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= player.velocity;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += player.velocity;
  }
  if (keyIsDown(65)) {
    player.jump = true;
  } else {
    player.jump = false;
  }

  // Code to make the player appear on the other side of the screen
  if (player.x + player.width < 0) {
    player.x = width + player.width / 2;
  }
  if (player.x - player.width > width) {
    player.x = 0 - player.width / 2;
  }
};

// Added this to make it work with modules
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
