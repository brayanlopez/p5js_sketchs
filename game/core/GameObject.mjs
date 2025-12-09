export class GameObject {
  constructor(x, y, width, height, color, status = "active") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.status = status;
  }
}
