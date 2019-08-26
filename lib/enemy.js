import Sprite from './sprite.js';
import Player from './player.js';
import Bullet from './bullet.js';

export default class Enemy extends Player {

    constructor(x, ctx) {
        super();
        this.x = x;
        this.ctx = ctx;
        this.rw = 140;
        this.rh = 160;
        this.y = 300;
        this.alive = true;
        this.frame = 0;
        this.transparent = 1;
        this.fps = 0;
        this.dir = 1;
        this.attack = false;
        this.counter = 0;
        this.sprite = new Sprite('ryu');
        this.aType = ['punch', 'kick', 'special_kick'];
        this.currentAttack = "kick";
        this.dull = false;
        this.blocked = false;
        this.stop = 0;
        this.move = 2;
        this.bullet = null;
        this.sControl = true;
        this.random = Math.random()
    }

    fpsControl(fps) {
        this.fps++;
        if (this.fps > fps) {
            this.fps = 0;
            if (this.frame === 0) {
                this.random = Math.random();
            }
            if (!this.alive) {
                this.frame >= this.sprite.maxFrame ? this.frame = this.sprite.maxFrame : this.frame++;
            } else {
                this.frame++;
                if (this.frame > this.sprite.maxFrame) this.frame = 0
            }
        }
    }

    setup(x) {
        this.fpsControl(20);
        this.ctx.save();
        this.ctx.globalAlpha = this.transparent;
        this.ctx.scale(this.dir, 1);
        this.ctx.drawImage(this.sprite.image, this.sprite.w * this.frame, 0, this.sprite.w, this.sprite.h, this.dir * this.x, this.y, this.dir * this.rw, this.rh);
        this.ctx.restore();
    }


    stun() {
        this.sprite.update("stun");
    }

    shot() {
        this.sprite.update("shot");
    }


    toggleStatus(maxTime, type) {
        if (this.counter > maxTime) {
            switch (type) {
                case "attack":
                    this.attack = !this.attack;
                    break;
                case "move":
                    this.dull = false;
                    this.attack = true;
                    break;
                case "block":
                    this.blocked = false;
                    break;
            }
            this.counter = 0;
        }
    }

    updateAttackSprite() {
        const idx = Math.floor(Math.random() * 3);
        this.currentAttack = this.aType[idx];
    }

    attacksound() {
            this.playSound('./asset/sound/punch_hit.mp3');
    }

    updateX(x, speed, dir = 1) {
        if (this.x < x) this.x += speed * dir;
        else this.x -= speed * dir
    }

    update(x) {
        this.sControl = true;
        if (!this.dull && !this.blocked) {
            if (this.sControl) {
                console.log('hit here', this.bullet);
                this.attacksound();
                this.sControl = false;
            }
            if (this.attack) {
                if (this.currentAttack === "special_kick") {
                    this.updateX(x, 1)
                }
                this.sprite.update(`${this.currentAttack}`);
            }
            else if (Math.abs(this.x - x) > 240) {
                if (this.random < 0.4) {
                    this.sprite.update("shot");
                    if  (this.frame === 0) {
                        this.bullet = new Bullet(this.ctx, this.x, this.y, -1);
                    }
                } else {
                    this.updateX(x, this.move);
                    this.sprite.update("moving");
                }
            }
            else if (Math.abs(this.x - x) > 90) {
                if (this.random < 0.4) {
                    this.updateX(x, this.move);
                    this.sprite.update("moving");
                } else {
                    this.updateX(x, this.stop);
                    this.sprite.update();
                }
            } else {
                this.sprite.update();
            }
        } else {
            if (this.blocked) {
                this.sprite.update("block");
                this.toggleStatus(15, "block");
            } else if (this.dull) {
                this.sprite.update("stun");
                this.toggleStatus(3, "move");
            }
            this.counter++;
            this.updateAttackSprite();
        }
        if (this.bullet) {
            this.bullet.draw()
        }
    }

    updateDir(x) {
        if (x > this.x) this.dir = 1;
        else this.dir = -1;
    }

    end() {
        this.transparent -= 0.05;
        this.sprite.update("dead");
    }

    draw(x) {
        this.updateDir(x);
        this.setup(x);
        if (!this.alive) {
            this.end()
        }
    }


};
