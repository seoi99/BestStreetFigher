import Player from './player.js';
import HPBar from "./hpbar";
import Sound from './sound.js'


class VsMode {
    constructor(ctx) {
        this.ctx = ctx;
        this.p1 = new Player(this.ctx,300,"ken",1);
        this.p2 = new Player(this.ctx,700,"ryu",-1);
        this.p1.keyboard.movement();
        this.p2.keyboard.movement([37,39,75,76]);
        this.p1hp = new HPBar(this.ctx, 100);
        this.p2hp = new HPBar(this.ctx, 600);
        this.sound = new Sound();
        this.sControl = false;
        this.bControl = false;
    }


    stunned() {

        if (this.p1.keyboard.attack) {
            this.p2.stun = true;
        }
        if (this.p2.keyboard.attack) {
            this.p1.stun = true;
        }
    }

    bulControl(bul, enemy) {
        if (bul) {
            if (Math.abs(bul.x - enemy.x) < 100) {
                enemy.stun = true;
            }
        } else {
            enemy.stun = false;
        }
    }
    fightControl() {
        if ((Math.abs(this.p1.x - this.p2.x) < 100 && (this.p1.keyboard.attack || this.p2.keyboard.attack))) {
            if (this.p1.keyboard.attack && this.p2.keyboard.input.RIGHT) {
                this.p2.block = true;
            }
            if (this.p2.keyboard.attack && this.p1.keyboard.input.LEFT) {
                this.p1.block = true;
            } else {
                this.stunned();
            }
        }
        this.bulControl(this.p1.bullet, this.p2);
        this.bulControl(this.p2.bullet, this.p1);
    }


    playersCollision() {

        this.fightControl();
        this.p1.meleeAttack(this.p2);
        this.p2.meleeAttack(this.p1);
        this.p1.rangeAttack(this.p2);
        this.p2.rangeAttack(this.p1);
    }

    draw() {
        this.p1.draw();
        this.p1.update(this.p2.x);
        this.p2.draw();
        this.p2.update(this.p1.x);
        this.playersCollision()
        this.p1hp.draw();
        this.p2hp.draw();
    }

}

export default VsMode