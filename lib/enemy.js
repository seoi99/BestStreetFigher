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
    this.y = 140;
    this.anime = "walk";
    this.dx = -1;
    this.speed = 1;
    this.dy = 5;
    this.hp = 2;
  }

  drawEach() {
    this.delay += 0.01;
    if (this.enemyIdx <= this.delay) {
      this.delay = this.enemyIdx;
      this.draw();
    }
  }

  frame(max) {
    this.fps++;
    if (this.fps > max) {
      this.fps = 0;
      this.FrameNum++
      if (this.FrameNum >= this.maxFrame) {
        this.FrameNum = 1;
      }
    }
  }

  draw() {
    this.x += this.dx;
    this.frame(5);
    this.image.src = `./asset/Super Heroes/${this.char}/PNG/${this.char}_${this.anime}_00${this.FrameNum}.png`;
    this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
      // if (this.anime != "frontal") {
      //   this.FrameNum++;
      // }
  }


  playerDied() {
    this.anime = "frontal"
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
