import { drawPlayer } from "./draws.mjs";

import { player } from "../utils.mjs";

export const drawScene2 = () => {
  drawClassroom();
  drawPlayer(player.x, player.y);
};

export const drawClassroom = () => {
  rectMode(CORNER);
  textAlign(CORNER);
  imageMode(CORNER);

  //Puerta con función
  function drawDoor() {
    fill("#995208");
    rect(60, 360, 190, 360);
  }

  //Pared
  background("#FCF5DE");

  //guarda escobas
  noStroke();
  fill("#1B1B24");
  rect(0, 670, 1280, 80);
  fill(0);
  rect(0, 660, 1280, 10);

  //Profundidad de pared(huecos donde están las puertas y ventanas, han de tener otro nombre pero no lo conozco)
  fill("#C4B176");
  rect(50, 350, 210, 370);
  rect(310, 350, 210, 370);
  rect(800, 0, 480, 250);

  //ventana
  fill("#1B1B24");
  rect(810, 0, 470, 240);
  fill("#B2E8EB");
  rect(820, 0, 470, 230);

  //puertas
  drawDoor();
  fill("#995208");
  rect(320, 360, 190, 360);

  //manijas
  fill("#B2CCEB");
  circle(230, 570, 20);
  circle(490, 570, 20);

  //cartel número de salón
  fill("#F2F2F2");
  rect(90, 440, 130, 50, 10);

  textSize(50);
  fill("#143952");
  text("109", 115, 480, -120);

  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
};
