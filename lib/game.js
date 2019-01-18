import Player from './player.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.player = new Player(ctx);
    this.animate = this.animate.bind(this);
  }

  animate() {
    this.ctx.clearRect(0,0,500,500);
    this.player.draw();
    requestAnimationFrame(this.animate);
  }

  action() {
    this.player.movingAction();
  }

  gameover() {

  }
}

export default Game;
