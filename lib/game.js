import Player from './player.js';
import Background from './background.js';
import Enemy from './enemy.js';
import Input from './input.js'
import HPBar from './hpbar.js'
import Sound from './sound.js'

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.player = new Player(this.ctx);
    this.player.keyboard.movement();
    this.player2 = null;
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
    this.kill = 0;
    this.comboSpeed = 0.7;
    this.image = new Image();
    this.sound = new Sound();
    this.image.src = 'https://i.pinimg.com/originals/f6/c4/51/f6c4516c11809f1b3550e0c68abfef89.gif';
    this.frame = 0;
    this.test = 70;
    this.training = false;
    this.vs = false;
    this.p1hp = null;
    this.p2hp = null;
  }

  intro() {
      this.ctx.drawImage(this.image,0, 0, 1000, 500);
      this.ctx.font="40px Acme";
      this.ctx.fillStyle = "white"
      this.ctx.textAlign = "center"
      this.ctx.fillText(`Best Street Fighter`,500,200);
      this.ctx.font="20px Acme";
      this.start();
  }

  start() {
    let training = "Training Mode";
    let vsMode = "VS Mode";
    this.ctx.fillText(training,500,350);
    this.ctx.fillText(vsMode,500,400);
    let twidth = this.ctx.measureText(training).width/2;
    let vsWidth = this.ctx.measureText(vsMode).width/2;
    document.addEventListener("click", e => {
      if (e.layerX >= 500 - twidth && e.layerX <= 500 + twidth &&
        e.layerY >= 350 - 10 && e.layerY <= 350 + 10) {
          this.input.restart = true;
          this.training = true;
      }
      if (e.layerX >= 500 - vsWidth && e.layerX <= 500 + vsWidth &&
        e.layerY >= 400 - 10 && e.layerY <= 400 + 10) {
          this.input.restart = true;
          this.vs = true;
          this.player2 = new Player(this.ctx, 700);
          this.p1hp = new HPBar(this.ctx, 100)
          this.p2hp = new HPBar(this.ctx, 600)
          this.player2.keyboard.movement([65,68,84,89]);
      }
    })
  }

  gameover() {
    this.image.src = 'https://static.comicvine.com/uploads/original/11111/111112704/3860536-ron_vs_ken_by_eastmonkey.jpg';
    this.ctx.drawImage(this.image,0, 0, 1000, 500);
    this.ctx.font="40px Acme";
    this.ctx.fillStyle = "white"
    this.ctx.textAlign = "center"
    this.ctx.fillText("Game Over",500,150);

    this.totalScore();
  }
  totalScore() {
    let score = this.maxCombo * this.kill * 10;
    this.test--;
    if (this.test == 0) {
      this.sound.play('./asset/sound/game_finished.wav')
    }
    if (this.test <= 50) {
      this.ctx.fillText(`Best Combo : ${this.maxCombo}`,500,250);
    }
    if (this.test <= 20) {
      this.ctx.fillText(`Total Kill : ${this.kill}`,500,290);
    }
    if (this.test <= 0) {
      this.ctx.fillStyle = "red"
    this.ctx.fillText(`Your score is ${score}`,500,350);
    }
  }

  miss() {
    this.ctx.font="20px Acme";
    this.ctx.fillStyle = "red"
    this.ctx.textAlign = "center"
    this.ctx.fillText(`Miss!`,this.player.x + 60,this.player.y - 20);
    this.firsthit = true;
  }

  collision() {
    if (this.player.keyboard.input.ATTACK && this.player.keyboard.input.SHOOT === false) {
        this.enemydead(this.player.x)
    }
    else if (this.player.bullet) {
        this.enemydead(this.player.bullet.x,"bullet", 50);
    }
    this.maxCombo = Math.max(this.combo, this.maxCombo)
  }


  enemydead(x,type="player",range=150) {
    if (Math.abs(x - this.enemy.x) < range) {
    if (type === "bullet") {
      if (!this.player.bullet.collide) {
        this.enemy.alive = false;
        this.player.bullet.collide = true;
        this.combo++;
        this.kill++;
      }
    } else {
      this.sound.play('./asset/sound/punch_hit.wav');
      this.enemy.alive = false;
      this.combo++;
      this.kill++;
    }
    this.comboTime = 200;

    }
    else {
      if (type === "player") {
        this.miss();
        this.sound.play('./asset/sound/punch_miss.wav');
        this.combo = 1;
      } else {
        if (x > 1000) {
          this.combo = 1;
        }
      }
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
      this.comboTime -= this.comboSpeed * this.combo * 0.1
  }

  comboContainer() {
    this.ctx.fillStyle = "green"
    this.ctx.font="12px Acme";
    this.ctx.fillText(`Combo GAUGE`,500,60)
    if (this.comboTime <= 100) {
      this.ctx.fillStyle = "yellow"
    }
    if (this.comboTime <= 50) {
      this.ctx.fillStyle = "red"
    }
    this.ctx.fillRect(400,70, this.comboTime, 20);
  }

  clock() {
    this.ctx.textAlign = "center"
    this.ctx.font="40px Acme";
    if (this.time <= 5) {
      this.ctx.fillStyle = "red"
    }
    this.ctx.fillText(`Timer ${this.time}`,500,30);
  }

  trainingMode() {
    this.background.draw(this.player.x);
    this.clock();
    this.comboContainer()
    this.player.draw();
    this.player.update(this.enemy.x);
    this.enemy.draw(this.player.x);
    this.collision();
    this.respawn();

  }

  vsMode() {
    this.background.draw(this.player.x);
    this.player.draw();
    this.player.update(this.player2.x, "vs");
    this.player2.draw();
    this.player2.update(this.player.x, "vs");
    this.moveControl()
    this.playersCollision()
    this.p1hp.draw();
    this.p2hp.draw();
  }

  removeListener() {
    document.removeEventListener("keydown", e => {
    })
  }
  moveControl() {
    if (Math.abs(this.player.x - this.player2.x) < 80) {
        if (this.player.x > this.player2.x) {
            this.player.x+=5;
            this.player2.x-=5;
            this.player.keyboard.input.RIGHT = false;
        } else {
          this.player.x-=5;
          this.player2.x+=5;
          this.player2.keyboard.input.LEFT = false;
        }

    } else if (this.player.x < 10) {
      this.player.x+=10;
    } else if (this.player2.x > 900) {
      this.player2.x-=10;
    } else {
    }
  }


  playersCollision() {
        if (this.player.keyboard.input.ATTACK && !this.player.keyboard.input.SHOOT  || this.player2.keyboard.input.ATTACK && !this.player2.keyboard.input.SHOOT) {
          if (Math.abs(this.player.x - this.player2.x) < 100) {
            if (this.player.keyboard.input.ATTACK) {

                this.player2.stun = true;
                this.p2hp.hit();
            }
            if (this.player2.keyboard.input.ATTACK) {
              this.player.stun = true;
              this.p1hp.hit();
            }
            this.sound.play('./asset/sound/punch_hit.wav');
          } else {
           this.sound.play('./asset/sound/punch_miss.wav');
           }
        }
          if (this.player.bullet) {
            if (Math.abs(this.player.bullet.x - this.player2.x) < 100) {
              if (this.player2.keyboard.input.RIGHT) {
                this.player2.block = true;
              } else {
              this.player2.stun = true;
              this.p2hp.hit();
            }
              this.player.bullet.collide = true;
              this.sound.play('./asset/sound/punch_hit.wav');
              this.player.bullet = null;
            }

          }
          if (this.player2.bullet) {
            if (Math.abs(this.player2.bullet.x - this.player.x) < 100) {
              if (this.player.keyboard.input.LEFT) {
                this.player.block = true;
              } else {
                this.player.stun = true;
                this.p1hp.hit();
              }
              this.player2.bullet.collide = true;
              this.sound.play('./asset/sound/punch_hit.wav');
              this.player2.bullet = null;
            }
          }
  }

  play() {
    if (!this.input.restart) {
      this.intro();
    } else {
      this.ctx.clearRect(0,0,1000,1000)
      this.ctx.fillStyle = "black"

      this.fps++;
      this.timer();
      if (this.fps > 30) {
        this.time--
        this.fps = 0;
      }
      if (this.training) {
        if (this.time <= 0 || this.comboTime <= 0) {
          this.gameover()
        } else {
            this.trainingMode();
        }
      }
      if (this.vs) {
        this.vsMode();
      }

    }
    requestAnimationFrame(this.play);
  }

}

export default Game;
