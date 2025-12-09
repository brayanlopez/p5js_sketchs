import { drawPlayer, drawSpaceship } from "./draws.mjs";

import { gameSettings, player, SCENES, isColliding } from "../utils.mjs";

export const drawScene4 = () => {
  drawScene();
  if (playerVisible) {
    drawPlayer(player.x, player.y, player.isWalking);
  }
  sceneLogic();
};

// Spaceship state for Level 3
let spaceship = {
  x: (1280 / 9) * 5, // Same position as in drawNEA
  y: 720 - 220, // Same position as in drawNEA
  width: 200,
  height: 400,
  isMoving: false,
  speed: 5,
};

let playerVisible = true;

// Reset function to initialize Level 3 state
export const resetLevel3 = () => {
  spaceship = {
    x: (1280 / 9) * 8,
    y: 720 - 220,
    width: 200,
    height: 400,
    isMoving: false,
    speed: 5,
  };
  playerVisible = true;
};

const drawScene = () => {
  //cielo
  background("#93A9F5");

  //montañas
  fill("#438039");
  triangle(0, 109, 580, 720, 0, 720);
  quad(1120, 90, 1280, 60, 1280, 720, 0, 720);
  quad(426, 27, 852, 65, 1280, 720, 0, 380);
  triangle(0, 360, 180, 40, 560, 300);
  noStroke();
  //entrada
  //barandas
  fill("#bfaa1d");
  arc(500, 1440, 2350, 2350, -PI, 0);
  fill("#438039");
  arc(500, 1453, 2350, 2350, -PI, 0);
  fill("#bfaa1d");
  arc(500, 1465, 2350, 2350, -PI, 0);
  fill("#438039");
  arc(500, 1477, 2350, 2350, -PI, 0);
  //puente
  fill("#879993");
  arc(500, 1485, 2350, 2350, -PI, 0);
  fill("#4c5c57");
  arc(500, 1530, 2350, 2350, -PI, 0);
  noFill();

  //puerta
  fill("#222b28");
  quad(200, 425, 800, 425, 800, 720, 200, 720);
  fill("#438039");
  quad(205, 430, 795, 430, 795, 600, 205, 600);
  //suelo
  fill("#879993");
  quad(200, 600, 800, 600, 1280, 720, 0, 720);

  //árboles cercanos
  fill("#5c4118");
  quad(850, 665, 850, 0, 975, 0, 970, 665);
  quad(130, 665, 130, 0, 190, 0, 190, 665);
  fill("#33230b");
  quad(20, 720, 20, 0, 150, 0, 150, 720);
  quad(1000, 720, 1000, 0, 1230, 0, 1230, 720);

  drawSpaceship(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
};

const sceneLogic = () => {
  // Check collision between player and spaceship
  if (!spaceship.isMoving && playerVisible && isColliding(player, spaceship)) {
    // Player collides with spaceship
    playerVisible = false; // Make player disappear
    spaceship.isMoving = true; // Start spaceship movement
  }

  // Move spaceship up if it's moving
  if (spaceship.isMoving) {
    spaceship.y -= spaceship.speed;

    // Check if spaceship is off screen (completely disappeared)
    if (spaceship.y + spaceship.height < 0) {
      // Load level 4
      gameSettings.stage = SCENES.LEVEL_5;
    }
  }
};
