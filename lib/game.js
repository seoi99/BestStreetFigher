import Player from './player.js';
import Enemy from './enemy.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.player = new Player(ctx);
    this.enemyList = ["colossus", "mystique", "redskull", "starlord"];
    this.enemy = [];
    this.animate = this.animate.bind(this);
    this.stage = 3;
    this.interval = 0;
  }
  setup() {
      for (var i = 0; i < this.enemyList.length; i++) {
        this.enemy.push(new Enemy(this.ctx, this.enemyList[i]));
      }
  }

  createEnemy() {
    
  }
  animate() {
    this.ctx.clearRect(0,0,500,500);

    //   if (this.enemy && this.enemy.w > 0) {
    //
    //   } else {
    //     this.createEnemy();
    //   }

    // this.setup();
    this.interval++;

    this.player.mainLoop();
    this.createEnemy();
    // this.enemy.map(enemy => enemy.draw());
    this.collision();
    requestAnimationFrame(this.animate);
  }

  collision() {
    // // enemy and player near by
    //   if (!this.enemy.hit && Math.abs(this.player.x - this.enemy.x) < 20) {
    //     this.enemy.x++;
    //     // console.log(this.player.x, this.enemy.x);
    //     this.enemy.attack();
    //     this.player.dead();
    //     // this.enemy[3].x = this.player.x;
    //     // this.enemy[3].playerDied();
    //   }
    //
    // // melee attack
    // if (this.player.keyboard.input.A) {
    //   if (Math.abs(this.player.x - this.enemy.x) < this.player.w) {
    //     this.enemy.hit = true;
    //     this.enemy.dead();
    //   }
    // }
    //
    // // bullet hit enemy
    // if (this.player.bullet) {
    //   if (Math.abs(this.player.bullet.x + 10 - this.enemy.x - 30) < 60) {
    //     this.enemy.hit = true;
    //     this.enemy.dead();
    //     this.player.bullet.w = 0;
    //     this.player.bullet.h = 0;
    //     // this.enemy[3] = null;
    //   }
    // }
  }
  gameover() {

  }
}

export default Game;
