import { Sprite } from './character.js';
import Input from './input.js';


class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.canvasWidth = 1000;
    this.canvasHeight = 1000;
    this.keyboard = new Input();
    this.speed = 1;
    this.maxFPS = 5;
    this.world = {
      gravity: 0.66, // strength per frame of gravity
      drag: 0.8, // play with this value to change drag
      groundDrag: 0.9, // play with this value to change ground movement
      ground: 200,
    }
    this.onGround = true;
    this.image = new Image();
    this.image.src = './asset/ken_sprite.png';
    this.draw = this.draw.bind(this);
    this.keyboard = new Input();
    this.keyboard.movement();
    this.frame = 0;
    this.w = 70;
    this.h = 80;
    this.x = 300;
    this.y = 300;

  }

  draw() {
    this.ctx.clearRect(0,0,1000,1000);
    this.frame++;
    if (this.frame >= this.keyboard.maxWidth) this.frame = 0;
    this.ctx.drawImage(this.image, this.w * this.frame, this.keyboard.height * this.h, this.w, this.h, this.x/2, this.y, this.w, this.h);
  }



  update() {
    this.x += this.keyboard.xSpeed;
  }
}


export default Player;
