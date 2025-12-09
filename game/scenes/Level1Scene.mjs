import { GameConfig } from "../core/GameConfig.mjs";
import { Player } from "../core/Player.mjs";

import { gameSettings, isColliding, player, SCENES } from "../utils.mjs";

const { LEVEL_1 } = GameConfig.LEVELS;

export const drawStage = (width, height, brick, coinSprite, gameFont) => {
  // Appearance of the game
  background(150, 230, 240);

  // grass
  noStroke();
  fill(100, 200, 75);
  rect(width / 2, height - 50, width, 100);

  // Player;
  player.draw(player.isWalking);
  // image(mario, player.x, player.y, player.width, player.height);

  LEVEL_1.PLATFORMS.forEach((platform) => {
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

  LEVEL_1.COINS.forEach((coin) => {
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
  LEVEL_1.PLATFORMS.forEach((platform) => {
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

  drawExit();

  // ui
  drawUI(gameFont);
};

const drawExit = () => {
  const door = new Player(width - 100, height - 100, 50, 100, "#00ff00");
  fill(door.color);
  rect(door.x, door.y, door.width, door.height);

  if (isColliding(player, door)) {
    gameSettings.stage = SCENES.LEVEL_2;
  }
};

const drawUI = (gameFont) => {
  noStroke();
  fill(0);
  textSize(32);
  textFont(gameFont);

  text(`Lives: ${player.lives}`, width / 9 - 80, 50);

  text(`Score: ${gameSettings.score}`, width / 9, 50);

  text(`Time: ${int(gameSettings.totalTime / 1000)}`, width - 100, 50);
};
