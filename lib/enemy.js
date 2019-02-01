import Player from './player.js';

export default class Enemy {
  constructor(ctx, char, enemyIdx) {
    this.ctx = ctx;
    this.char = char;
    this.image = new Image();
    this.FrameNum = 1;
    this.maxFrame = 6;
    this.fps = 0;
    this.w = 60;
    this.h = 60;
    this.enemyIdx = enemyIdx;
    this.delay = 0;
    this.canvasWidth = 500;
    this.canvasHeight = 500;
    this.x = 400;
    this.y = 400 - this.h;
    this.anime = "walk";
    this.dx = -1;
    this.speed = 1;
    this.dy = 5;
    this.maxHp = 40;
    this.hp = 40;
    this.item = new Image ();
  }

  drawEach() {
    this.delay += 0.01;
    if (this.enemyIdx <= this.delay) {
      this.delay = this.enemyIdx;
      this.draw();
    }
  }

  hpBar() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x + (this.w - this.maxHp)/2,this.y - 10, this.hp ,3);
    this.ctx.font="30px Acme";
    this.ctx.closePath();
  }

  frame(max) {
    this.fps++;
    if (this.fps > max) {
      this.fps = 0;
      if (this.FrameNum >= this.maxFrame) {
        this.FrameNum = 1;
      }
      this.FrameNum++
    }
  }

  draw() {
    this.x += this.dx;
    this.hpBar();
    this.image.src = `./asset/Super Heroes/${this.char}/PNG/${this.char}_${this.anime}_00${this.FrameNum}.png`;
    this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    this.frame(5);
      // if (this.anime != "frontal") {
      //   this.FrameNum++;
      // }
  }


  playerDied(val) {
    if (val) {
      this.anime = "frontal";
      this.FrameNum = 1;
      this.dx = 0;
    }
  }

  attack() {
    this.maxFrame = 3;
    this.anime = "attack";
  }

  dead() {
    if (this.hp <= 0) {
      this.anime = "die";
      this.maxFrame = 4;
    }
  }


}
