export default class HPBar {
  constructor(ctx, x) {
    this.ctx = ctx;
    this.x = x;
    this.len = 300;
  }

  draw() {
    this.ctx.fillStyle = "green"
    this.ctx.font="12px Acme";
    if (this.len <= 100) {
      this.ctx.fillStyle = "yellow"
    }
    if (this.len <= 50) {
      this.ctx.fillStyle = "red"
    }
    this.ctx.fillRect(this.x,70, this.len, 20);
  }

  hit() {
    this.len -= 10;
  }
}
