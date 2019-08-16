import Input from './input.js';
import Bullet from './bullet.js';
import Sprite from './sprite.js';
import Sound from './sound.js'

class Player {
  constructor(ctx,x = 300, char, dir) {
    this.ctx = ctx;
    this.canvasWidth = 1000;
    this.canvasHeight = 500;
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
    this.sprite = new Sprite(char);
    this.dir = dir;
    this.block = false;
    this.temp = "";
    this.desc = "";
    this.sound = new Sound();
  }

  fpsControl(fps) {
    this.fps++;
    if (this.desc !== this.temp) {
      this.desc = this.temp;
      this.frame = 0;
    }
    if (this.fps > fps) {
      this.fps = 0;
      this.frame++;
      if (this.frame > this.sprite.maxFrame) {
        this.frame = 0
      }
    }
  }

  draw() {
    this.fpsControl(10);
    if (this.bullet) {
      this.bullet.draw()
    }
    this.ctx.save();
    this.ctx.scale(this.dir,1);
    this.ctx.drawImage(this.sprite.image, this.sprite.w * this.frame, 0, this.sprite.w, this.sprite.h, this.dir * this.x,this.y, this.rw, this.rh);
    this.ctx.restore();
  }

  defaultMove() {
    if (this.keyboard.input.LEFT || this.keyboard.input.RIGHT) {
      this.sprite.update("moving");
      this.temp = "moving";
      if (this.keyboard.input.LEFT) this.speed = -5;
      else if (this.keyboard.input.RIGHT) this.speed = 5
    } else if (this.keyboard.input.ATTACK && this.keyboard.input.SHOOT) {
      this.bullet = new Bullet(this.ctx, this.x,this.y, this.dir);
      this.sprite.update("shot");
      this.temp = "shot"
    } else if (this.keyboard.input.ATTACK) {
      console.log(this.keyboard.m);
      if (this.keyboard.m) {
        this.sound.play('./asset/sound/punch_hit.wav')
      }
      this.sprite.update("punch");
      this.temp = "punch"
    } else if (this.keyboard.input.SHOOT) {
      this.sprite.update("kick");
      this.temp = "kick"
    } else {
      this.sprite.update();
      this.speed = 0;
    }

    // if (mode === "vs") {
    //   if (this.x > x) {
    //     this.keyboard.maxWidth = 4;
    //     this.keyboard.direction = "LEFT"
    //     this.keyboard.src = './asset/ken_moving_left.png';
    //     if (this.keyboard.input.LEFT) {
    //       this.keyboard.xSpeed = -Math.abs(this.keyboard.speed)
    //     }
    //     else if (this.keyboard.input.RIGHT) {
    //       this.keyboard.xSpeed = Math.abs(this.keyboard.speed)
    //     }
    //   } else {
    //     this.keyboard.maxWidth = 4;
    //     this.keyboard.direction = "RIGHT"
    //     this.keyboard.src = './asset/ken_moving.png';
    //     if (this.keyboard.input.LEFT) {
    //       this.keyboard.xSpeed = -Math.abs(this.keyboard.speed)
    //     }
    //     else if (this.keyboard.input.RIGHT) {
    //       this.keyboard.xSpeed = Math.abs(this.keyboard.speed)
    //     }
    //   }
    // } else {
    //   this.keyboard.maxWidth = 4;
    //   if (this.keyboard.input.LEFT) {
    //     this.keyboard.xSpeed = -Math.abs(this.keyboard.speed)
    //     this.keyboard.src = './asset/ken_moving_left.png';
    //     this.keyboard.direction = "LEFT"
    //   }
    //   else if (this.keyboard.input.RIGHT) {
    //     this.keyboard.xSpeed = Math.abs(this.keyboard.speed)
    //     this.keyboard.src = './asset/ken_moving.png';
    //     this.keyboard.direction = "RIGHT"
    //   }
    // }
    //
    // if (this.keyboard.input.ATTACK && this.keyboard.input.SHOOT) {
    //   this.frameChange = true;
    //   if (this.keyboard.direction === "LEFT") {
    //     this.bullet = new Bullet(this.ctx, this.x,this.y, "Left");
    //     this.keyboard.src = './asset/ken_shot_left.png';
    //   } else {

    //   }
    //   this.keyboard.maxWidth = 2;
    //   this.delay--;
    //   if (this.delay <= 0) {
    //     this.bullet.playSound();
    //     this.keyboard.input.ATTACK = false;
    //     this.keyboard.input.SHOOT = false;
    //   }
    // }
    //
    // else if (this.keyboard.input.ATTACK) {
    //   this.sprite.update("punch");
    //   console.log(this.sprite.w, this.sprite.h);
    //   if (this.keyboard.direction === "LEFT") {
    //     this.keyboard.src = './asset/ken_punch_left.png';
    //   } else {
    //     this.keyboard.src = './asset/ken_punch.png';
    //   }
    //   this.keyboard.maxWidth = 2;
    // }
    // else if (this.keyboard.input.SHOOT) {
    //     this.sprite.update("kick");
    //   if (this.keyboard.direction === "LEFT") {
    //     this.keyboard.src = './asset/ken_kick_left.png';
    //   } else {
    //     this.keyboard.src = './asset/ken_kick.png';
    //   }
    //   this.keyboard.maxWidth = 4;
    // }
    // else {
    //   if ((!this.keyboard.input.LEFT && !this.keyboard.input.RIGHT)) {
    //
    //     if (this.keyboard.direction === "LEFT") {
    //       this.keyboard.src = './asset/ken_idle_left.png';
    //     } else {
    //       this.keyboard.src = './asset/ken_idle.png';
    //     }
    //     this.keyboard.maxWidth = 3;
    //     this.delay = 20;
    //   }
    //   }
  }
  update() {
    this.defaultMove();
    this.x += this.speed;

  }



}


export default Player;
