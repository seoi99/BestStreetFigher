import Player from './player.js';

export default class Enemy {
  constructor(ctx, char) {
    this.ctx = ctx;
    this.char = char
    this.image = new Image();
    this.FrameNum = 1;
    this.maxFrame = 6;
    this.fps = 0;
    this.w = 60;
    this.h = 60;
    this.canvasWidth = 500;
    this.canvasHeight = 500;
    this.x = 400;
    this.y = 140;
    this.anime = "walk";
    this.dx = -1;
    this.speed = 1;
    this.dy = 5;
    this.hit = false;
  }

  draw() {
    this.x += this.dx;
    this.fps++;
    this.image.src = `./asset/Super Heroes/${this.char}/PNG/${this.char}_${this.anime}_00${this.FrameNum}.png`;
    // console.log(this.x);
    this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    if (this.fps > 5) {
      this.fps = 0;
      if (this.anime != "frontal") {
        this.FrameNum++
      }
      if (this.anime === "die") {
        this.dx = 0;
        if (this.FrameNum === 6) {
          this.x = 0;
          this.w = 0;
          this.h = 0;
        }
      }
      if (this.FrameNum > this.maxFrame) {
        this.FrameNum = 1;
      }
    }
  }
  playerDied() {
    this.anime = "frontal"
  }
  attack() {
    this.maxFrame = 3;
    this.anime = "attack";
  }
  dead() {
      this.anime = "die";
      if (!this.hit) {
        this.FrameNum = 1;
      } else {

      }
      this.maxFrame = 6;
  }
}
