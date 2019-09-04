export default class HPBar {
  constructor(ctx, x,y, len) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.len = len;
    this.fixlen = len;
    this.center = (this.x + this.fixlen)/2
    this.arr = [this.center, this.center + 40];
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


  winCount(c) {
    this.arr.forEach((x, i) => {
      this.ctx.beginPath();
      this.ctx.arc(x, this.y + 60, 10, 0, 2 * Math.PI);
      if (i < c) {
        this.ctx.fillStyle = "green";
        this.ctx.fill();
      } else {
        this.ctx.fillStyle = "none";
      }
      this.ctx.stroke();
    })
  }

  block(d=0.05) {
    this.len -= d;
  }
  hit(dmg=1) {
    this.len -= dmg;
  }
}
