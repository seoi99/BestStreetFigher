import Player from './player.js';
import Enemy from './enemy.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.player = new Player(ctx);
    this.enemyList = ["colossus", "mystique", "redskull", "starlord"];
    this.enemy = [];
    this.animate = this.animate.bind(this);
  }
  setup() {
    for (var i = 0; i < this.enemyList.length; i++) {
    this.enemy.push(new Enemy(this.ctx, this.enemyList[i]));
    }
  }
  animate() {
    this.setup();
    this.ctx.clearRect(0,0,500,500);
    this.player.action();
    // this.enemy[3].draw();
    // this.collision();
    requestAnimationFrame(this.animate);
  }

  collision() {
    // enemy and player near by
    if (Math.abs(this.player.x - this.enemy[3].x) < 60) {
      this.enemy[3].attack();
      this.player.dead();
      this.enemy[3].x = this.player.x;
      this.enemy[3].playerDied();
    }

    // bullet hit enemy
    if (this.player.bullet) {
      if (Math.abs(this.player.bullet.Playerx + 10 - this.enemy[3].x - 30) < 60) {
        this.enemy[3].dead();
        this.player.bullet.w = 0;
        this.player.bullet.h = 0;
        // this.enemy[3] = null;
      }
    }
  }
  gameover() {

  }
}

export default Game;
