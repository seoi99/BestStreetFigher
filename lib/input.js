
export default class Input {
  constructor() {
      this.restart = false;
      this.input = {
        LEFT: false,
        RIGHT: false,
        ATTACK: false,
        REVIVE: false,
        SHOOT: false,
      };
      this.attack = false;
      this.counter = 0;
  }
  gameControl() {
    this.input.REVIVE = false;
  }

  movement(keys=[65,68,84,89]) {

    document.addEventListener("keydown", e => {
      const key = e.keyCode;
        switch (key) {
        case keys[0]: this.input.LEFT = true; break;
        case keys[1]:
        this.input.RIGHT = true; break;
        case keys[2]:
          this.attack = true;
          this.counter++;
          this.counter > 2 ? this.input.ATTACK = false : this.input.ATTACK = true;
        break;
        case keys[3]:
          this.attack = true;
          this.counter++;
          this.counter > 3 ? this.input.SHOOT = false : this.input.SHOOT = true;
        break;
        default:
    }
  });
    document.addEventListener("keyup", e => {
        const key = e.keyCode;
        switch (key) {
          case keys[0]: this.input.LEFT = false; break;
          case keys[1]: this.input.RIGHT = false; break;
          case keys[2]:
            this.attack = false;
            this.input.ATTACK = false;
            this.counter = 0;
           break;
          case keys[3]:
            this.attack = false;
            this.input.SHOOT = false;
            this.counter = 0;
          break;
        }
    })


  }
}
