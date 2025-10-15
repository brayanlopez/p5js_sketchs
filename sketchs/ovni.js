const container = document.getElementById("canvas-container");

function setup() {
  let cnv = createCanvas(container.offsetWidth, container.offsetHeight);
  cnv.parent("canvas-container");
}

function draw() {
  background(255);
  drawOvni(mouseX, mouseY, 200);
}

function mousePressed() {
  ray(mouseX, mouseY + 20);
}

const drawOvni = (x, y, size) => {
  ellipseMode(CENTER);
  // stars(1000);
  ovni(mouseX, mouseY);
};

function ovni(x, y) {
  //dibujo del platillo
  fill(255);
  ellipse(x, y, 80, 30);
  ellipse(x, y - 10, 20, 20);
  fill(0);
  ellipse(x, y - 4, 5, 5);
  ellipse(x - 15, y - 10, 5, 5);
  ellipse(x + 15, y - 10, 5, 5);
}

function ray(x, y) {
  //al dar un clic el platillo dispare un rayo
  fill(0, 255, 0);
  triangle(x, y, x - 40, height, x + 40, height);
}

// TODO: check this code because is affecting the performance.
function stars(n) {
  //dibujar un número de estrellas
  fill(255);
  ellipseMode(CENTER);
  for (let i = 0; i < n; i++) {
    circle(random(width), random(height), 3);
  }
}
