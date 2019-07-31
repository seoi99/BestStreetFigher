
export default class Enemy {
  constructor(x, ctx) {
      this.x = x;
      this.ctx = ctx;
      this.imageW = 50;
      this.w = 140;
      this.h = 160;
      this.y = 300;
      this.image = new Image();
      this.alive = true;
      this.maxFrame = 3;
      this.frame = 0;
      this.transparent = 1;
  }


  setup(x) {
    if (x < this.x) {
      this.image.src = "./asset/ryu_idle_right.png";
    } else {
      this.image.src = "./asset/ryu_idle_left.png";
    }
    this.frame++
    if (this.frame >= this.maxFrame) this.frame = 0;
    this.ctx.drawImage(this.image,this.frame * this.imageW, 0 , this.imageW, 90, this.x, this.y, this.w, this.h);
  }

  comboText() {
    this.ctx.font="20px Acme";
    this.ctx.fillStyle = "black"
    this.ctx.textAlign = "center"
    this.ctx.fillText(`Hit!`,this.x,this.y - 50);
    this.firsthit = true;
  }
  dead(x) {
    this.ctx.save()
    this.ctx.globalAlpha = this.transparent;
    this.transparent -= 0.1;
    this.comboText();
    if (x < this.x) {
      this.image.src = "./asset/ryu_stuned_right.png";
    } else {
      this.image.src = "./asset/ryu_stuned_left.png";
    }
    if (this.frame >= this.maxFrame - 1) this.frame = 0;
    this.ctx.drawImage(this.image,this.frame * this.imageW, 0 , this.imageW, 90, this.x, this.y, this.w, this.h);
    this.ctx.restore();
  }
  draw(x) {
    if (this.alive) {
      this.setup(x)
    } else {
      this.dead(x)
    }
  }


}
