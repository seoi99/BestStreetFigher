import Player from './player.js';
import Background from './background.js';
import Enemy from './enemy.js';

import Input from './input.js'

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.player = new Player(this.ctx);
    this.background = new Background(this.ctx);
    this.enemy = new Enemy(this.background.x + Math.floor(Math.random() * 5) * 150, this.ctx);
    this.play = this.play.bind(this);
    this.input = new Input();
    this.input.gameControl();
    this.combo = 0;
    this.maxCombo = 0
    this.firsthit = false;
    this.time = 60;
    this.fps = 0;
    this.comboTime = 60;
    this.introText;
    this.image = new Image();
    this.image.src = 'https://i.pinimg.com/originals/f6/c4/51/f6c4516c11809f1b3550e0c68abfef89.gif';

  }

  intro() {
      this.ctx.drawImage(this.image,0, 0, 1000, 500);
      this.ctx.font="40px Acme";
      this.ctx.fillStyle = "white"
      this.ctx.textAlign = "center"
      this.ctx.fillText(`Welcome to One Punch`,500,200);
      this.ctx.font="20px Acme";
      this.ctx.fillText(`Start`,500,350);
      this.ctx.fillText(`How To Play?`,500,400);
  }

  gameover() {
    this.ctx.font="40px Acme";
    this.ctx.fillStyle = "black"
    this.ctx.textAlign = "center"
    this.ctx.fillText(`Game Over`,500,500);
    this.ctx.fillText(`Max Combo ${this.maxCombo}`,500,300);
  }




  comboText() {
    this.ctx.font="20px Acme";
    this.ctx.fillStyle = "black"
    this.ctx.textAlign = "center"
    this.ctx.fillText(`Hit! ${this.combo}`,this.enemy.x,this.enemy.y - 50);
    this.firsthit = true;
  }
  miss() {
    this.ctx.font="20px Acme";
    this.ctx.fillStyle = "black"
    this.ctx.textAlign = "center"
    this.ctx.fillText(`Miss!`,this.player.x + 60,this.player.y - 20);
    this.firsthit = true;
  }
  collision() {
    if (this.player.keyboard.input.ATTACK) {
        this.enemydead();
        this.maxCombo = Math.max(this.combo, this.maxCombo)
    }
  }

  enemydead() {
    if (Math.abs(this.player.x - this.enemy.x) < 150) {
    this.enemy.alive = false;
    this.comboText();
    this.combo++;
    }
    else {
      this.miss();
      this.combo = 0;
    }
  }

  getRand(x) {
    while (x === this.enemy.x) {
      this.enemy.x = this.background.x + Math.floor(Math.random() * 5) * 150
    }
    return this.enemy.x
  }

  respawn() {
    if (this.enemy.transparent <= 0) {
      this.enemy.alive = true;
      this.enemy.transparent = 1;
      this.enemy.x = this.getRand(this.enemy.x);
    }
  }

  timer() {
      this.time--;
  }

  run() {
    this.ctx.font="40px Acme";
    this.ctx.fillStyle = "white"
    this.ctx.textAlign = "center"
    this.background.draw(this.player.x);
    this.ctx.fillText(`Timer ${this.time}`,500,100);
    this.player.draw();
    this.player.update(this.enemy.x);
    this.enemy.draw(this.player.x);
    this.collision();
    this.respawn();
  }

  play() {
    if (!this.input.restart) {
      this.intro();
    } else {
      this.ctx.clearRect(0,0,1000,1000)
      this.fps++;
      if (this.fps > 10) {
        this.time--
        this.fps = 0;
      }
      if (this.time <= 0) {
        this.gameover()
      } else {
        this.run();
      }

    }
  }


}

export default Game;
