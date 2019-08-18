import Player from './player.js';
import HPBar from "./hpbar";
import Sound from './sound.js'


class VsMode {
    constructor(ctx) {
        this.ctx = ctx;
        this.p1 = new Player(this.ctx,300,"ken",1);
        this.p2 = new Player(this.ctx,700,"ryu",-1);
        this.p1.keyboard.movement();
        this.p2.keyboard.movement([37,39,74,75,76]);
        this.p1hp = new HPBar(this.ctx, 100);
        this.p2hp = new HPBar(this.ctx, 600);
        this.sound = new Sound();
        this.sControl = false;
        this.bControl = false;
        this.hpUpdate = false;
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

    hpControl() {
        if (this.p1.stun) {
            this.p1hp.hit()
        }
        if (this.p2.stun ) {
            this.p2hp.block()
        }
        if (this.p2.block ) {
            this.p2hp.hit()
        }
        if (this.p2.block ) {
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
        this.p1.update(this.p2.x);
        this.p2.draw();
        this.p2.update(this.p1.x);
        this.playersCollision()
        this.p1hp.draw();
        this.p2hp.draw();
        this.gameover();
    }

    gameover() {
        if (this.p1hp.len <= 0 || this.p2hp.len <= 0) {
            console.log('game is over dude');
        }
    }
}

export default VsMode