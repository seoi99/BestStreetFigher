import Player from './player.js';
import Background from './background.js';
import Enemy from './enemy.js';
import Input from './input.js'
import Sound from './sound.js'

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.player = new Player(this.ctx);
    this.background = new Background(this.ctx);
    this.enemy = new Enemy(this.background.x + Math.floor(Math.random() * 5) * 150, this.ctx);
    this.play = this.play.bind(this);
    this.input = new Input();
    this.input.gameControl();
    this.combo = 1;
    this.maxCombo = 0
    this.firsthit = false;
    this.time = 60;
    this.fps = 0;
    this.comboTime = 200;
    this.comboSpeed = 0.7;
    this.image = new Image();
    this.sound = new Sound();
    this.image.src = 'https://i.pinimg.com/originals/f6/c4/51/f6c4516c11809f1b3550e0c68abfef89.gif';

  }

  intro() {
      this.ctx.drawImage(this.image,0, 0, 1000, 500);
      this.ctx.font="40px Acme";
      this.ctx.fillStyle = "white"
      this.ctx.textAlign = "center"
      this.ctx.fillText(`Best Street Fighter`,500,200);
      this.ctx.font="20px Acme";
      this.start();
      this.ctx.fillText(`How To Play?`,500,400);
  }

  start() {
    this.ctx.fillText(" 'R' to Start",500,350);
  }

  gameover() {
    this.image.src = 'https://static.comicvine.com/uploads/original/11111/111112704/3860536-ron_vs_ken_by_eastmonkey.jpg';
    this.ctx.drawImage(this.image,0, 0, 1000, 500);
    this.ctx.font="40px Acme";
    this.ctx.fillStyle = "white"
    this.ctx.textAlign = "center"
    this.ctx.fillText(`Game Over`,500,350);
    this.ctx.fillText(`Best Combo ${this.maxCombo}`,500,400);
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
        this.enemydead(this.player.x)
        this.maxCombo = Math.max(this.combo, this.maxCombo)
    }
    else if (this.player.bullet) {
        this.player.bullet.playSound();
        this.enemydead(this.player.bullet.x,"bullet", 50);
    }
  }


  enemydead(x,type="player",range=150) {
    if (Math.abs(x - this.enemy.x) < range) {
    if (type === "bullet") {
      if (!this.player.bullet.collide) {
        this.enemy.alive = false;
        this.player.bullet.collide = true;
      }
    } else {
      this.enemy.alive = false;
    }
    this.comboTime = 200;
    this.combo++;
    this.sound.play('./asset/sound/punch_hit.wav');
    }
    else {
      if (type === "player") {
        this.miss();
        this.sound.play('./asset/sound/punch_miss.wav');
      }
      this.combo = 1;
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
      this.comboTime -= this.comboSpeed * this.combo
  }

  comboContainer() {
    this.ctx.fillStyle = "green"
    this.ctx.font="15px Acme";
    this.ctx.fillText(`GAUGE`,500,50)
    this.ctx.fillRect(400,70, this.comboTime, 20);
  }

  run() {
    this.ctx.fillStyle = "white"
    this.ctx.textAlign = "center"
    this.background.draw(this.player.x);
    this.ctx.fillText(`Timer ${this.time}`,500,30);
    this.ctx.font="40px Acme";
    this.comboContainer();
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
      this.timer();
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
