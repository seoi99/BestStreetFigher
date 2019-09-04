import Input from './input.js';
import Bullet from './bullet.js';
import Sprite from './sprite.js';
import Sound from './sound.js'

class Player {
  constructor(ctx,x = 300, char, dir) {
    this.ctx = ctx;
    this.keyboard = new Input();
    this.frame = 0;
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
    this.state = "idle";
    this.desc = "";
    this.sControl = true;
    this.sound = new Sound();
    this.delay = 0;
    this.dead = false;
    this.imagePosX = this.sprite.x;
    this.imagePosY = this.sprite.y;
    this.w = this.sprite.w;
    this.h = this.sprite.h;
    this.onGround = false;
    this.jumpPower = -8;
    this.dy = 0;
    this.world = {
      gravity: 0.2, // strength per frame of gravity
      drag: 0.999, // play with this value to change drag
      groundDrag: 0.9, // play with this value to change ground movement
      ground: 400,
    }
  }

    draw() {
        if (this.bullet) {
            this.bullet.draw()
        }

        this.ctx.save();
        this.ctx.scale(this.dir, 1);
        this.ctx.drawImage(this.sprite.image, this.imagePosX, this.imagePosY, this.w, this.h, this.dir * this.x, this.y, this.dir * this.w * 2, this.h * 2);
        this.ctx.restore();
    }

    updateDir(x) {
        if (this.x < x) {
            this.dir = 1;
            if (this.keyboard.input.LEFT && this.dullMove((x))) this.speed = -this.move
        } else {
            this.dir = -1;
            if (this.keyboard.input.RIGHT && this.dullMove((x))) this.speed = this.move;
        }
    }

  hitDir() {
    return -this.dir * 1;
  }


  spriteUpdate() {

      if (this.keyboard.input.UP && (this.keyboard.input.RIGHT || this.keyboard.input.LEFT) && this.state !== "jump") {
        this.keyboard.input.LEFT === true ? this.speed = -this.move : this.speed = this.move;
        this.state = "forward_jump";
        if (this.keyboard.input.ATTACK) {
          this.state = "fly_punch";
        }
        if (this.keyboard.input.KICK) {
            this.state = "fly_kick";
        }
      }
      else if (this.keyboard.input.UP && this.state !== "forward_jump") {
        this.state = "jump";
        if (this.keyboard.input.ATTACK) {
          this.state = "fly_punch";
        } else if (this.keyboard.input.KICK) {
          this.state = "fly_kick";
        }
      }
      else if (this.stun) {
        this.state = "stun";
        this.delay++;
        if (this.delay > 20) {
          this.stun = false;
          this.delay = 0;
        }
      }
      else if (this.block) {
        this.state = "block";
        this.delay++;
        if (this.delay > 10) {
          this.block = false;
          this.delay = 0;
        }
    }
    else if (this.keyboard.input.SPECIAL) {
        this.specialAttack();
    }
      else if ((this.keyboard.input.LEFT || this.keyboard.input.RIGHT) && this.state !== "jump" && this.state !== "forward_jump") {
        this.keyboard.input.LEFT === true ? this.speed = -this.move : this.speed = this.move;
        this.state = "moving";
      }
      else if (this.keyboard.input.ATTACK && !this.stun && this.state !== "special_kick") {
        this.state = "punch";
      } else if (this.keyboard.input.KICK && !this.stun && this.state !== "special_kick") {
        this.state = "kick";
      }
     else {
       if (this.onGround) {
         this.state = "";
         this.keyboard.input.PAUSE = false;
       }
      }
  }

  specialAttack() {
    if (this.keyboard.input.ATTACK && !this.keyboard.input.KICK) {
      this.state = "shot";
      if (!this.bullet) {
        if (this.frame === 0)  this.playSound('./asset/sound/hadouken.mp3');
        this.bullet = new Bullet(this.ctx, this.x, this.y, this.dir);
      }
      if (this.keyboard.input.SHOOT) {
        this.bullet.playSound();
        this.keyboard.input.SHOOT = false;
      }
    }
    else if (!this.keyboard.input.ATTACK && this.keyboard.input.KICK) {
      this.state = "special_kick";

    }
  }
  stateUpdate(fps) {
      this.fps++;
      if (this.desc !== this.state) {
          this.frame = 0;
          this.desc = this.state;
      }
    if (this.fps > fps) {
      this.fps = 0;
        this.frame++;
      if (this.frame > this.sprite.maxFrame) this.frame = 0;
    }
    if (this.state === "special_kick") {
      this.x += this.dir * 2;
    }
  }

  hitBottom() {
    if (this.y + 120 >= this.world.ground) {
      this.y = this.world.ground - 120;
      this.dy = 0;
      this.onGround = true;
      this.keyboard.input.UP = false;
    } else {
      this.keyboard.input.UP = true;
      this.onGround = false;
    }
  }

  action(enemyX) {
    this.sprite.frame = this.frame;
    this.speed = this.stop;
    this.spriteUpdate();
    this.stateUpdate(10);
    this.sprite.update(this.state);
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
    if ((this.keyboard.input.ATTACK || this.keyboard.input.KICK)) {
      if (Math.abs(this.x - enemy.x) < 100) {
          this.playSound('./asset/sound/punch_hit.wav');
      } else {
        if (this.keyboard.input.KICK && this.keyboard.input.SPECIAL) {
          this.playSound('./asset/sound/s_kick.mp3');
        } else {
          this.playSound('./asset/sound/punch_miss.wav');
        }
      }
    }
    else {
      this.sControl = true;
    }
  }


  soundControl(enemy) {
    if (this.state !== "jump" && this.state !== "forward_jump") {
      this.meleeSound(enemy);
    }
  }

    update(enemyX = 0) {
        this.updateDir(enemyX);
        this.action(enemyX);
        this.borderLimit();
        this.x += this.speed;
        if (this.keyboard.input.UP && this.onGround) this.dy = this.jumpPower;
        this.dy += this.world.gravity;
        this.dy *= this.world.drag;
        this.y += this.dy;
        this.imagePosX = this.sprite.x;
        this.imagePosY = this.sprite.y;
        this.w = this.sprite.w;
        this.h = this.sprite.h;
        this.hitBottom();
    }



  removePlayer() {
    this.sprite.update("dead");
    this.dead = true;
  }


  over(stat) {
      this.imagePosX = this.sprite.x;
      this.imagePosY = this.sprite.y;
      this.w = this.sprite.w;
      this.h = this.sprite.h;
      this.sprite.frame = this.frame;
      this.sprite.update(stat);
      this.fps++;
      if (stat === "dead") {
          this.y = 350;
      } else {
          this.y = 230;
      }
      if (this.fps > 10){
          this.fps = 0;
          this.frame >= this.sprite.maxFrame ? this.frame = this.sprite.maxFrame : this.frame++;
      }
  }
}


export default Player;
