import vsMode from './vsMode.js';
import Background from './background.js';
import trainMode from './trainMode.js';
import Input from './input.js'
import VsMode from "./vsMode";

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
    this.vsMode = null;
    this.trainMode = null;
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

  createClickBox(text,x,y,h, mode) {
    this.ctx.fillText(text, x,y);
    let w = this.ctx.measureText(text).width / 2;
    document.addEventListener("click", e => {
      if (e.layerX >= x - w && e.layerX <= x + w &&
          e.layerY >= y - h && e.layerY <= y + h) {
        if (mode === "vs") {
          this.vs = true;
          this.input.restart = true;
          this.vsMode = new VsMode(this.ctx);
        } else if (mode === "train") {
          this.trainMode = new trainMode(this.ctx);
          this.input.restart = true;

          this.training = true;
        } else {
          this.input.restart = false;
          this.training = false;
          this.vs = false;
        }
      }
    })
  }

  restart() {
    this.fps++;
    if (this.fps > 200) {
      this.createClickBox("retry?", 500, 400, 20, "retry?");
    }

  }
  start() {
    this.createClickBox("CPU Mode", 500, 300, 20, "train");
    this.createClickBox("VS Mode", 500, 350, 20, "vs");
  }


  clock() {
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "red";
    this.ctx.font="40px Acme";
    this.fps++;
    if (this.fps > 70) {
      this.time--;
      this.fps = 0;
    }
    this.ctx.fillText(`${this.time}`,500,60);
  }

  play() {
    if (!this.input.restart) {
      this.intro();
    } else {
      this.background.draw();
      if (this.training) {
        this.trainMode.draw();
        if (this.trainMode.over) {
          this.restart()
        }
      }
      if (this.vs) {
        this.vsMode.gamefun();
        if (this.vsMode.over) {
          this.restart()
        }
      }
    }

    requestAnimationFrame(this.play);
  }

}

export default Game;
