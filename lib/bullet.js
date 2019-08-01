
import Sound from './sound.js'

class Bullet {
  constructor(ctx, x ,y ) {
    this.ctx = ctx;
    this.w = 40;
    this.h = 40;
    this.x = x + this.w + 80;
    this.y = y + 35;
    this.dx = 0;
    this.maxRange = 1000;
    this.speed = 25;
    this.image = new Image();
    this.image.src = `./asset/bullet.png`;
    this.hit = false;
    this.collide = false;
    this.sound = new Sound();
  }

  shoot() {
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
