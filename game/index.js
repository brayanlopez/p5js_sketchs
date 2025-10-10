import {
  coins,
  gameSettings,
  gravitySettings,
  isColliding,
  platforms,
  player,
  Player,
} from "./utils.mjs";

const container = document.getElementById("canvas-container");

let mario, cuberos, brick, jumpSound, gameFont, coinSprite;

let isCuberos = false;

function setup() {
  let cnv = createCanvas(container.offsetWidth, container.offsetHeight);
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
  if (gameSettings.stage === 0) {
    splashScreen();
  } else if (gameSettings.stage === 1) {
    gameSettings.totalTime = millis();
    drawStage();
    applyGravity();
    playerMovement();
  } else if (gameSettings.stage === 3) {
    gameOverScreen();
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
  if (keyCode === ENTER && gameSettings.stage === 0) {
    gameSettings.stage = 1;
  }
}

// function keyTyped() {
//   if (key === "a") {
//     player.jump = true;
//   } else {
//     player.jump = false;
//   }
// }

const drawStage = () => {
  // Appearance of the game
  background(150, 230, 240);

  // grass
  noStroke();
  fill(100, 200, 75);
  rect(width / 2, height - 50, width, 100);

  // Player
  // stroke(0);
  // strokeWeight(2);
  // fill(player.color);
  // rect(player.x, player.y, player.width, player.height);
  image(
    isCuberos ? cuberos : mario,
    player.x,
    player.y,
    player.width,
    isCuberos ? player.height - 50 : player.height
  );

  platforms.forEach((platform) => {
    fill(platform.color);
    // rect(
    //   platform.x + platform.width / 2,
    //   platform.y + platform.height / 2,
    //   platform.width,
    //   platform.height
    // );
    image(
      brick,
      platform.x + platform.width / 2,
      platform.y + platform.height / 2,
      platform.width,
      platform.height
    );
  });

  coins.forEach((coin) => {
    if (coin.status === "active") {
      image(
        coinSprite,
        coin.x + coin.width / 2,
        coin.y + coin.height / 2,
        coin.width,
        coin.height
      );
    }
    if (isColliding(player, coin) && coin.status === "active") {
      coin.status = "inactive";
      gameSettings.score++;
    }
    // isColliding(player, coin)
  });

  // Collisions
  // TODO: check this, the pivot is on the center of the player and this can made more hard to calculate and work.
  platforms.forEach((platform) => {
    if (
      player.x + player.width / 2 > platform.x &&
      player.x - player.width / 2 < platform.x + platform.width &&
      player.y + player.height / 2 > platform.y &&
      player.y + player.height / 2 < platform.y + platform.height
    ) {
      // if (isColliding(player, platform)) {
      player.y = platform.y - player.height / 2;
      player.jumpCounter = 0;
    }
  });

  // Enemy
  const enemy = new Player(width - 100, height - 100, 50, 50, "#ff0000");
  rect(enemy.x, enemy.y, enemy.width, enemy.height);
  if (isColliding(player, enemy)) {
    player.lives--;
    player.resetPosition();
  }
  if (player.lives === 0) {
    gameSettings.stage = 3;
  }

  // ui
  noStroke();
  fill(0);
  textSize(32);
  textFont(gameFont);

  text(`Lives: ${player.lives}`, width / 9 - 80, 50);

  text(`Score: ${gameSettings.score}`, width / 9, 50);

  // Lives
  text(`Lives: ${int(gameSettings.totalTime / 1000)}`, width - 100, 50);
};

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
