import Input from './input.js';
import Bullet from './bullet.js';


class Player {
  constructor(ctx,x = 300) {
    this.ctx = ctx;
    this.canvasWidth = 1000;
    this.canvasHeight = 500;
    this.keyboard = new Input();
    this.image = new Image();
    this.image.src = './asset/ken_idle.png'
    this.draw = this.draw.bind(this);
    this.keyboard = new Input();
    this.frame = 0;
    this.w = 70;
    this.h = 80;
    this.rw = 140;
    this.rh = 160;
    this.x = x;
    this.y = 300;
    this.dummy = 0;
    this.speed = 0;
    this.stop = 0;
    this.delay = 5;
    this.bullet = null;
    this.fps = 0;
    this.stun = false;
    this.block = false;
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
    if (this.stun) {
      this.w = 50;
      if (this.keyboard.direction === "LEFT") {
        this.image.src = './asset/ken_stunned_right.png';
      } else {
        this.image.src = './asset/ken_stunned.png';
      }
      this.keyboard.maxWidth = 4;
      this.dummy++;
      if (this.dummy === 20) {
        this.stun = false;
        this.dummy = 0;
      }
    }
    else if (this.block) {
      this.w = 50;
      if (this.keyboard.direction === "LEFT") {
        this.image.src = './asset/ken_block_left.png';
      } else {
        this.image.src = './asset/ken_block.png';
      }
      this.keyboard.maxWidth = 0;
      this.dummy++;
      if (this.dummy === 20) {
        this.block = false;
        this.dummy = 0;
      }
    }
    else {
      this.w = 70;
      this.image.src = this.keyboard.src
    }

    if (this.bullet) {
      this.bullet.draw()
    }
    this.ctx.drawImage(this.image, this.w * this.frame, 0, this.w, this.h, this.x,this.y, this.rw, this.rh);
  }


  defaultMove(x, mode) {
    if (mode === "vs") {
      if (this.x > x) {
        this.keyboard.maxWidth = 4;
        this.keyboard.direction = "LEFT"
        this.keyboard.src = './asset/ken_moving_left.png';
        if (this.keyboard.input.LEFT) {
          this.keyboard.xSpeed = -Math.abs(this.keyboard.speed)
        }
        else if (this.keyboard.input.RIGHT) {
          this.keyboard.xSpeed = Math.abs(this.keyboard.speed)
        }
      } else {
        this.keyboard.maxWidth = 4;
        this.keyboard.direction = "RIGHT"
        this.keyboard.src = './asset/ken_moving.png';
        if (this.keyboard.input.LEFT) {
          this.keyboard.xSpeed = -Math.abs(this.keyboard.speed)
        }
        else if (this.keyboard.input.RIGHT) {
          this.keyboard.xSpeed = Math.abs(this.keyboard.speed)
        }
      }
    } else {
      this.keyboard.maxWidth = 4;
      if (this.keyboard.input.LEFT) {
        this.keyboard.xSpeed = -Math.abs(this.keyboard.speed)
        this.keyboard.src = './asset/ken_moving_left.png';
        this.keyboard.direction = "LEFT"
      }
      else if (this.keyboard.input.RIGHT) {
        this.keyboard.xSpeed = Math.abs(this.keyboard.speed)
        this.keyboard.src = './asset/ken_moving.png';
        this.keyboard.direction = "RIGHT"
      }
    }

    if (this.keyboard.input.ATTACK && this.keyboard.input.SHOOT) {
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
      if ((!this.keyboard.input.LEFT && !this.keyboard.input.RIGHT)) {
        if (this.keyboard.direction === "LEFT") {
          this.keyboard.src = './asset/ken_idle_left.png';
        } else {
          this.keyboard.src = './asset/ken_idle.png';
        }
        this.keyboard.maxWidth = 3;
        this.delay = 3;
      }
      }
  }
  update(x, mode) {
    // enemy left
    this.defaultMove(x, mode)
    this.speed = this.keyboard.xSpeed;
    this.x += this.speed;

  }



}


export default Player;
