export default class HPBar {
  constructor(ctx, x,y, len) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.len = len;
    this.fixlen = len;
    this.center = len/2;
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

  enemyhp(x,y,h) {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(x + this.center, y - 20, this.fixlen, h);
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(x + this.center, y - 20, this.len, h);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x + this.center, y - 20, this.len, h);
  }

  block() {
    this.len -= 0.05;
  }
  hit() {
    this.len -= 1;
  }
}
