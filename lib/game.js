import Player from './player.js';
import Enemy from './enemy.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.player = new Player(ctx);
    this.enemyList = ["colossus", "mystique", "redskull", "starlord"];
    this.enemy = [];
    this.animate = this.animate.bind(this);
    this.stage = 9;
    this.died = false;
  }
  setup() {
      for (var i = 0; i < this.stage; i++) {
        let rand = Math.floor(Math.random() * 4);
        this.enemy.push(new Enemy(this.ctx, this.enemyList[rand], i + 1));
      }
  }


  animate() {
    this.ctx.clearRect(0,0,500,500);

    for (var i = 0; i < this.enemy.length; i++) {
      this.enemy[i].draw();
    }

    this.player.mainLoop();
    this.collision();
    requestAnimationFrame(this.animate);
  }

  collision() {
    // enemy and player near by

      for (var i = 0; i < this.enemy.length; i++) {
        // enemy died
        if (this.enemy[i].x === 0) {
          this.enemy.shift();
        }
        // player died;
        if (this.player.anime === "Dead" && this.player.FrameNum === 9) {
          this.player.w = 0;
          this.player.h = 0;
          this.enemy[i].playerDied();
          this.enemy[i].FrameNum = 1;
          this.enemy[i].dx = 0;
        }
        if (this.enemy.length !== 0) {

          // enemy attack
          if (!this.enemy[i].hit && Math.abs(this.player.x - this.enemy[i].x) < this.player.w/2) {
            this.enemy[i].attack();
            this.player.x--;
            this.player.dead();
          }

          // melee attack
          if (this.player.keyboard.input.A) {
            if (Math.abs(this.player.x - this.enemy[i].x) < this.player.w / 2 + 5) {
              this.enemy[i].hit = true;
              this.enemy[i].dead();

            }
          }

          // bullet hit enemy
          if (this.player.bullet) {
            if (Math.abs(this.player.bullet.x + 10 - this.enemy[i].x) < 30) {
              this.enemy[i].hit = true;
              this.enemy[i].dead();
              this.player.bullet = null;
            }
          }
        }
      }

  }
  gameover() {

  }
}

export default Game;
