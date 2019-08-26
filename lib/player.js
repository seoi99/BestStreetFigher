import Input from './input.js';
import Bullet from './bullet.js';
import Sprite from './sprite.js';
import Sound from './sound.js'
import Hp from './hpbar.js'

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
    this.delay = 0;
    this.dead = false;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
  }

  fpsControl(fps) {
    this.fps++;
    if (this.desc !== this.temp) {
      this.desc = this.temp;
      this.frame = 0;
    }
    if (this.fps > fps) {
      this.fps = 0;
      if (this.dead) {
        this.frame >= this.sprite.maxFrame? this.frame = this.sprite.maxFrame : this.frame++;
      } else {
        this.frame++;
        if (this.frame > this.sprite.maxFrame) this.frame = 0
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


  updateDir(x) {
    if (this.x < x) {
      this.dir = 1;
      if (this.keyboard.input.LEFT && this.dullMove((x))) this.speed = -this.move
    } else {
      if (this.keyboard.input.RIGHT && this.dullMove((x))) this.speed = this.move;
      this.dir = -1;
    }
  }
  moveAction(x) {
    if (this.keyboard.input.LEFT || this.keyboard.input.RIGHT) {
      if (this.block) {
        this.sprite.update("block");
        this.temp = "block";
        if (this.sControl) {
          this.sound.play('./asset/sound/block.wav');
          this.sControl = false;
        }
        this.move = 0.5;
      }
      else {
        this.sprite.update("moving");
        this.temp = "moving";
        this.move = 5;
        this.sControl = true;
      }
      this.updateDir(x);
      if (this.keyboard.input.LEFT && !(this.dullMove((x)))) this.speed = -this.move;
      else if (this.keyboard.input.RIGHT && !(this.dullMove((x)))) this.speed = this.move
    } else if (this.stun) {
      this.sprite.update("stun");
      this.temp = "stun";
      this.move = 0;
      if (this.frame === this.sprite.maxFrame) {
        this.stun = false;
      }
    }
  }


  specialAction() {
    if (this.keyboard.input.SPECIAL) {
      if (this.keyboard.input.ATTACK && !this.keyboard.input.KICK) {
        this.sprite.update("shot");
        this.temp = "shot";
        if (!this.bullet) {
          this.bullet = new Bullet(this.ctx, this.x, this.y, this.dir);
        }
        if (this.keyboard.input.SHOOT) {
          this.bullet.playSound();
          this.keyboard.input.SHOOT = false;
        }
        this.delay++;
        if (this.delay > 20) {
          this.keyboard.input.SPECIAL = false;
          this.keyboard.input.ATTACK = false;
        }

      } else if (!this.keyboard.input.ATTACK && this.keyboard.input.KICK) {
        this.sprite.update("special_kick");
        this.temp = "special_kick";
        this.delay++;
        this.x += this.dir * 2;
        if (this.delay > 40) {
          this.keyboard.input.SPECIAL = false;
          this.keyboard.input.KICK = false;
        }
      } else {
        this.delay = 0;
        this.keyboard.input.SHOOT = true;
      }
    }
  }


  attackAction() {
    if (this.keyboard.input.ATTACK && !this.stun) {
          this.sprite.update("punch");
          this.temp = "punch";
        } else if (this.keyboard.input.KICK && !this.stun) {
          this.sprite.update("kick");
          this.temp = "kick";
        }
        this.specialAction();
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

  playSound(src) {
    if (this.sControl) {
      this.sound.play(src);
      this.sControl = false;
    }
  }

  meleeSound(enemy) {
    if ((this.keyboard.input.ATTACK || this.keyboard.input.KICK) && !this.keyboard.input.SPECIAL) {
      if (Math.abs(this.x - enemy.x) < 100) {
          this.playSound('./asset/sound/punch_hit.wav');
      } else {
          this.playSound('./asset/sound/punch_miss.wav');
      }
    } else if (this.keyboard.input.KICK && this.keyboard.input.SPECIAL) {
        this.playSound('./asset/sound/s_kick.mp3');
    }
    else {
      this.sControl = true;
    }
  }

  rangeSound(enemy) {
      if (this.bullet) {
      if (Math.abs(this.bullet.x - enemy.x) < 50 || this.bullet.x > 1000 || this.bullet.x < 0) {
        if (this.bControl) {
          this.bControl = false;
        }
        this.bullet.collide = true;
        this.bullet = null;
      } else {
        this.bControl = true;
      }
    }
  }

  soundControl(enemy) {
    this.meleeSound(enemy);
    this.rangeSound(enemy);
  }

  update(enemyX = 0) {
    this.action(enemyX);
    this.borderLimit();
    this.x += this.speed;
    this.gravitySpeed += this.gravity;
    this.y += this.gravitySpeed;
    this.hitBottom();
  }

  hitBottom() {
    let rockbottom = 300;
    if (this.y > rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = 0;
    }
  }

  removePlayer() {
    this.sprite.update("dead");
    this.dead = true;
  }

  win() {
    this.sprite.update("win");
    this.dead = true;
  }
}


export default Player;
