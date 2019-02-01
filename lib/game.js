import Player from './player.js';
import Enemy from './enemy.js';
import Background from './background.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.player = null;
    this.enemyList = ["colossus", "mystique", "redskull", "starlord"];
    this.enemy = [];
    this.gameLoop = this.gameLoop.bind(this);
    this.stage = 5;
    this.item = new Image();
    this.item.src = `./asset/robot/Objects/Bullet_001.png`;
    this.background = new Background(ctx);
    this.drops = [];

  }
  setup() {
    this.player = new Player(this.ctx);
      for (var i = 0; i < this.stage; i++) {
        let rand = Math.floor(Math.random() * 4);
        this.enemy.push(new Enemy(this.ctx, this.enemyList[rand], i + 1));
      }
  }

  gameLoop() {
    if (this.player.over) {
      this.gameover();
    } else {
      this.animate();
    }
    requestAnimationFrame(this.gameLoop)
  }

  animate() {
    this.ctx.clearRect(0,0,500,500);
    // this.background.draw();
    this.player.mainLoop();
    for (var i = 0; i < this.enemy.length; i++) {
      this.enemy[i].drawEach();
    }
    this.collectItem();
    this.collision();
  }

  collectItem() {
    if (this.drops.length > 0) {
      for (var i = 0; i < this.drops.length; i++) {
        this.ctx.drawImage(this.item, this.drops[i].x, this.drops[i].y + 50,10, 10);
        if (Math.abs(this.player.x - this.drops[i].x) <= 30) {
          this.player.bulletLimit += 5;
          this.drops.shift();
        }
      }
    }

  }
  meleeAttacked(i) {
    // melee attack
    if (this.player.keyboard.input.A) {
        this.enemy[i].hp-= 5;
    }
  }
  rangeAttacked(i) {
    // bullet hit enemy
    if (this.player.bullet) {
      if (Math.abs(this.player.bullet.x + 10 - this.enemy[i].x) <= this.enemy[i].w/2) {
        this.enemy[i].hp-= 10;
        this.player.bullet = null;
      }
    }
  }

  attacked(i) {
    // enemy attack
    this.rangeAttacked(i);
    if (Math.abs(this.player.x - this.enemy[i].x) < this.player.w/2) {
      this.meleeAttacked(i)
      this.enemy[i].attack();
      this.enemy[i].x+= 10;
      this.player.hp-= 1;
    }
    this.enemy[i].dead();
    this.player.dead();
  }

  collision() {
    // enemy and player near by
      for (var i = 0; i < this.enemy.length; i++) {
        // enemy died
        if (this.enemy[i].anime === "die" && this.enemy[i].FrameNum >= 4) {
          this.drops.push(this.enemy.shift());
        }
        if (this.enemy.length !== 0) {
          this.attacked(i);
        }
      }
  }

  gameover() {
      // this.ctx.beginPath();
      // this.ctx.fillStyle = "black";
      // this.ctx.fillRect(0,0,500,500);
      // this.ctx.font="30px Acme";
      // this.ctx.closePath();
      for (var i = 0; i < this.enemy.length; i++) {
        // this.enemy[i].drawEach();
        this.enemy[i].playerDied(this.player.over);
      }
      this.ctx.fillStyle = "#00dc00"
      this.ctx.fillText(`game over`,250,20);
  }
  victory() {
    this.ctx.fillStyle = "#00dc00"
    this.ctx.fillText(`stage cleared`,250,20);
  }
}

export default Game;
