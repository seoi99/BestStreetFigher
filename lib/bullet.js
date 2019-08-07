
import Sound from './sound.js'

class Bullet {
  constructor(ctx, x ,y, dir) {
    this.ctx = ctx;
    this.w = 40;
    this.h = 40;
    this.y = y + 35;
    this.dx = 0;
    this.maxRange = 1000;
    this.speed = 25;
    this.image = new Image();
    this.hit = false;
    this.collide = false;
    this.sound = new Sound();
    this.dir = dir;
    if (this.dir === "Left") {
      this.x = x + this.w - 80;
    } else {
      this.x = x + this.w + 80;
    }
  }

  shoot() {
    if (this.dir === "Left") {
      this.image.src = `./asset/bullet_left.png`;
      this.speed = -Math.abs(this.speed)
    } else {
      this.image.src = `./asset/bullet.png`;
      this.speed = Math.abs(this.speed)
    }
    this.ctx.drawImage(this.image, this.x + this.speed, this.y,this.w, this.h);
    this.x += this.speed;
  }

  playSound() {
    this.sound.play('./asset/sound/hadouken.mp3');
  }

  draw() {
    if (!this.collide) {
      this.shoot()
    }
  }

}

export default Bullet;
