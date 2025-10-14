import {
  coins,
  gameSettings,
  isColliding,
  platforms,
  Player,
  player,
  SCENES,
} from "./utils.mjs";

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
};

export const drawPlayer = (x = mouseX, y = mouseY) => {
  rectMode(CORNER);
  textAlign(CORNER);
  imageMode(CORNER);
  ellipseMode(CENTER);

  //cuello
  noStroke();
  fill("#FFE8CC");
  rect(x - 8, y - 80, 23, 19, 1);

  //zapatos
  fill(1);
  ellipse(x, y + 86, 22, 7);
  ellipse(x + 16, y + 86, 22, 9);

  //piernas
  stroke(1);
  fill("#3c3c3c");
  rect(x - 9, y + 30, 15, 55, 5);
  rect(x, y + 30, 15, 55, 5);

  //torzo
  fill(0);
  noStroke();
  ellipse(x, y - 22, 64, 103);
  ellipse(x, y, 80, 100);

  //gorra
  fill("#014BA0");
  ellipse(x + 5, y - 145, 60, 65);
  ellipse(x + 40, y - 145, 50, 23);
  fill(255);
  ellipse(x + 47, y - 147, 33, 9);

  //cabeza
  noStroke();
  fill("#FFE8CC");
  ellipse(x + 45, y - 113, 18, 12);
  ellipse(x + 7, y - 113, 70, 70);

  //cabello
  fill("#834f23");
  rect(x - 26, y - 135, 17, 22, 3);

  //barba
  fill("#834f23");
  rect(x + 25, y - 110, 17, 5, 3);
  rect(x + 25, y - 109, 5, 13, 3);
  rect(x + 25, y - 98, 12, 9, 2);

  //gafas
  fill(0);
  rect(x + 5, y - 120, 38, 3, 1);
  rect(x + 40, y - 124, 3, 10, 1);

  //gorra
  fill("#014BA0");
  ellipse(x + 5, y - 139, 60, 32);

  //brazo
  fill("#FFE8CC");
  rect(x - 4, y - 6, 13, 15, 5);

  //brazo cubierto
  fill(255);
  rect(x - 4, y - 37, 12, 35, 5);

  //manga
  fill(255);
  rect(x - 12, y - 64, 27, 30, 10, 10, 0, 0);

  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
};

export const drawStage = (
  width,
  height,
  mario,
  brick,
  coinSprite,
  gameFont
) => {
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
  image(mario, player.x, player.y, player.width, player.height);

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
  const enemy = new Player((width * 2) / 3, height - 100, 50, 50, "#ff0000");
  fill(enemy.color);
  rect(enemy.x, enemy.y, enemy.width, enemy.height);
  if (isColliding(player, enemy)) {
    player.lives--;
    player.resetPosition();
  }
  if (player.lives === 0) {
    gameSettings.stage = SCENES.GAME_OVER;
  }

  const door = new Player(width - 100, height - 100, 50, 100, "#00ff00");
  fill(door.color);
  rect(door.x, door.y, door.width, door.height);

  if (isColliding(player, door)) {
    gameSettings.stage = SCENES.LEVEL_2;
  }

  // ui
  noStroke();
  fill(0);
  textSize(32);
  textFont(gameFont);

  text(`Lives: ${player.lives}`, width / 9 - 80, 50);

  text(`Score: ${gameSettings.score}`, width / 9, 50);

  text(`Time: ${int(gameSettings.totalTime / 1000)}`, width - 100, 50);
};
