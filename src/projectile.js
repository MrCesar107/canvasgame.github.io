export default class Projectile {
  constructor(posX, posY, radius, velocity, color) {
    this.positionX = posX;
    this.positionY = posY;
    this.radius = radius;
    this.velocity = velocity;
    this.color = color;
  }

  update() {
    this.positionX = this.positionX + this.velocity.x;
    this.positionY = this.positionY + this.velocity.y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
