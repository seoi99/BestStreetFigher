
export default class Input {
  constructor() {
      this.maxWidth = 3;
      this.xSpeed = 0;
      this.ySpeed = 1;
      this.stop = 0;
      this.speed = 5;
      this.flip = 1;
      this.restart = false;
      this.revive = 5;
      this.input = {
        LEFT: false,
        RIGHT: false,
        ATTACK: false,
        REVIVE: false,
        SHOOT: false,
      }
      this.direction = "RIGHT";
      this.src = './asset/ken_idle.png';
  }
  gameControl() {

    this.input.REVIVE = false;
  }

  validateCombo(arr) {
    for (let i = 0; i < this.shot.length; i++) {
      if (arr[i] !== this.shot[i]) {
        return false;
      }
    }
    return true;
  }



  inputVariation() {
    if (this.input.LEFT) {
      this.maxWidth = 4;
      this.xSpeed = -Math.abs(this.speed)
      this.src = './asset/ken_moving_left.png';
      this.direction = "LEFT"
    }
    else if (this.input.RIGHT) {
      this.maxWidth = 4;
      this.xSpeed = Math.abs(this.speed)
      this.src = './asset/ken_moving.png';
      this.direction = "RIGHT"
    }
    else if (this.input.ATTACK) {
      if (this.direction === "LEFT") {
        this.src = './asset/ken_punch_left.png';
      } else {
        this.src = './asset/ken_punch.png';
      }
      this.maxWidth = 2;
    } else {
      if (this.direction === "LEFT") {
        this.src = './asset/ken_idle_left.png';
      } else {
        this.src = './asset/ken_idle.png';
      }
    }

  }
  movement() {
    document.addEventListener("keydown", e => {
      const key = e.keyCode;
      switch (key) {
        case 37: this.input.LEFT = true; break;
        case 39: this.input.RIGHT = true; break;
        case 65: this.input.ATTACK = true; break;
        case 83: this.input.SHOOT = true; break;
        default:
    }
  })
    document.addEventListener("keyup", e => {
        this.maxWidth = 3;
        this.xSpeed = this.stop;
        const key = e.keyCode;
        switch (key) {
          case 37: this.input.LEFT = false; break;
          case 39: this.input.RIGHT = false; break;
          case 65: this.input.ATTACK = false; break;
          case 83: this.input.SHOOT = false; break;
        }
    })


  }
}
