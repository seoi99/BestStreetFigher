
export default class Input {
  constructor() {
    this.restart = false;
    this.input = {
      LEFT: false,
      RIGHT: false,
      DOWN: false,
      UP: false,
      UP_MOVE: false,
      ATTACK: false,
      REVIVE: false,
      KICK: false,
      SHOOT: false,
      SPECIAL: false,
      PAUSE: false,
    };
    this.attack = false;
    this.disable = false;
    this.counter = 0;
    this.frame = 0;
    this.maxFrame = 0;
    this.keyHandler = this.keyHandler.bind(this);
    document.addEventListener("keydown", this.keyHandler);
    document.addEventListener("keyup", this.keyHandler);
  }

  keyHandler(e, keys = [65, 68, 84, 89, 85, 87]) {
    let state = e.type === "keydown";
    switch (e.keyCode) {
      case keys[0]:
        this.input.LEFT = state;
        break;
      case keys[1]:
        this.input.RIGHT = state;
        break;
      case keys[2]:
        this.input.ATTACK = state;
        break;
      case keys[3]:
          this.input.KICK = state;
        break;
      case keys[4]:
          this.input.SPECIAL = state;
        break;
      case keys[5]:
        this.input.UP = state;
        break;
    }
    if (this.input.ATTACK && this.input.SPECIAL) {
      this.keyControl(3, "SPECIAL")
    }  else if (this.input.KICK && this.input.SPECIAL) {
      this.keyControl(10, "SPECIAL")
    } else if (this.input.KICK) {
      this.keyControl(4, "KICK")
    } else if (this.input.ATTACK) {
      this.keyControl(1, "ATTACK")
    }
    if (e.type === "keyup") {
      this.counter = 0;
    }
  }
  keyControl(max, key) {
    this.counter++;
    if (this.counter > max) {
      this.input[key] = false;
    } else {
    this.input[key] = true;
    }
  }
  gameControl() {
    this.input.REVIVE = false;
  }

  // movement(keys = [65, 68, 84, 89, 85, 87]) {
  //
  //     document.addEventListener("keydown", e => {
  //       const key = e.keyCode;
  //       switch (key) {
  //   //         case keys[0]:
  //   //           this.input.LEFT = true;
  //   //           break;
  //   //         case keys[1]:
  //   //           this.input.RIGHT = true;
  //   //           break;
  //   //         case keys[2]:
  //   //           this.attack = true;
  //   //           this.counter++;
  //   //           this.counter > 2 ? this.input.ATTACK = false : this.input.ATTACK = true;
  //   //           break;
  //   //         case keys[3]:
  //   //           this.attack = true;
  //   //           this.counter++;
  //   //           this.counter > 3 ? this.input.KICK = false : this.input.KICK = true;
  //   //           break;
  //   //         case keys[4]: this.input.SPECIAL = true; break;
  //   //         case keys[5]: this.input.UP = true; break;
  //   //         default:
  //       }
  //     });
  //     document.addEventListener("keyup", e => {
  //       const key = e.keyCode;
  //       switch (key) {
  //         case keys[0]:
  //           this.input.LEFT = false;
  //           break;
  //         case 40:
  //         case 83:
  //           this.input.DOWN = false;
  //           break;
  //         case keys[1]:
  //           this.input.RIGHT = false;
  //           break;
  //         case keys[2]:
  //           this.attack = false;
  //           this.input.ATTACK = false;
  //           this.counter = 0;
  //           break;
  //         case keys[3]:
  //           this.attack = false;
  //           // this.input.KICK = false;
  //           this.counter = 0;
  //           break;
  //         case keys[4]: this.input.SPECIAL = false; break;
  //         case keys[5]: this.input.UP = false; break;
  //       }
  //     })
  //   }
}
