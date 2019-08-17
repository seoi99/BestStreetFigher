import Input from './input.js';
import Bullet from './bullet.js';
import Sprite from './sprite.js';
import Sound from './sound.js'

class Player {
  constructor(ctx,x = 300, char, dir) {
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
    this.keyboard = new Input();
    this.frame = 0;
    this.rw = 140;
    this.rh = 160;
    this.x = x;
    this.y = 300;
    this.speed = 0;
    this.stop = 0;
    this.move = 5;
    this.bullet = null;
    this.fps = 0;
    this.stun = false;
    this.block = false;
    this.sprite = new Sprite(char);
    this.dir = dir;
    this.temp = "";
    this.desc = "";
    this.sControl = true;
    this.bControl = true;
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
    this.ctx.drawImage(this.sprite.image, this.sprite.w * this.frame, 0, this.sprite.w, this.sprite.h, this.dir * this.x,this.y, this.dir * this.rw, this.rh);
    this.ctx.restore();
  }


  moveAction(x) {
    if (this.keyboard.input.LEFT || this.keyboard.input.RIGHT) {
      if (this.block) {
        this.sprite.update("block");
        this.temp = "block";
        this.block = false;
        this.move = 1;
      } else {
        this.sprite.update("moving");
        this.temp = "moving";
        this.move = 5;
      }

      if (this.keyboard.input.LEFT || this.keyboard.input.RIGHT) {
        if (this.x < x) {
          this.dir = 1;


          if (this.dullMove(x)) {
            if (this.keyboard.input.LEFT) {
              console.log("hit");
              this.speed = -this.move
            }
          }
        } else {
          this.dir = -1;
          if (this.dullMove(x)) {
            if (this.keyboard.input.RIGHT) {
              console.log("hit");
              this.speed = this.move
            }
          }
        }
      }
      if (this.keyboard.input.LEFT && !(this.dullMove((x)))) this.speed = -this.move
      else if (this.keyboard.input.RIGHT && !(this.dullMove((x)))) this.speed = this.move
    }
  }

  attackAction() {
    if (this.keyboard.input.ATTACK && this.keyboard.input.SHOOT) {
      this.bullet = new Bullet(this.ctx, this.x,this.y, this.dir);
      this.sprite.update("shot");
      this.temp = "shot"
    } else if (this.keyboard.input.ATTACK) {
      this.sprite.update("punch");
      this.temp = "punch"
    } else if (this.keyboard.input.SHOOT) {
      this.sprite.update("kick");
      this.temp = "kick"
    } else if (this.stun) {
      this.sprite.update("stun");
      this.temp = "stun";
      this.move = 0;
      this.stun = false;
    }
  }
  action(enemyX) {
    this.sprite.update();
    this.speed = this.stop;
    this.moveAction(enemyX);
    this.attackAction();

  }

  dullMove(enemyX) {
    return Math.abs(this.x - enemyX) < 90
  }
  borderLimit() {
    if (this.x > 875) {
      if (this.keyboard.input.LEFT) {
        this.speed = -this.move
      } else {
        this.speed = 0;
      }
    }
    if (this.x < 0) {
      if (this.keyboard.input.RIGHT) {
        this.speed = this.move
      } else {
        this.speed = 0;
      }
    }
  }
  meleeAttack(enemy) {
    if (this.keyboard.input.ATTACK || this.keyboard.input.SHOOT) {
      if (Math.abs(this.x - enemy.x) < 100) {
        if (this.sControl) {
          this.sound.play('./asset/sound/punch_hit.wav');
          this.sControl = false;
        }
      } else {
        if (this.sControl) {
          this.sound.play('./asset/sound/punch_miss.wav');
          this.sControl = false;
        }
      }
    } else {
      this.sControl = true;
    }
  }

  rangeAttack(enemy) {
    if (this.bullet) {
      if (Math.abs(this.bullet.x - enemy.x) < 50) {
        if (this.bControl) {
          this.sound.play('./asset/sound/punch_hit.wav');
          this.bControl = false;
        }
        this.bullet.collide = true;
        this.bullet = null;
      } else {
        this.bControl = true;
      }
    }
  }

  update(enemyX = 0) {
    this.action(enemyX);
    this.borderLimit();
    this.x += this.speed;

  }



}


export default Player;
