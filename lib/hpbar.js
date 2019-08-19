export default class HPBar {
  constructor(ctx, x,y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
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

  enemyhp(x,y,h) {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(x, y - 20, this.fixlen/4, h);
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(x, y - 20, this.len/4, h);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y - 20, this.len/4, h);
  }

  block() {
    this.len -= 0.05;
  }
  hit() {
    this.len -= 1;
  }
}
