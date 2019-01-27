

class Bullet {
  constructor(ctx, x ,y ) {
    this.ctx = ctx;
    this.w = 20;
    this.h = 20;
    this.x = x;
    this.y = y + this.h;
    this.dx = 0;
    this.maxRange = 500;
    this.speed = 15;
    this.image = new Image();
    this.FrameNum = 0;
    this.fps = 0;
  }

  draw() {
    this.x += this.speed;
    this.fps = 0;
    this.image.src = `./asset/robot/Objects/Bullet_00${this.FrameNum}.png`;
    this.ctx.drawImage(this.image, this.x, this.y,this.w, this.h);
    if (this.FrameNum > 3) {
      this.FrameNum = 0;
    }
    this.FrameNum++
  }

}

export default Bullet;
