import vsMode from './vsMode.js';
import Background from './background.js';
import trainMode from './trainMode.js';
import Input from './input.js'

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.background = new Background(this.ctx);
    this.play = this.play.bind(this);
    this.input = new Input();
    this.input.gameControl();
    this.fps = 0;
    this.image = new Image();
    this.image.src = 'https://i.pinimg.com/originals/f6/c4/51/f6c4516c11809f1b3550e0c68abfef89.gif';
    this.test = 70;
    this.time = 60;

    this.training = false;
    this.vs = false;
    this.vsMode = new vsMode(ctx)
    this.trainMode = new trainMode(ctx)

  }

  intro() {
    this.ctx.drawImage(this.image, 0, 0, 1000, 500);
    this.ctx.font = "40px Acme";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Best Street Fighter`, 500, 200);
    this.ctx.font = "20px Acme";
    this.start();
  }

  start() {
    let training = "Training Mode";
    let vs = "VS Mode";
    this.ctx.fillText(training, 500, 350);
    this.ctx.fillText(vs, 500, 400);
    let twidth = this.ctx.measureText(training).width / 2;
    let vsWidth = this.ctx.measureText(vs).width / 2;
    document.addEventListener("click", e => {
      if (e.layerX >= 500 - twidth && e.layerX <= 500 + twidth &&
          e.layerY >= 350 - 10 && e.layerY <= 350 + 10) {
        this.input.restart = true;
        this.training = true;
      }
      if (e.layerX >= 500 - vsWidth && e.layerX <= 500 + vsWidth &&
          e.layerY >= 400 - 10 && e.layerY <= 400 + 10) {
        this.input.restart = true;
        this.vs = true;
      }
    })
  }

  timer() {
    this.comboTime -= this.comboSpeed * this.combo * 0.1
  }

  play() {
    if (!this.input.restart) {
      this.intro();
    } else {
      this.ctx.clearRect(0, 0, 1000, 1000);
      this.ctx.fillStyle = "black";

      this.fps++;
      this.timer();
      if (this.fps > 30) {
        this.time--;
        this.fps = 0;
      }
      if (this.training) {
        this.background.draw();
        this.trainMode.draw();
      }
      if (this.vs) {
        this.background.draw();
        this.vsMode.draw();
      }

    }
    requestAnimationFrame(this.play);
  }

}

export default Game;
