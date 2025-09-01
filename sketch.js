const body = document.getElementsByTagName("body")[0];

let sunHeight = 0;
let redVal = 0;
let greenVal = 0;

function setup() {
  cnv = createCanvas(body.offsetWidth, body.offsetHeight);
}

function draw() {
  background(redVal, greenVal, 0);

  drawSun();
  drawMountains();
  animationLogic();
}

function keyPressed() {
  saveImage();
}

/**
 * Save the image with different options when the user presses a key.
 */
function saveImage() {
  if (key === "s") {
    save(cnv);
  }
  //  else if (key === "j") {
  //   img.save("rockies.jpg");
  // } else if (key === "p") {
  //   img.save("rockies", "png");
  // }
}

const drawSun = () => {
  fill(255, 135, 5, 60);
  circle(width / 2, height * 0.9, sunHeight);
  fill(255, 100, 0, 100);
  circle(width / 2, height * 0.9, sunHeight - 40);
};

const drawMountains = () => {
  fill(110, 50, 18);
  triangle(
    width * 0.3,
    height,
    width * 0.85,
    height * 0.6,
    width * 1.3,
    height
  );
  fill(110, 95, 20);
  triangle(width * 0.3, height, width * 0.85, height * 0.6, 350, height);

  fill(150, 75, 0);
  triangle(-width / 6, height, width / 4, height / 2, height, height);
  fill(100, 50, 12);
  triangle(-width / 6, height, width / 4, height / 2, 0, height);

  fill(150, 100, 0);
  triangle(width / 3, height, width / 2, (height * 5) / 8, width * 1.3, height);
  fill(120, 80, 50);
  triangle(width / 3, height, width / 2, (height * 5) / 8, width / 2, height);
};

const animationLogic = () => {
  if (keyIsPressed && key === "ArrowUp") {
    sunHeight += 10;
    if (sunHeight < 480) {
      redVal += 4;
      greenVal += 1;
    }
  } else if (keyIsPressed && key === "ArrowDown" && sunHeight > 0) {
    sunHeight -= 10;
    redVal -= 4;
    greenVal -= 1;
  } else if (sunHeight == 0) {
    redVal = 0;
    greenVal = 0;
  }
};
