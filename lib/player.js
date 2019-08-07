import Input from './input.js';
import Bullet from './bullet.js';


class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.canvasWidth = 1000;
    this.canvasHeight = 500;
    this.keyboard = new Input();
    this.image = new Image();
    this.image.src = './asset/ken_idle.png'
    this.draw = this.draw.bind(this);
    this.keyboard = new Input();
    this.keyboard.movement();
    this.frame = 0;
    this.w = 70;
    this.h = 80;
    this.x = 300;
    this.y = 300;
    this.pass = 0;
    this.speed = 0;
    this.stop = 0;
    this.delay = 5;
    this.bullet = null;
    this.fps = 0;
  }


  fpsControl(fps) {
    this.fps++;
    if (this.fps > fps) {
      this.fps = 0;
      this.frame++;
      if (this.frame >= this.keyboard.maxWidth) {
        this.frame = 0
      }
    }
  }

  draw() {

    this.fpsControl(10);
    this.image.src = this.keyboard.src
    if (this.bullet) {
      this.bullet.draw()
    }
    this.ctx.drawImage(this.image, this.w * this.frame, 0, this.w, this.h, this.x,this.y, this.w * 2, this.h * 2);
  }


  defaultMove() {
    if (this.keyboard.input.LEFT) {
      this.keyboard.maxWidth = 4;
      this.keyboard.xSpeed = -Math.abs(this.keyboard.speed)
      this.keyboard.src = './asset/ken_moving_left.png';
      this.keyboard.direction = "LEFT"
    }
    else if (this.keyboard.input.RIGHT) {
      this.keyboard.maxWidth = 4;
      this.keyboard.xSpeed = Math.abs(this.keyboard.speed)
      this.keyboard.src = './asset/ken_moving.png';
      this.keyboard.direction = "RIGHT"
    }

    else if (this.keyboard.input.ATTACK && this.keyboard.input.SHOOT) {
      this.frame = 0;
      if (this.keyboard.direction === "LEFT") {
        this.bullet = new Bullet(this.ctx, this.x,this.y, "Left");
        this.keyboard.src = './asset/ken_shot_left.png';
      } else {
        this.bullet = new Bullet(this.ctx, this.x,this.y, "Right");
        this.keyboard.src = './asset/ken_shot.png';
      }
      this.keyboard.maxWidth = 2;
      this.delay--;
      if (this.delay <= 0) {
        this.bullet.playSound();
        this.keyboard.input.ATTACK = false;
      }
    }

    else if (this.keyboard.input.ATTACK) {
      this.delay--;
      this.frame = 1;
      if (this.keyboard.direction === "LEFT") {
        this.keyboard.src = './asset/ken_punch_left.png';
      } else {
        this.keyboard.src = './asset/ken_punch.png';
      }
      this.keyboard.maxWidth = 2;
      this.delay--;
      if (this.delay <= 0) {
        this.keyboard.input.ATTACK = false;
      }
    }

    else {
        if (this.keyboard.direction === "LEFT") {
          this.keyboard.src = './asset/ken_idle_left.png';
        } else {
          this.keyboard.src = './asset/ken_idle.png';
        }
        this.keyboard.maxWidth = 3;
        this.delay = 3;
      }
  }
  update(x) {
    // enemy left
    this.defaultMove()
    if (x < this.x && Math.abs(this.x - x) < 100) {
      this.keyboard.input.LEFT = false;
      this.speed = this.stop;
    }
    else if (x > this.x && Math.abs(x - this.x) <= 100) {
      this.keyboard.input.RIGHT = false;
      this.speed = this.stop;
    } else {
      this.speed = this.keyboard.xSpeed;
    }
    this.x += this.speed;

  }



}


export default Player;
