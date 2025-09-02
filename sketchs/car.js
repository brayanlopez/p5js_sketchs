const container = document.getElementById("canvas-container");

let cars = [];

function setup() {
  cnv = createCanvas(container.offsetWidth, container.offsetHeight);
  cnv.parent("canvas-container");
  const carAmount = 20;
  for (let i = 0; i < carAmount; i++) {
    cars.push(
      new Car(width / 8, (i * height) / carAmount, height / (carAmount + 4) + i)
    );
  }
}

function draw() {
  background(255);
  // drawCar(mouseX, mouseY, 200);
  cars.map((car) => drawCar(car.x, car.y, car.size));
  cars.map((car, index) => (car.x += 2 + index));
  cars.forEach((car) => {
    if (car.x > width) {
      car.x = -car.size * 2;
    }
  });
}

const drawCar = (x, y, size) => {
  const CAR_RADIUS = 20;

  // Car body
  stroke(0);
  strokeWeight(1);
  // The origin (x,y) of the car is on the Top Left corner, you can see if by writing: circle(x, y, 1);
  rect(x + size / 2, y, size, size / 2, CAR_RADIUS, CAR_RADIUS, 0, 0);
  rect(x, y + size / 2, size * 2, size / 2, CAR_RADIUS);

  // tires
  stroke(0);
  strokeWeight(5);
  circle(x + size / 2, y + size, size / 3);
  circle(x + size * 1.5, y + size, size / 3);
};

class Car {
  constructor(x, y, size = 100) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
}
