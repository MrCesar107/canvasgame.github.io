export default class Particle {
  constructor(posX, posY, radius, color, velocity) {
    this.positionX = posX;
    this.positionY = posY;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
    this.friction = 0.99;
  }

  update(ctx) {
    this.draw(ctx);
    this.positionX = this.positionX + this.velocity.x;
    this.positionY = this.positionY + this.velocity.y;
    this.alpha -= 0.01;
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
