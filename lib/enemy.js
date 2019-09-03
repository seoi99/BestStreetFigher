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
        this.y = 280;
        this.alive = true;
        this.frame = 0;
        this.transparent = 1;
        this.fps = 0;
        this.dir = 1;
        this.attack = false;
        this.counter = 0;
        this.sprite = new Sprite('ryu');
        this.aType = ['punch', 'kick'];
        this.currentAttack = "kick";
        this.dull = false;
        this.blocked = false;
        this.stop = 0;
        this.chance = 0;

        this.imagePosX = this.sprite.x;
        this.imagePosY = this.sprite.y;
        this.w = this.sprite.w;
        this.h = this.sprite.h;

        this.move = 2;
        this.bullet = null;
        this.sControl = true;
        this.random = Math.random()
        this.onGround = false;
        this.jumpPower = -8;
        this.dy = 0;
        this.world = {
            gravity: 0.2, // strength per frame of gravity
            drag: 0.999, // play with this value to change drag
            groundDrag: 0.9, // play with this value to change ground movement
            ground: 400,
        }
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
                if (this.frame >= this.sprite.maxFrame) this.frame = 0;
            }
        }
    }

    setup(x) {
        this.sprite.frame = this.frame;
        this.imagePosX = this.sprite.x;
        this.imagePosY = this.sprite.y;
        this.w = this.sprite.w;
        this.h = this.sprite.h;
        this.fpsControl(10);
        this.ctx.save();
        this.ctx.scale(this.dir,1);
        this.ctx.globalAlpha = this.transparent;
        this.ctx.drawImage(this.sprite.image, this.imagePosX, this.imagePosY, this.w, this.h, this.dir * this.x,this.y, this.dir * this.w * 2, this.h * 2);
        this.ctx.restore();
    }

    toggleStatus(maxTime, type) {
        if (this.counter > maxTime) {
            switch (type) {
                case "attack":
                    this.attack = !this.attack;
                    break;
                case "move":
                    this.dull = false;
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
            if (Math.abs(this.x - x) > 240) {
                if (this.random < 0.1) {
                    this.sprite.update("shot");
                    if (this.bullet === null) {
                    if  (this.frame === 0) {
                        this.playSound('./asset/sound/hadouken.mp3');
                        this.bullet = new Bullet(this.ctx, this.x, this.y, this.dir);
                    } else if (this.frame >= this.sprite.maxFrame) {
                        this.sprite.update();
                    }
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
                }
                else {
                    this.updateX(x, this.stop);
                    this.sprite.update();
                }
            } else {
                if (this.random < 0.3) {
                    this.attack = true;
                    this.sprite.update("punch");
                } else {
                    this.attack = false;
                    this.sprite.update();
                }
            }
        } else {
            if (this.blocked) {
                this.toggleStatus(20, "block")
                this.sprite.update("block");
            } else if (this.dull) {
                this.sprite.update("stun");
                this.toggleStatus(20, "move");
        }
            this.counter++;
            console.log(this.blocked, this.dull)
        if (this.bullet) {
            this.bullet.draw()
        }
        }
    }
    playSound(src) {
        if (this.sControl) {
            this.sound.play(src);
            this.sControl = false;
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
