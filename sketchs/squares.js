const container = document.getElementById("canvas-container");

let primaryColor = "#000";
let secondaryColor = "#fff";

class Square {
  constructor(x, y, status, width, height) {
    this.x = x;
    this.y = y;
    this.status = status;
    this.height = height;
    this.width = width;
  }

  toggleStatus() {
    this.status = this.status === "filled" ? "outlined" : "filled";
  }

  draw() {
    // noStroke();
    fill(this.status === "filled" ? primaryColor : secondaryColor);
    rect(this.x, this.y, this.width, this.height);
  }
}

let rows = 2;
let cols = 2;
let matrixSquares = Array.from({ length: rows }, () => Array(cols));

function setup() {
  cnv = createCanvas(container.offsetWidth, container.offsetHeight);
  cnv.parent("canvas-container");
  background("#000");
  createSquares();
}

function draw() {
  // Only redraw squares that changed (see mouseDragged)
  // For now, draw all for simplicity, but can optimize further
  drawSquares();

  fill(primaryColor);
  frameCount < 200 &&
    text(
      " Click sobre los cuadros \n Oprime 0-5 para cambiar cuadros \n 6-9 para colores",
      width / 20,
      height / 10
    );
}

function mousePressed() {
  const col = Math.floor(mouseX / (width / cols));
  const row = Math.floor(mouseY / (height / rows));
  if (
    row >= 0 &&
    row < rows &&
    col >= 0 &&
    col < cols &&
    matrixSquares[row][col]
  ) {
    matrixSquares[row][col].toggleStatus();
    // Only redraw the affected square
    matrixSquares[row][col].draw();
  }
}

function keyPressed() {
  keyIsNumber = /\d/.test(key);

  if (keyIsNumber && parseInt(key) < 6) {
    rows = 2 ** parseInt(key);
    cols = 2 ** parseInt(key);
    createSquares();
  } else if (keyIsNumber) {
    if (key == 6) primaryColor = "#f00";
    if (key == 7) primaryColor = "#0f0";
    if (key == 8) primaryColor = "#00f";
    if (key == 9) primaryColor = "#000";
  }
}

const createSquares = () => {
  matrixSquares = Array.from({ length: rows }, () => Array(cols));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const square = new Square(
        (j * width) / cols,
        (i * height) / rows,
        "outlined",
        width / cols,
        height / rows
      );
      matrixSquares[i][j] = square;
    }
  }
};

const drawSquares = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      matrixSquares[i][j].draw();
    }
  }
};
