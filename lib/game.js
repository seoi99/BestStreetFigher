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
    this.meleeAttacked = this.meleeAttacked.bind(this);
    this.rangeAttacked = this.rangeAttacked.bind(this);
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
      this.enemy[i].drawEach();
    }
    this.player.mainLoop();
    this.collision();
    this.gameover();
    requestAnimationFrame(this.animate);
  }

  meleeAttacked(i) {
    // melee attack
    if (this.player.keyboard.input.A) {
        this.enemy[i].hp--;
    }
  }
  rangeAttacked(i) {
    // bullet hit enemy
    if (this.player.bullet) {
      if (Math.abs(this.player.bullet.x + 10 - this.enemy[i].x) <= this.enemy[i].w/2) {
        this.enemy[i].hp--;
        this.player.bullet = null;
      }
    }
  }

  attacked(i) {
    // enemy attack
    this.rangeAttacked(i);
    if (Math.abs(this.player.x - this.enemy[i].x) < this.player.w/2) {
      this.enemy[i].attack();
      this.meleeAttacked(i);
      this.enemy[i].x+= 10;
      this.player.hp--;
    }
    this.enemy[i].dead();
    this.player.dead();
  }

  collision() {
    // enemy and player near by
      for (var i = 0; i < this.enemy.length; i++) {
        // enemy died
        if (this.enemy[i].x === 0) {
          this.enemy.shift();
        }
        if (this.enemy.length !== 0) {
          this.attacked(i);
        }
      }
  }
  gameover() {
    if (this.player.over) {
      this.ctx.clearRect(0,0,500,500);
    }
  }
}

export default Game;
