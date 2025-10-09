const container = document.getElementById("canvas-container");

const gameSettings = {
  stage: 0,
};

const gravitySettings = {
  direction: 1,
  velocity: 9,
  failingSpeed: 9,
  minHeight: 0,
  maxHeight: 0,
};

const player = {
  x: 0,
  y: 0,
  velocity: 10,
  jump: false,
  jumpPower: 13,
  jumpCounter: 0,
  width: 50,
  height: 50,
  color: "#ff0000",
};

const platforms = [
  { x: 0, y: 350, width: 200, height: 20, color: "#00ff00" },
  { x: 400, y: 270, width: 200, height: 20, color: "#00ff00" },
];

function setup() {
  cnv = createCanvas(container.offsetWidth, container.offsetHeight);
  cnv.parent("canvas-container");
  background("#000");
  rectMode(CENTER);
  textAlign(CENTER);
  player.x = width / 2;
  player.y = height - 100 - player.height / 2;
  gravitySettings.minHeight = height - 100;
}

function draw() {
  if (gameSettings.stage === 0) {
    applyGravity();
    drawStage0();
    if (keyIsDown(LEFT_ARROW)) {
      player.x -= player.velocity;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      player.x += player.velocity;
    }
  }
  if (keyIsDown(65)) {
    player.jump = true;
  } else {
    player.jump = false;
  }
}

const drawStage0 = () => {
  // Appearance of the game
  background(150, 230, 240);

  // grass
  noStroke();
  fill(100, 200, 75);
  rect(width / 2, height - 50, width, 100);

  // Player
  stroke(0);
  strokeWeight(5);
  fill(player.color);
  rect(player.x, player.y, player.width, player.height);

  platforms.forEach((platform) => {
    fill(platform.color);
    rect(
      platform.x + platform.width / 2,
      platform.y + platform.height / 2,
      platform.width,
      platform.height
    );
  });

  // Collisions
  platforms.forEach((platform) => {
    if (
      player.x + player.width / 2 > platform.x &&
      player.x - player.width / 2 < platform.x + platform.width &&
      player.y + player.height / 2 > platform.y &&
      player.y + player.height / 2 < platform.y + platform.height
    ) {
      player.y = platform.y - player.height / 2;
      player.jumpCounter = 0;
    }
  });

  // Score
  noStroke();
  fill(0);
  textSize(32);
  text("Score: 0", width - 100, 50);
};

// function keyPressed() {
//   if (key === "a") {
//     player.x -= 5;
//   }
//   if (key === "d") {
//     player.x += 5;
//   }
// }

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
      player.y <= gravitySettings.maxHeight ||
      player.jumpCounter > player.jumpPower
    ) {
      if (player.y >= gravitySettings.minHeight) {
        player.y = gravitySettings.minHeight;
      }
      gravitySettings.direction = 1;
      gravitySettings.velocity = gravitySettings.failingSpeed;
    } else {
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
