const container = document.getElementById("canvas-container");

let image,
  shouldRotate = false;

function setup() {
  let cnv = createCanvas(container.offsetWidth, container.offsetHeight, WEBGL);
  cnv.parent("canvas-container");
  image = loadImage("./sketchs/NRauch_Das_Messen.jpg ");
}

function draw() {
  background(255);
  const length = 4;
  // translate(-width / 2, -height / 2);
  // rotateZ(frameCount * 0.01);
  // rotateX(frameCount * 0.01);
  shouldRotate && rotateY(frameCount * 0.015);
  texture(image);
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      rect(
        (i * width) / length,
        (j * height) / length,
        width / length,
        height / length
      );
    }
  }
}

function mousePressed() {
  // Toggle the rotation flag: if true, set to false; if false, set to true.
  shouldRotate = !shouldRotate;

  // Return false to prevent any default browser behavior (optional)
  return false;
}
