export default class HPBar {
  constructor(ctx, x,y, len) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.len = len;
    this.fixlen = len;
    this.center = (this.x + this.fixlen)/2
  }

  draw(color="yellow") {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.center,this.y, this.fixlen, 30);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(this.center,this.y, this.len, 30);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.center, this.y, this.fixlen, 30);
  }



  block(d=0.05) {
    this.len -= d
  }
  hit(dmg=1) {
    this.len -= dmg;
  }
}
