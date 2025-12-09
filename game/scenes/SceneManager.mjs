/**
 * @description Splash screen of the game
 */
export const splashScreen = (gameFont) => {
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

export const winScreen = () => {
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

export const gameOverScreen = () => {
  // Title
  textFont(gameFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(200);
  text("You Lose", width / 2, height / 2);
};
