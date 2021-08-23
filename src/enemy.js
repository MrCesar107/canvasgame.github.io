export default class Enemy {
  constructor(posX, posY, radius, color, velocity) {
    this.positionX = posX;
    this.positionY = posY;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.positionX += this.velocity.x;
    this.positionY += this.velocity.y;
  }
}
