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
      this.attack = false;
      this.counter = 0;
      this.sprite = new Sprite('ryu');
      this.aType = ['punch', 'kick', 'special_kick'];
      this.currentAttack = "kick";
      this.dull = false;
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

  block() {
      this.sprite.update("block");
  }
  stun() {
      this.sprite.update("stun");
  }
  shot() {
      this.sprite.update("shot");
  }

  toggleStatus(maxTime, type) {
      if (this.counter > maxTime) {
          if (type === "attack") {
              this.attack = !this.attack;
          } else if (type === "move"){
              this.dull = false;
          }
          this.counter = 0;
      }
  }

  updateAttackSprite() {
      const idx = Math.floor(Math.random() * 3);
      this.currentAttack = this.aType[idx];
  }

  update(x) {
      if (this.attack && !this.dull) {
          this.sprite.update(`${this.currentAttack}`);
      }
      else if (this.x > x && !this.dull) {
          if (Math.abs(this.x - x) > 100) this.x--;
          this.sprite.update("moving");
      } else if (this.x < x && !this.dull) {
          if (Math.abs(this.x - x) > 100) this.x++;
          this.sprite.update("moving");
      }
      if (this.dull) {
          this.sprite.update("stun");
          this.counter++;
          this.toggleStatus(50,"move")
      }
  }

  updateDir(x) {
      if (x > this.x) this.dir = 1;
      else this.dir = -1;
  }
    draw(x) {
        this.updateDir(x);
        if (this.alive) {
            this.setup(x);
            this.update(x);
        } else {
            this.dead(x)
        }
    }


}
