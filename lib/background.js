export default class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.mapW = 50;
    this.mapH = 50;
    this.grid = [
      [0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,0,1,1],
      [1,0,0,0,0,0,0,0,1,1],
    ]
  }
  update() {

  }
  draw() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        // this.ctx.fillStyle = "#999999";
        if (this.grid[i][j] === 0) {
          this.ctx.fillStyle = "red";
          this.ctx.fillRect(i * this.mapW, j * this.mapH, this.mapW, this.mapH)
        } else {
          this.ctx.fillStyle = "#eeeeee";
          this.ctx.fillRect(i * this.mapW, j * this.mapH, this.mapW, this.mapH)
        }
      }
    }
  }
}
