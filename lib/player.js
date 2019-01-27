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
    this.keyboard = new Input();
    this.world = {
      gravity: 0.4, // strength per frame of gravity
      drag: 0.9, // play with this value to change drag
      groundDrag: 0.9, // play with this value to change ground movement
      ground: 200,
    }
    this.x = 200;
    this.y = 0;
    this.bullet = null;
    this.onGround = true;
    this.keyboard.movement();

  }

  mainLoop() {
    this.draw();
    this.update();
  }

  draw() {
    if (this.bullet) {
      this.bullet.draw();
    }
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.w, this.h);
    this.ctx.fillStyle = "#000";
    this.ctx.closePath();
    this.fps++;
    this.image.src = `./asset/robot/${this.anime} (${this.FrameNum}).png`;
    this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    if (this.fps > 5) {

      this.fps = 0;
      this.FrameNum++
      if (this.FrameNum > this.maxFrame) {
        this.FrameNum = 1;
      }
    }
  }


  update() {
    if (this.y >= this.world.ground - this.h) {
      this.y = this.world.ground - this.h;
      this.dy = 0;
      this.onGround = true;
    } else {
      this.onGround = false;
    }

    this.anime = "Idle";

    if (this.keyboard.input.LEFT) {
      this.maxFrame = 8;
      this.anime = "Run";
      this.dx = -this.speed;
    }
    if (this.keyboard.input.RIGHT) {
      this.maxFrame = 8;
      this.anime = "Run";
      this.dx = this.speed;
    }

    if (this.keyboard.input.UP && this.onGround) {
      this.maxFrame = 8;
      this.anime = "Jump";
      this.dy = this.jump;
      this.onGround = false;
    }
    if (!this.onGround) {
      this.anime = "Jump";
    }
    if (this.keyboard.input.A) {
      this.anime = "Melee";
      this.maxFrame = 8;
    }

    if (this.keyboard.input.SPACE) {
      if (this.keyboard.input.LEFT || this.keyboard.input.RIGHT) {
        this.anime = "RunShoot";
        this.maxFrame = 4;
    } else {
      this.anime = "Shoot";
      this.maxFrame = 4;
    }
    if (this.bullet && this.bullet.x < 500) {
    } else {
      this.bullet = new Bullet(this.ctx, this.x, this.y);
    }

  }
    this.dy += this.world.gravity;
    this.dy *= this.world.drag;
    this.dx *= this.onGround ? this.world.groundDrag : this.world.drag;
    this.x += this.dx;
    this.y += this.dy;

  }


  dead() {
      this.anime = "Dead";
      this.maxFrame = 10;
      if (this.FrameNum === 10) {
        this.w = 0;
        this.h = 0;
      }
  }
}


export default Player;
