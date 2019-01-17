class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.image = new Image();
    this.w = 60;
    this.h = 60;
    this.FrameNum = 1;
    this.canvasWidth = 500;
    this.canvasHeight = 500;
    this.x = 200
    this.y = 200
    this.dx = 1;
    this.dy = 1;
    this.draw = this.draw.bind(this);
  }

  draw() {
    this.image.src = `./asset/robot/Idle (${this.FrameNum}).png`;
    this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    this.FrameNum ++;
    if (this.FrameNum > 10) {
      this.FrameNum = 1;
    }
    requestAnimationFrame(this.draw);
  }

  action() {

  }
}

export default Player;
