const container = document.getElementById("canvas-container");

function setup() {
  let cnv = createCanvas(container.offsetWidth, container.offsetHeight);
  cnv.parent("canvas-container");
}

function draw() {
  background(255);
  ellipseMode(CENTER);
  pineros(mouseX, mouseY);
}

function pineros(x, y) {
  //cuello
  noStroke();
  fill("#FFE8CC");
  rect(x - 8, y - 80, 23, 19, 1);
  //zapatos
  fill(1);
  ellipse(x, y + 86, 22, 7);
  ellipse(x + 25, y + 80, 22, 9);
  //piernas
  strokeWeight(1);
  fill("#3c3c3c");
  rect(x - 12, y + 30, 15, 55, 5);
  rect(x + 16, y + 25, 15, 55, 5);
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
  rect(x + 6, y - 11, 12, 14, 5);
  //brazo cubierto
  pushMatrix();
  translate(x, y);
  rotate(radians(-25));
  fill(255);
  rect(8, -34, 12, 35, 5);
  popMatrix();
  //manga
  fill(255);
  rect(x - 14, y - 64, 27, 30, 10, 10, 0, 0);
}
