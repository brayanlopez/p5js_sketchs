import { drawClassroom, drawNEA, drawPlayer, drawStage } from "./draws.mjs";
import { gameSettings, gravitySettings, player, SCENES } from "./utils.mjs";

const container = document.getElementById("canvas-container");

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
}

function draw() {
  if (gameSettings.stage === SCENES.SPLASH) {
    splashScreen();
  } else if (gameSettings.stage === SCENES.GAME_OVER) {
    gameOverScreen();
  } else if (gameSettings.stage === SCENES.LEVEL_1) {
    gameSettings.totalTime = millis();
    drawStage(width, height, mario, brick, coinSprite, gameFont);
    applyGravity();
    playerMovement();
  } else if (gameSettings.stage === SCENES.LEVEL_2) {
    drawClassroom();
    drawPlayer();
  } else if (gameSettings.stage === SCENES.LEVEL_3) {
    drawNEA();
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
  }
}

// function keyTyped() {
//   if (key === "a") {
//     player.jump = true;
//   } else {
//     player.jump = false;
//   }
// }

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

/**
 * @description Splash screen of the game
 */
const splashScreen = () => {
  // Appearance of the game
  background(150, 230, 240);

  // grass
  noStroke();
  fill(100, 200, 75);
  rect(width / 2, height - 50, width, 100);

  // Title
  textFont(gameFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(100);
  text("Cuberos", width / 2, height / 2);
  textSize(40);
  text(
    "Press enter to play \nmove with arrows \njump with 'a', change with 'p'",
    width / 2,
    height / 2 + 50
  );
};

const winScreen = () => {
  // Title
  textFont(gameFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(200);
  text("You Win", width / 2, height / 2);
  textSize(100);
  text("Congratulations", width / 2, height / 2 + 100);
};

const gameOverScreen = () => {
  // Title
  textFont(gameFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(200);
  text("You Lose", width / 2, height / 2);
};

// Added this to make it work with modules
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
