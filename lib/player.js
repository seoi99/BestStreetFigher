import Input from './input.js';
import Bullet from './bullet.js';


class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.canvasWidth = 1000;
    this.canvasHeight = 500;
    this.keyboard = new Input();
    this.image = new Image();
    this.draw = this.draw.bind(this);
    this.keyboard = new Input();
    this.keyboard.movement();
    this.frame = 0;
    this.w = 70;
    this.h = 80;
    this.x = 300;
    this.y = 300;
    this.pass = 0;
      this.speed = 75;
    this.flip = 1;
  }

  draw() {
    this.frame++;
    if (this.frame >= this.keyboard.maxWidth) this.frame = 0;
    this.image.src = this.keyboard.src;
    this.ctx.drawImage(this.image, this.w * this.frame, 0, this.w, this.h, this.x,this.y, this.w * 2, this.h * 2);
  }

  update(x) {
    // enemy left
    if (x < this.x && Math.abs(this.x - x) < 100) {
      this.flip = -1;
      this.keyboard.input.LEFT = false;
    }
    if (x > this.x && Math.abs(x - this.x) <= 100) {
      this.flip = 1;
      this.keyboard.input.RIGHT = false;
    }
    if (this.keyboard.input.LEFT) {
      this.x -= this.speed;
      this.flip = -1;
      this.keyboard.input.LEFT = false;
    }
    if (this.keyboard.input.RIGHT) {
      this.flip = 1;
      this.x += this.speed;
      this.keyboard.input.RIGHT = false;
    }
  }



}


export default Player;
