import Player from './player.js';
import HPBar from "./hpbar";


class VsMode {
    constructor(ctx) {
        this.ctx = ctx;
        this.p1 = new Player(this.ctx, 300, "ken", 1);
        this.p2 = new Player(this.ctx, 700, "ryu", -1);
        this.p1.keyboard.movement();
        this.p2.keyboard.movement([37, 39, 74, 75, 76]);
        this.p1hp = new HPBar(this.ctx, 100, 50, 300);
        this.p2hp = new HPBar(this.ctx, 600, 50, 300);
    }



    stunned() {
        if (this.p1.keyboard.attack) {
            this.p2.stun = true;
            this.p2.x++;
        }
        if (this.p2.keyboard.attack) {
            this.p1.stun = true;
            this.p1.x--;
        }
    }

    bulControl(bul, enemy) {
        if (bul) {
            if (Math.abs(bul.x - enemy.x) < 100) {
                if (this.p2.keyboard.input.RIGHT) this.p2.block = true;
                else if (this.p1.keyboard.input.LEFT) this.p1.block = true;
                else enemy.stun = true;
            }
            else {
                enemy.stun = false;
            }
        }
    }
    fightControl() {
        if ((Math.abs(this.p1.x - this.p2.x) < 100 && (this.p1.keyboard.attack || this.p2.keyboard.attack))) {
            if (this.p1.keyboard.attack && this.p2.keyboard.input.RIGHT) {
                this.p2.block = true;
                this.p2.x++;
            }
            if (this.p2.keyboard.attack && this.p1.keyboard.input.LEFT) {
                this.p1.block = true;
                this.p1.x--;
            }
                this.stunned();
        }
        this.bulControl(this.p1.bullet, this.p2);
        this.bulControl(this.p2.bullet, this.p1);
    }

    hpControl() {
        if (this.p1.stun) {
            this.p1hp.hit()
        }
        if (this.p1.block) {
            this.p1hp.block()
        }
        if (this.p2.stun) {
            this.p2hp.hit()
        }
        if (this.p2.block) {
            this.p2hp.block()
        }
    }
    playersCollision() {
        this.fightControl();
        this.p1.meleeAttack(this.p2);
        this.p2.meleeAttack(this.p1);
        this.p1.rangeAttack(this.p2);
        this.p2.rangeAttack(this.p1);
        this.hpControl();
    }

    draw() {
        this.p1.draw();
        this.p2.draw();
        this.p1hp.draw();
        this.p2hp.draw();
    }

    update() {
        this.p1.update(this.p2.x);
        this.p2.update(this.p1.x);
        this.playersCollision();
    }
    gameover() {
        this.ctx.font="40px Acme";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`You Win`,500,150);
    }

    gamefun() {
        if (this.p1hp.len >= 0 && this.p2hp.len >= 0) {
            this.update();
        } else {
            this.gameover();
        }
        this.draw()
        this.gameConstraint();
    }

    gameConstraint() {
        if (this.p1hp.len <= 0) {
            this.p2.win();
            this.p1.removePlayer();
        }
        else if (this.p2hp.len <= 0) {
            this.p1.win();
            this.p2.removePlayer();
        }
    }

}

export default VsMode