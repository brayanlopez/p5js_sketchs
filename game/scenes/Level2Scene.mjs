import { drawPlayer } from "./draws.mjs";

import { gameSettings, isColliding, player, SCENES } from "../utils.mjs";
import { GameObject } from "../core/GameObject.mjs";

const mainDoor = new GameObject(50, 350, 210, 370);
let doorCollisionCount = 0;
let hasCollidedThisFrame = false;

// Function to generate random door position
const getRandomDoorPosition = (position) => {
  // Define valid positions for the door (avoiding overlapping with fixed door at 320)
  const validPositions = [
    { x: 50, y: 350 }, // Original position
    { x: 600, y: 350 }, // Right side
    { x: 1000, y: 350 }, // Far right
    { x: 150, y: 200 }, // Upper left
    { x: 500, y: 200 }, // Upper center
    { x: 900, y: 200 }, // Upper right
    { x: 750, y: 350 }, // Mid-right
    { x: 850, y: 350 }, // Far mid-right
    { x: 200, y: 350 }, // Left-center
    { x: 400, y: 200 }, // Upper left-center
    { x: 650, y: 200 }, // Upper right-center
    { x: 800, y: 200 }, // Upper far right-center
    { x: 100, y: 300 }, // Mid-height left
    { x: 550, y: 300 }, // Mid-height center
    { x: 950, y: 300 }, // Mid-height right
    { x: 700, y: 250 }, // Quarter-height right
    { x: 250, y: 250 }, // Quarter-height left
    { x: 450, y: 350 }, // Center-left bottom
    { x: 350, y: 300 }, // Mid-height center-left
    { x: 800, y: 300 }, // Mid-height right-center
  ];

  if (position !== undefined) {
    return validPositions[position];
  }

  const randomIndex = Math.floor(Math.random() * validPositions.length);
  return validPositions[randomIndex];
};

// Initialize door at random position
const initializeDoor = () => {
  const randomPos = getRandomDoorPosition();
  mainDoor.x = randomPos.x;
  mainDoor.y = randomPos.y;
};

// Call initialization
initializeDoor();

export const drawScene2 = () => {
  drawClassroom();
  drawPlayer(player.x, player.y);
  scene2Logic();
};

const drawClassroom = () => {
  rectMode(CORNER);
  textAlign(CORNER);
  imageMode(CORNER);

  // Door function with optional room number sign
  function drawDoor(x, y, width, height, roomNumber) {
    // Outer frame (light brown)
    fill("#C4B176");
    rect(x, y, width, height);

    // Inner door (dark brown)
    fill("#995208");
    let margin = 10; // Frame margin
    rect(x + margin, y + margin, width - margin * 2, height - margin * 2);

    // Doorknob
    fill("#B2CCEB");
    circle(x + width - 30, y + height / 2 + 30, 20);

    // Room number sign (cartel)
    if (roomNumber) {
      let signWidth = 130;
      let signHeight = 50;
      let signX = x + (width - signWidth) / 2; // Center the sign on the door
      let signY = y + 90; // Position near top of door

      // Sign background
      fill("#F2F2F2");
      rect(signX, signY, signWidth, signHeight, 10);

      // Room number text
      textSize(50);
      textAlign(CENTER, CENTER);
      fill("#143952");
      text(roomNumber, signX + signWidth / 2, signY + signHeight / 2);
    }
  }

  //Pared
  background("#FCF5DE");

  //guarda escobas
  noStroke();
  fill("#1B1B24");
  rect(0, 670, 1280, 80);
  fill(0);
  rect(0, 660, 1280, 10);

  //Profundidad de pared(huecos donde están la ventana, han de tener otro nombre pero no lo conozco)
  fill("#C4B176");
  rect(800, 0, 480, 250);

  //ventana
  fill("#1B1B24");
  rect(810, 0, 470, 240);
  fill("#B2E8EB");
  rect(820, 0, 470, 230);

  //puertas
  drawDoor(mainDoor.x, mainDoor.y, mainDoor.width, mainDoor.height, "109");
  drawDoor(320, 350, 210, 370, "110");

  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
};

const scene2Logic = () => {
  const isCurrentlyColliding = isColliding(mainDoor, player);

  // Check if player just started colliding with door (not already colliding from previous frame)
  if (isCurrentlyColliding && !hasCollidedThisFrame) {
    hasCollidedThisFrame = true;
    doorCollisionCount++;

    // If less than 5 collisions, move door to random position
    if (doorCollisionCount <= 5) {
      const newPos =
        doorCollisionCount === 5
          ? getRandomDoorPosition(0)
          : getRandomDoorPosition();
      mainDoor.x = newPos.x;
      mainDoor.y = newPos.y;
    } else {
      // After 5 collisions, transition to level 3
      gameSettings.stage = SCENES.LEVEL_3;
    }
  }

  // Reset collision flag when player is no longer colliding
  if (!isCurrentlyColliding) {
    hasCollidedThisFrame = false;
  }
};
