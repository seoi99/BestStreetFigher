import Sprite from './sprite.js';

export default class Enemy {
  constructor(x, ctx) {
      this.x = x;
      this.ctx = ctx;
      this.rw = 140;
      this.rh = 160;
      this.y = 300;
      this.alive = true;
      this.frame = 0;
      this.transparent = 1;
      this.fps = 0;
      this.dir = 1;
      this.sprite = new Sprite('ryu');
  }

  fpsControl(fps) {
    this.fps++;
    if (this.fps > fps) {
      this.fps = 0;
      this.frame++;
      if (this.frame >= this.sprite.maxFrame) this.frame = 0;
    }
  }

  setup(x) {
      this.fpsControl(10);
      this.ctx.save();
      this.ctx.scale(this.dir,1);
      this.ctx.drawImage(this.sprite.image, this.sprite.w * this.frame, 0, this.sprite.w, this.sprite.h, this.dir * this.x,this.y, this.dir * this.rw, this.rh);
      this.ctx.restore();
  }

  dead(x) {
    this.fpsControl(10);
    this.ctx.save();
    this.ctx.globalAlpha = this.transparent;
    this.transparent -= 0.1;
    this.ctx.restore();
  }

  update(x) {
          if(Math.abs(this.x - x) < 100) {
              this.sprite.update("punch");
          }
          else if (this.x > x) {
              this.x--;
              this.sprite.update("moving");
          } else if (this.x < x) {
              this.x++;
              this.sprite.update("moving");
          }
  }
  draw(x) {
  if (x > this.x) {
      this.dir = 1
  } else {
      this.dir = -1
  }
    if (this.alive) {
      this.setup(x);
        this.update(x);
    } else {
      this.dead(x)
    }
  }


}
