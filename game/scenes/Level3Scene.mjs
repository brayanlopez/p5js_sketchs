import { drawPlayer } from "./draws.mjs";

import { gameSettings, player, SCENES, isColliding } from "../utils.mjs";
import { GameObject } from "../core/GameObject.mjs";

const mainDoor = new GameObject(1290, 400, 90, 320);

export const drawScene3 = () => {
  drawNEA();
  drawPlayer(player.x, player.y, player.isWalking);
  scene3Logic();
};

export const drawNEA = () => {
  rectMode(CORNER);
  textAlign(CORNER);
  imageMode(CORNER);

  //cielo
  background("#93A9F5");

  //montañas
  fill("#438039");
  triangle(0, 400, 580, 720, 0, 720);
  quad(620, 290, 690, 260, 1280, 720, 0, 720);

  //edificio 303c
  //bloque base y profundidad
  noStroke();
  fill("#918D83");
  rect(470, 350, 810, 360);

  //bloque gris oscuro, teatro y primer piso
  fill("#52504B");
  rect(230, 570, 1050, 150);
  fill("#918D83");
  quad(440, 570, 440, 390, 470, 340, 470, 580);
  fill("#21201B");
  quad(200, 590, 200, 720, 230, 720, 230, 570);

  //bloque uno, de izquierda a derecha
  fill("#D4CBB0");
  rect(470, 340, 120, 240);

  //bloque dos
  rect(650, 340, 210, 320);

  //bloque tres
  rect(950, 340, 120, 320);

  //bloque cuatro
  rect(1130, 340, 150, 320);

  //ventanas y entradas
  fill(0);
  square(410, 620, 60);
  rect(590, 400, 60, 150);
  rect(860, 400, 90, 320);
  rect(660, 660, 30, 90);

  //escaleras y piso exterior
  fill("#D4CBB0");
  quad(650, 690, 1280, 690, 1280, 720, 540, 720);

  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);

  // event to go to next level
  rect(mainDoor.x, mainDoor.y, mainDoor.w, mainDoor.h);
};

const scene3Logic = () => {
  if (isColliding(player, mainDoor)) {
    gameSettings.stage = SCENES.LEVEL_4;
  }
};
