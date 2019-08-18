export default class HPBar {
  constructor(ctx, x) {
    this.ctx = ctx;
    this.x = x;
    this.len = 300;
    this.fixlen = 300;
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x,50, this.fixlen, 30);
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(this.x,50, this.len, 30);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.x, 50, this.fixlen, 30);

  }

  block() {
    this.len -= 5;
  }
  hit() {
    this.len -= 0.01;
  }
}
