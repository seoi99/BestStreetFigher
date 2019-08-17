
export default class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.maxWidth = 1000;
    this.maxHeight = 500;
    this.image = new Image();
    this.image.src = 'https://i.pinimg.com/originals/91/64/01/9164016aa77fa969f71800b9ba8c32b4.gif';
  }

  draw() {
    this.ctx.drawImage(this.image,0,0,this.maxWidth,this.maxHeight);
  }

}
