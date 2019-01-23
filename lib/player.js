import Bullet from './bullet.js';

// key Control
const input = {
    LEFT: false,
    RIGHT: false,
    UP: false,
    DOWN: false,
    SPACE: false,
    A: false,
  }

document.addEventListener("keydown", e => {
  const key = e.keyCode;
  switch (key) {
    case 37: input.LEFT = true; break;
    case 38: input.UP = true; break;
    case 39: input.RIGHT = true; break;
    case 40: input.DOWN = true; break;
    case 65: input.A = true; break;
    case 32: input.SPACE = true; break;
    default: return false;
}})



document.addEventListener("keyup", e => {
  const key = e.keyCode;
  switch (key) {
    case 37: input.LEFT = false; break;
    case 38: input.UP = false; break;
    case 39: input.RIGHT = false; break;
    case 40: input.DOWN = false; break;
    case 65: input.A = false; break;
    case 32: input.SPACE = false; break;
    default: return false;
  }})


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
      gravity: 0.2, // strength per frame of gravity
      drag: 0.9, // play with this value to change drag
      groundDrag: 0.9, // play with this value to change ground movement
      ground: 200,
    }
    this.x = 200;
    this.y = 0;
    this.onGround = true;

  }

  action() {
    this.draw();
    this.movingAction();
  }

  draw() {
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


  movingAction() {
    if (this.y >= this.world.ground - this.h) {
      this.y = this.world.ground - this.h;
      this.dy = 0;
      this.onGround = true;
    } else {
      this.onGround = false;
    }

    this.anime = "Idle";

    if (input.LEFT) {
      this.maxFrame = 8;
      this.anime = "Run";
      this.dx = -this.speed;
    }
    if (input.RIGHT) {
      this.maxFrame = 8;
      this.anime = "Run";
      this.dx = this.speed;
    }

    if (input.UP && this.onGround) {
      this.maxFrame = 10;
      this.anime = "Jump";
      this.dy = this.jump;
      this.onGround = false;
    }
    if (input.A) {
      this.anime = "Melee";
      this.maxFrame = 8;
    }

    if (input.SPACE) {
      if (input.LEFT || input.RIGHT) {
        this.anime = "RunShoot";
        this.maxFrame = 8;
    } else {
      this.anime = "Shoot";
      this.maxFrame = 4;
    }

    input.SPACE = false;
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
