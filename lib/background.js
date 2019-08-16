
export default class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.maxWidth = 1000;
    this.maxHeight = 500;
    this.image = new Image();
    this.image.src = 'https://i.pinimg.com/originals/91/64/01/9164016aa77fa969f71800b9ba8c32b4.gif';
    this.stand = new Array(5);
    this.w = 50;
    this.h = 100;
    this.increment = 150;
    this.x = 250;
    this.y = 400;
  }

  currentBox(playerX, increment) {
    if (playerX > this.x + increment && playerX <= this.x + this.w * Math.PI + increment) {
      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "black";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Near Here", this.x + increment + this.w/2, -this.h);
    }
  }

  box(increment) {
    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.rect(this.x + increment, this.y, this.w, this.h);
    this.ctx.stroke();
  }

  draw(playerX) {
    this.ctx.drawImage(this.image,0,0,this.maxWidth,this.maxHeight);
    for (let i = 0; i < this.stand.length; i++) {
      this.currentBox(playerX, this.increment * i);
    }
  }




}
