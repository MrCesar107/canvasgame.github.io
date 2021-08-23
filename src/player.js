export default class Player {
  constructor(posX, posY, radius, color) {
    this.positionX = posX;
    this.positionY = posY;
    this.radius = radius;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
