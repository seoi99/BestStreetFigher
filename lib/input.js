
export default class Input {
  constructor() {
      this.maxWidth = 3;
      this.xSpeed = 0;
      this.ySpeed = 1;
      this.stop = 0;
      this.speed = 20 * Math.PI;
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
    document.addEventListener("keyup", e => {
      const key = e.keyCode;
      if (key === 82) {
        this.restart = true;
      }
    })
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

  specialAttack(arr) {
    if (arr.length === 3) {
      if (this.validateCombo(arr)) {
        this.combo = true;
      } else if (arr.length > 3) {
        this.combo = false;
     }
     return this.combo;
    }
  }
  movement() {
    document.addEventListener("keydown", e => {

      const key = e.keyCode;
      switch (key) {
        case 37:
          this.maxWidth = 4;
          this.input.LEFT = false;
          this.src = './asset/ken_moving_left.png';
          this.direction = "LEFT"
          break;
        case 39:
          this.maxWidth = 4;
          this.input.RIGHT = false;
          this.src = './asset/ken_moving.png';
          this.direction = "RIGHT"
          break;
        case 65:
            if (this.direction === "LEFT") {
              this.src = './asset/ken_punch_left.png';
            } else {
              this.src = './asset/ken_punch.png';
            }
            this.maxWidth = 2;
            this.input.ATTACK = true;
          break;
        case 83:
            this.input.SHOOT = true;
          break;
        default:
    }
  })


    document.addEventListener("keyup", e => {
        this.maxWidth = 3;
        this.xSpeed = this.stop;
        if (this.direction === "LEFT") {
          this.src = './asset/ken_idle_left.png';
        } else {
          this.src = './asset/ken_idle.png';
        }
        const key = e.keyCode;
        switch (key) {
          case 37:
            this.input.LEFT = true;
            this.input.ATTACK = false;
            break;
          case 39:
            this.input.RIGHT = true;
            this.input.ATTACK = false;
            break;
          case 65:
            break;
            default:
          case 83:
            this.input.SHOOT = false;
            break;
        }
    })
  }
}
