

class Bullet {
  constructor(ctx) {
    this.ctx = ctx;
    this.w = 20;
    this.h = 20;
    this.x = 200
    this.y = 200
    this.maxRange = 500;
    this.speed = 15;
    this.image = new Image();
    this.FrameNum = 0;
  }

  draw() {
    // this.ctx.drawImage(this.image, this.x, this.y,this.w, this.h);
    // this.ctx.clearRect(0,0,500,500);
    this.x += this.speed;
    // if (this.FrameNum > 4) {
      // this.FrameNum = 0;
    // }
    // this.FrameNum++
    // this.image.src = `./asset/robot/Objects/Bullet_00${this.FrameNum}.png`;

    if (this.x > 500) {
      this.x = 0;
    }
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "#000";
    this.ctx.closePath();
    requestAnimationFrame(this.draw.bind(this))
  }

}

export default Bullet;
