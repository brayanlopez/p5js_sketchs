export const drawPlayer = (x = mouseX, y = mouseY, isWalking = false) => {
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
  if (isWalking) {
    // Walking animation - rotated arm like in test.js
    push();
    translate(x, y);
    rotate(radians(-25));
    fill(255);
    rect(8, -34, 12, 35, 5);
    pop();
  } else {
    // Static arm
    fill(255);
    rect(x - 4, y - 37, 12, 35, 5);
  }

  //manga
  fill(255);
  rect(x - 12, y - 64, 27, 30, 10, 10, 0, 0);

  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
};

export const drawSpaceship = (x, y, w, h) => {
  push(); // Save current drawing state

  // Main body (sleek gray hull)
  fill(180, 190, 200);
  stroke(100, 110, 120);
  strokeWeight(2);

  // Draw main triangular body
  triangle(x, y - h / 2, x - w / 2, y + h / 2, x + w / 2, y + h / 2);

  // Cockpit window (glowing blue)
  fill(100, 200, 255, 200);
  noStroke();
  ellipse(x, y, w * 0.4, h * 0.3);

  // Cockpit highlight (reflection)
  fill(200, 230, 255, 150);
  ellipse(x - w * 0.08, y - h * 0.05, w * 0.15, h * 0.1);

  // Wings
  fill(150, 160, 170);
  stroke(100, 110, 120);
  strokeWeight(2);

  // Left wing
  triangle(
    x - w / 2,
    y + h / 4,
    x - w / 2 - 15,
    y + h / 2,
    x - w / 2,
    y + h / 2
  );

  // Right wing
  triangle(
    x + w / 2,
    y + h / 4,
    x + w / 2 + 15,
    y + h / 2,
    x + w / 2,
    y + h / 2
  );

  // Engine thrusters (3 of them)
  fill(80, 90, 100);
  noStroke();
  rect(x - w / 3, y + h / 2 - 5, w / 6, 8);
  rect(x + w / 6, y + h / 2 - 5, w / 6, 8);
  rect(x - w / 12, y + h / 2 - 5, w / 6, 8);

  // Engine glow/flames (optional - looks cool when moving)
  fill(255, 150, 0, 200);
  ellipse(x - w / 4, y + h / 2 + 2, 8, 12);
  ellipse(x + w / 4, y + h / 2 + 2, 8, 12);
  ellipse(x, y + h / 2 + 2, 8, 12);

  fill(255, 200, 50, 150);
};
