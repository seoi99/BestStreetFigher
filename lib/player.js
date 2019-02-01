import Bullet from './bullet.js';
import Input from './input.js';


class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.image = new Image();
    this.FrameNum = 1;
    this.maxFrame = 10;
    this.fps = 0;
    this.w = 60;
    this.h = 60;
    this.bullet = null;
    this.canvasWidth = 500;
    this.canvasHeight = 500;
    this.anime = "Idle";
    this.dx = 0;
    this.dy = 0;
    this.jump = -10;
    this.speed = 2;
    this.world = {
      gravity: 0.4, // strength per frame of gravity
      drag: 0.9, // play with this value to change drag
      groundDrag: 0.9, // play with this value to change ground movement
      ground: 400,
    }
    this.x = 50;
    this.y = 0;
    this.maxHp = 50;
    this.hp = 50;
    this.bulletLimit = 5;
    this.onGround = true;
    this.keyboard = new Input();
    this.keyboard.movement();
    this.over = false;
    this.drawBullet = this.drawBullet.bind(this);
  }

  mainLoop() {
    this.draw();
    this.update();
  }

  draw() {
    this.hpBar();
    this.drawBullet();
    this.bulletCount();
    this.frame(5);
    this.image.src = `./asset/robot/${this.anime} (${this.FrameNum}).png`;
    this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  frame(max) {
    this.fps++;
    if (this.fps > max) {
      this.fps = 0;
      if (this.FrameNum >= this.maxFrame) {
        this.FrameNum = 1;
      }
      this.FrameNum++
    }
  }

  drawBullet() {
    if (this.bullet) {
      this.bullet.draw();
    }
  }

  move() {
    this.maxFrame = 8;
    if (this.keyboard.input.LEFT) {
      this.anime = "Run";
      this.dx = -this.speed;
    }
    if (this.keyboard.input.RIGHT) {
      this.anime = "Run";
      this.dx = this.speed;
    }
  }


  jumping() {
    this.maxFrame = 8;
    if (this.keyboard.input.UP && this.onGround) {
      this.dy = this.jump;
      this.onGround = false;
    }
    if (!this.onGround) {
      this.anime = "Jump";
    }
  }

  melee() {
    if (this.keyboard.input.A) {
      this.anime = "Melee";
      this.maxFrame = 8;
    }
  }

  range() {
    if (this.bulletLimit <= 0) {
      this.keyboard.input.SPACE = false;
      this.ctx.beginPath();
      this.ctx.fillStyle = "black";
      this.ctx.font="10px Acme";
      this.ctx.fillText(`Out of Bullet`,this.x + 5,this.y - 20);

    }
    if (this.keyboard.input.SPACE) {
      this.bulletLimit--;
      this.keyboard.input.SPACE = false;
      if (this.keyboard.input.LEFT || this.keyboard.input.RIGHT) {
        this.maxFrame = 8;
        this.anime = "RunShoot";
    } else {
      this.resetFrame();
      this.maxFrame = 4;
      this.anime = "Shoot";
    }
      this.bullet = new Bullet(this.ctx, this.x, this.y);
    }
  }
  resetFrame() {
    this.FrameNum = 1
  }
  gravity() {
    // if height of char on ground level
    if (this.y >= this.world.ground - this.h) {
      this.y = this.world.ground - this.h;
      this.dy = 0;
      this.onGround = true;
    }
    // else
    else {
      this.onGround = false;
    }

  }

  update() {
    this.anime = "Idle";
    this.gravity();
    this.move();
    this.melee();
    this.range();
    this.jumping();
    // we pull char to ground
    this.dy += this.world.gravity;
    // dragging power
    this.dy *= this.world.drag;
    // if on ground gravity on x
    this.dx *= this.onGround ? this.world.groundDrag : this.world.drag;
    // x speed based on key movement left / right
    this.x += this.dx;
    this.y += this.dy;
  }

  hpBar() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.x + (this.w - this.maxHp)/2,this.y - 10, this.hp ,3);
    this.ctx.font="30px Acme";
    this.ctx.closePath();
  }
  bulletCount() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.font="20px Acme";
    this.ctx.fillText(`Bullet: ${this.bulletLimit}`,20,20);
  }
  dead() {
    if (this.hp <= 0) {
      this.hp = 0;
      this.anime = "Dead";
      this.maxFrame = 10;
      if (this.FrameNum === this.maxFrame - 1) {
        this.over = true;
      }
    }
  }
}


export default Player;
