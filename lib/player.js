import Bullet from './bullet.js';

class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.image = new Image();
    this.FrameNum = 1;
    this.maxFrame = 10;
    this.fps = 0;
    this.w = 60;
    this.h = 60;
    this.canvasWidth = 500;
    this.canvasHeight = 500;
    this.x = 200;
    this.y = 200;
    this.anime = "Idle";
    this.dx = 5;
    this.dy = 5;
    this.run = false;
    this.jump = true;
  }

  draw() {
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
    // on key pressed
    document.addEventListener("keydown", (e) => {
      // left
      if (e.keyCode === 37) {
        this.anime = "Run";
        this.run = true;
        this.dx = -Math.abs(this.dx)
        this.x += this.dx;
        this.maxFrame = 8;
      }
      //right
      else if (e.keyCode === 39) {
        this.anime = "Run";
        this.dx = Math.abs(this.dx)
        this.run = true;
        this.x += this.dx;
        this.maxFrame = 8;
      }
      // up/jump
      else if (e.keyCode === 38 && this.jump) {
        this.anime = "Jump";
        this.maxFrame = 10;
        this.jump = false;
        this.y = 150;
      }
      // jump and go back to origin position ASAP
      else if (e.keyCode === 38 && !this.jump) {
        this.y = 200;
        this.anime = "Idle";
      }

      else if (e.keyCode === 40) {
        this.anime = "Slide";
        this.maxFrame = 10;
        // this.anime = "Idle"
      }
      // melee attack "A"
      else if (e.keyCode === 65) {
        this.fps += 1;
        this.anime = "Melee";
        this.maxFrame = 8;
      }
      // range attack "Space" and not running
      else if (e.keyCode === 32 && !this.run) {
        this.anime = "Shoot";
        this.maxFrame = 4;
      }

      // run and shot
      else if(e.keyCode === 32 && this.run) {
          this.anime = "RunShoot";
          this.maxFrame = 9;
        }
    })
    document.addEventListener("keyup", (e) => {
      this.anime = "Idle";
      if (e.keyCode === 38) {
        this.y = 200;
        this.jump = true;
      }
      // released left or right key
      else if (e.keyCode === 37 || e.keyCode === 39) {
        this.run = false;
      }
      // released on space (shoot)
      else if (e.keyCode === 32) {
        const bullet = new Bullet(this.ctx, this.x, this.y);
        bullet.fireBullet();
        if (this.run) {
          this.anime = "RunShoot";
        } else {
          this.anime = "Idle"
        }
      }

    })

  }


  dead() {
      this.anime = "Dead";
      this.FrameNum = 0;
      this.FrameNum++;
    if (this.FrameNum === 10) {
      this.w = 0;
      this.h = 0;
    }
  }
}


export default Player;
