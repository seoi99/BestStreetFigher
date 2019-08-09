
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


  movement(keys=[37,39,75,76]) {
    this.w = 70;
    this.h = 80;
    document.addEventListener("keydown", e => {
      const key = e.keyCode;
      switch (key) {
        case keys[0]: this.input.LEFT = true; break;
        case keys[1]: this.input.RIGHT = true; break;
        case keys[2]: this.input.ATTACK = true; break;
        case keys[3]: this.input.SHOOT = true; break;
        default:
    }
  })
    document.addEventListener("keyup", e => {
        this.maxWidth = 3;
        this.xSpeed = this.stop;
        const key = e.keyCode;
        switch (key) {
          case keys[0]: this.input.LEFT = false; break;
          case keys[1]: this.input.RIGHT = false; break;
          case keys[2]: this.input.ATTACK = false; break;
          case keys[3]: this.input.SHOOT = false; break;
        }
    })


  }
}
