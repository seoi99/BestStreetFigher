

class Bullet {
  constructor(ctx, Playerx, Playery) {
    this.ctx = ctx;
    this.w = 20;
    this.h = 20;
    this.Playerx = Playerx + this.w;
    this.Playery = Playery + this.h;
    this.maxRange = 500;
    this.speed = 10;
    this.image = new Image();
    this.FrameNum = 0;
  }

  fireBullet() {
    this.image.src = `./asset/robot/Objects/Bullet_00${this.FrameNum}.png`;
    if (this.FrameNum > 5) {
      this.FrameNum = 0;
    }
    this.ctx.beginPath();
    this.ctx.drawImage(this.image, this.Playerx, this.Playery,this.w, this.h);
    this.ctx.closePath();
    this.Playerx += this.speed;
    requestAnimationFrame(this.fireBullet.bind(this));
  }

}

export default Bullet;
