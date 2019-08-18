
import Sound from './sound.js'

class Bullet {
  constructor(ctx, x, y, dir) {
    this.ctx = ctx;
    this.w = 40;
    this.h = 40;
    this.x =  x + dir * 50
    this.y = y + 35;
    this.speed = dir * 10;
    this.image = new Image();
    this.image.src = dir > 0 ? `./asset/bullet.png` : `./asset/bullet_left.png`;
    this.hit = false;
    this.collide = false;
    this.sound = new Sound();
    this.m = true;
  }

  shoot() {
    this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
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
