!function(t){var s={};function i(e){if(s[e])return s[e].exports;var h=s[e]={i:e,l:!1,exports:{}};return t[e].call(h.exports,h,h.exports,i),h.l=!0,h.exports}i.m=t,i.c=s,i.d=function(t,s,e){i.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:e})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,s){if(1&s&&(t=i(t)),8&s)return t;if(4&s&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(i.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var h in t)i.d(e,h,function(s){return t[s]}.bind(null,h));return e},i.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(s,"a",s),s},i.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},i.p="",i(i.s=0)}([function(t,s,i){"use strict";i.r(s);class e{constructor(){this.restart=!1,this.input={LEFT:!1,RIGHT:!1,DOWN:!1,ATTACK:!1,REVIVE:!1,KICK:!1,SHOOT:!1,SPECIAL:!1},this.attack=!1,this.disable=!1,this.counter=0}gameControl(){this.input.REVIVE=!1}movement(t=[65,68,84,89,85]){this.disable||(document.addEventListener("keydown",s=>{switch(s.keyCode){case t[0]:this.input.LEFT=!0;break;case 83:case 40:this.input.DOWN=!0;break;case t[1]:this.input.RIGHT=!0;break;case t[2]:this.attack=!0,this.counter++,this.counter>2?this.input.ATTACK=!1:this.input.ATTACK=!0;break;case t[3]:this.attack=!0,this.counter++,this.counter>3?this.input.KICK=!1:this.input.KICK=!0;break;case t[4]:this.input.SPECIAL=!0}}),document.addEventListener("keyup",s=>{switch(s.keyCode){case t[0]:this.input.LEFT=!1;break;case 40:case 83:this.input.DOWN=!1;break;case t[1]:this.input.RIGHT=!1;break;case t[2]:this.attack=!1,this.input.ATTACK=!1,this.counter=0;break;case t[3]:this.attack=!1,this.input.KICK=!1,this.counter=0;break;case t[4]:this.input.SPECIAL=!1}}))}}var h=class{constructor(){this.sound=document.createElement("audio"),this.sound.setAttribute("preload","auto"),this.sound.setAttribute("controls","none"),this.sound.style.display="none"}play(t){this.sound.src=t,this.sound.play().then(()=>console.log())}stop(){this.sound.pause()}};var a=class{constructor(t,s,i,e){this.ctx=t,this.w=40,this.h=40,this.x=s+50*e,this.y=i+35,this.speed=10*e,this.image=new Image,this.image.src=e>0?"./asset/bullet.png":"./asset/bullet_left.png",this.hit=!1,this.collide=!1,this.sound=new h,this.m=!0}shoot(){this.ctx.drawImage(this.image,this.x,this.y,this.w,this.h),this.x+=this.speed}playSound(){this.sound.play("./asset/sound/hadouken.mp3")}draw(){this.collide||this.shoot()}};class r{constructor(t){this.char=t,this.image=new Image,this.image.src=`./asset/${this.char}/idle.png`,this.frame=0,this.maxFrame=3,this.image.onload=()=>{this.w=this.image.width/(this.maxFrame+1),this.h=this.image.height}}update(t){if("ken"===this.char)switch(t){case"special_kick":this.maxFrame=5,this.image.src=`./asset/${this.char}/${t}.png`;break;case"kick":case"moving":this.maxFrame=4,this.image.src=`./asset/${this.char}/${t}.png`;break;case"stun":case"dead":this.maxFrame=3,this.image.src=`./asset/${this.char}/${t}.png`;break;case"punch":case"win":this.maxFrame=2,this.image.src=`./asset/${this.char}/${t}.png`;break;case"shot":this.maxFrame=1,this.image.src=`./asset/${this.char}/${t}.png`;break;case"block":this.maxFrame=0,this.image.src=`./asset/${this.char}/${t}.png`;break;default:this.maxFrame=3,this.image.src=`./asset/${this.char}/idle.png`}if("ryu"===this.char)switch(t){case"special_kick":this.maxFrame=5,this.image.src=`./asset/${this.char}/${t}.png`;break;case"moving":this.maxFrame=4,this.image.src=`./asset/${this.char}/${t}.png`;break;case"kick":case"punch":case"shot":case"stun":case"win":this.maxFrame=2,this.image.src=`./asset/${this.char}/${t}.png`;break;case"block":this.maxFrame=0,this.image.src=`./asset/${this.char}/${t}.png`;break;case"dead":this.maxFrame=3,this.image.src=`./asset/${this.char}/${t}.png`;break;default:this.maxFrame=3,this.image.src=`./asset/${this.char}/idle.png`}}}class n{constructor(t,s,i,e){this.ctx=t,this.x=s,this.y=i,this.len=e,this.fixlen=e,this.center=(this.x+this.fixlen)/2}draw(t="yellow"){this.ctx.fillStyle="red",this.ctx.fillRect(this.center,this.y,this.fixlen,30),this.ctx.fillStyle=t,this.ctx.fillRect(this.center,this.y,this.len,30),this.ctx.strokeStyle="white",this.ctx.lineWidth=2,this.ctx.strokeRect(this.center,this.y,this.fixlen,30)}block(t=.05){this.len-=t}hit(t=1){this.len-=t}}var o=class{constructor(t,s=300,i,a){this.ctx=t,this.draw=this.draw.bind(this),this.keyboard=new e,this.frame=0,this.rw=140,this.rh=160,this.x=s,this.y=300,this.speed=0,this.stop=0,this.move=5,this.bullet=null,this.fps=0,this.stun=!1,this.block=!1,this.sprite=new r(i),this.dir=a,this.temp="",this.desc="",this.sControl=!0,this.bControl=!0,this.sound=new h,this.delay=0,this.dead=!1,this.gravity=.05,this.gravitySpeed=0}fpsControl(t){this.fps++,this.desc!==this.temp&&(this.desc=this.temp,this.frame=0),this.fps>t&&(this.fps=0,this.dead?this.frame>=this.sprite.maxFrame?this.frame=this.sprite.maxFrame:this.frame++:(this.frame++,this.frame>this.sprite.maxFrame&&(this.frame=0)))}draw(){this.fpsControl(10),this.bullet&&this.bullet.draw(),this.ctx.save(),this.ctx.scale(this.dir,1),this.ctx.drawImage(this.sprite.image,this.sprite.w*this.frame,0,this.sprite.w,this.sprite.h,this.dir*this.x,this.y,this.dir*this.rw,this.rh),this.ctx.restore()}updateDir(t){this.x<t?(this.dir=1,this.keyboard.input.LEFT&&this.dullMove(t)&&(this.speed=-this.move)):(this.keyboard.input.RIGHT&&this.dullMove(t)&&(this.speed=this.move),this.dir=-1)}moveAction(t){this.keyboard.input.LEFT||this.keyboard.input.RIGHT?(this.block?(this.sprite.update("block"),this.temp="block",this.sControl&&(this.sound.play("./asset/sound/block.wav"),this.sControl=!1),this.move=.5):(this.sprite.update("moving"),this.temp="moving",this.move=5,this.sControl=!0),this.updateDir(t),this.keyboard.input.LEFT&&!this.dullMove(t)?this.speed=-this.move:this.keyboard.input.RIGHT&&!this.dullMove(t)&&(this.speed=this.move)):this.stun&&(this.sprite.update("stun"),this.temp="stun",this.move=0,this.frame===this.sprite.maxFrame&&(this.stun=!1))}specialAction(){this.keyboard.input.SPECIAL&&(this.keyboard.input.ATTACK&&!this.keyboard.input.KICK?(this.sprite.update("shot"),this.temp="shot",this.bullet||(this.bullet=new a(this.ctx,this.x,this.y,this.dir)),this.keyboard.input.SHOOT&&(this.bullet.playSound(),this.keyboard.input.SHOOT=!1),this.delay++,this.delay>20&&(this.keyboard.input.SPECIAL=!1,this.keyboard.input.ATTACK=!1)):!this.keyboard.input.ATTACK&&this.keyboard.input.KICK?(this.sprite.update("special_kick"),this.temp="special_kick",this.delay++,this.x+=2*this.dir,this.delay>40&&(this.keyboard.input.SPECIAL=!1,this.keyboard.input.KICK=!1)):(this.delay=0,this.keyboard.input.SHOOT=!0))}attackAction(){this.keyboard.input.ATTACK&&!this.stun?(this.sprite.update("punch"),this.temp="punch"):this.keyboard.input.KICK&&!this.stun&&(this.sprite.update("kick"),this.temp="kick"),this.specialAction()}action(t){this.sprite.update(),this.speed=this.stop,this.moveAction(t),this.attackAction()}dullMove(t){return Math.abs(this.x-t)<90}borderLimit(){this.x>875&&(this.keyboard.input.LEFT?this.speed=-this.move:this.speed=0),this.x<0&&(this.keyboard.input.RIGHT?this.speed=this.move:this.speed=0)}playSound(t){this.sControl&&(this.sound.play(t),this.sControl=!1)}meleeSound(t){!this.keyboard.input.ATTACK&&!this.keyboard.input.KICK||this.keyboard.input.SPECIAL?this.keyboard.input.KICK&&this.keyboard.input.SPECIAL?this.playSound("./asset/sound/s_kick.mp3"):this.sControl=!0:Math.abs(this.x-t.x)<100?this.playSound("./asset/sound/punch_hit.wav"):this.playSound("./asset/sound/punch_miss.wav")}rangeSound(t){this.bullet&&(Math.abs(this.bullet.x-t.x)<50||this.bullet.x>1e3||this.bullet.x<0?(this.bControl&&(this.bControl=!1),this.bullet.collide=!0,this.bullet=null):this.bControl=!0)}soundControl(t){this.meleeSound(t),this.rangeSound(t)}update(t=0){this.action(t),this.borderLimit(),this.x+=this.speed,this.gravitySpeed+=this.gravity,this.y+=this.gravitySpeed,this.hitBottom()}hitBottom(){this.y>300&&(this.y=300,this.gravitySpeed=0)}removePlayer(){this.sprite.update("dead"),this.dead=!0}win(){this.sprite.update("win"),this.dead=!0}};var p=class{constructor(t){this.ctx=t,this.p1=new o(this.ctx,300,"ken",1),this.p2=new o(this.ctx,700,"ryu",-1),this.p1.keyboard.movement(),this.p2.keyboard.movement([37,39,74,75,76]),this.p1hp=new n(this.ctx,0,50,250),this.p2hp=new n(this.ctx,1e3,50,250),this.over=!1,this.time=99}stunned(){this.p1.keyboard.attack&&(this.p2.stun=!0,this.p2.x++),this.p2.keyboard.attack&&(this.p1.stun=!0,this.p1.x--)}bulControl(t,s){t&&(Math.abs(t.x-s.x)<100?this.p2.keyboard.input.RIGHT?this.p2.block=!0:this.p1.keyboard.input.LEFT?this.p1.block=!0:s.stun=!0:s.stun=!1)}fightControl(){this.p2.block=!1,this.p1.block=!1,Math.abs(this.p1.x-this.p2.x)<100&&(this.p1.keyboard.attack||this.p2.keyboard.attack)&&(this.p1.keyboard.attack&&this.p2.keyboard.input.RIGHT&&(this.p2.block=!0,this.p2.x++),this.p2.keyboard.attack&&this.p1.keyboard.input.LEFT&&(this.p1.block=!0,this.p1.x--),this.stunned()),this.bulControl(this.p1.bullet,this.p2),this.bulControl(this.p2.bullet,this.p1)}hpControl(){this.p1.stun&&this.p1hp.hit(),this.p1.block&&this.p1hp.block(),this.p2.stun&&this.p2hp.hit(),this.p2.block&&this.p2hp.block()}playersCollision(){this.fightControl(),this.p1.soundControl(this.p2),this.p2.soundControl(this.p1),this.hpControl()}draw(){this.p1.draw(),this.p2.draw(),this.p1hp.draw(),this.p2hp.draw()}update(){this.p1.update(this.p2.x),this.p2.update(this.p1.x),this.playersCollision()}gameover(){this.ctx.font="40px Acme",this.ctx.fillStyle="red",this.ctx.textAlign="center",this.ctx.fillText("You Win",500,150)}gamefun(){this.p1hp.len>=0&&this.p2hp.len>=0&&this.time>0?this.update():this.gameover(),this.draw(),this.gameConstraint()}gameConstraint(){this.p1hp.len<=0?(this.p2.win(),this.p1.removePlayer(),this.over=!0):this.p2hp.len<=0&&(this.p1.win(),this.p2.removePlayer(),this.over=!0)}};class l{constructor(t){this.ctx=t,this.maxWidth=1e3,this.maxHeight=500,this.image=new Image,this.image.src="https://i.pinimg.com/originals/91/64/01/9164016aa77fa969f71800b9ba8c32b4.gif"}draw(){this.ctx.drawImage(this.image,0,0,this.maxWidth,this.maxHeight)}}class c extends o{constructor(t,s){super(),this.x=t,this.ctx=s,this.rw=140,this.rh=160,this.y=300,this.alive=!0,this.frame=0,this.transparent=1,this.fps=0,this.dir=1,this.attack=!1,this.counter=0,this.sprite=new r("ryu"),this.aType=["punch","kick","special_kick"],this.currentAttack="kick",this.dull=!1,this.blocked=!1,this.stop=0,this.move=2,this.bullet=null,this.sControl=!0,this.random=Math.random()}fpsControl(t){this.fps++,this.fps>t&&(this.fps=0,0===this.frame&&(this.random=Math.random()),this.alive?(this.frame++,this.frame>this.sprite.maxFrame&&(this.frame=0)):this.frame>=this.sprite.maxFrame?this.frame=this.sprite.maxFrame:this.frame++)}setup(t){this.fpsControl(20),this.ctx.save(),this.ctx.globalAlpha=this.transparent,this.ctx.scale(this.dir,1),this.ctx.drawImage(this.sprite.image,this.sprite.w*this.frame,0,this.sprite.w,this.sprite.h,this.dir*this.x,this.y,this.dir*this.rw,this.rh),this.ctx.restore()}stun(){this.sprite.update("stun")}shot(){this.sprite.update("shot")}toggleStatus(t,s){if(this.counter>t){switch(s){case"attack":this.attack=!this.attack;break;case"move":this.dull=!1,this.attack=!0;break;case"block":this.blocked=!1}this.counter=0}}updateAttackSprite(){const t=Math.floor(3*Math.random());this.currentAttack=this.aType[t]}attacksound(){this.playSound("./asset/sound/punch_hit.mp3")}updateX(t,s,i=1){this.x<t?this.x+=s*i:this.x-=s*i}update(t){this.sControl=!0,this.dull||this.blocked?(this.blocked?(this.sprite.update("block"),this.toggleStatus(15,"block")):this.dull&&(this.sprite.update("stun"),this.toggleStatus(3,"move")),this.counter++,this.updateAttackSprite()):(this.sControl&&(console.log("hit here",this.bullet),this.attacksound(),this.sControl=!1),this.attack?("special_kick"===this.currentAttack&&this.updateX(t,1),this.sprite.update(`${this.currentAttack}`)):Math.abs(this.x-t)>240?this.random<.4?(this.sprite.update("shot"),0===this.frame&&(this.bullet=new a(this.ctx,this.x,this.y,-1))):(this.updateX(t,this.move),this.sprite.update("moving")):Math.abs(this.x-t)>90?this.random<.4?(this.updateX(t,this.move),this.sprite.update("moving")):(this.updateX(t,this.stop),this.sprite.update()):this.sprite.update()),this.bullet&&this.bullet.draw()}updateDir(t){t>this.x?this.dir=1:this.dir=-1}end(){this.transparent-=.05,this.sprite.update("dead")}draw(t){this.updateDir(t),this.setup(t),this.alive||this.end()}}var d=class{constructor(t){this.ctx=t,this.test=100,this.kill=0,this.player=new o(this.ctx,300,"ken",1),this.enemy=new c(800,this.ctx),this.player.keyboard.movement(),this.image=new Image,this.sound=new h,this.p1Hp=new n(this.ctx,0,50,250),this.enemyHp=new n(this.ctx,1e3,50,250),this.playSound=!0,this.enemyStr=1,this.respTime=30,this.prop=Math.random(),this.hitChance=.3,this.sound=new h,this.splay=!0,this.start=!1,this.round=1,this.counter=0}gameover(){this.image.src="https://static.comicvine.com/uploads/original/11111/111112704/3860536-ron_vs_ken_by_eastmonkey.jpg",this.ctx.drawImage(this.image,0,0,1e3,500),this.ctx.font="40px StreetFighter",this.ctx.fillStyle="black",this.ctx.textAlign="center",this.ctx.fillText("Game Over",500,150),this.totalScore()}totalScore(){this.test--,0===this.test&&this.sound.play("./asset/sound/game_finished.wav"),this.test<=20&&this.ctx.fillText(`Total Kill : ${this.kill}`,500,290)}playerToEnemy(){this.player.keyboard.input.ATTACK||this.player.keyboard.input.KICK?this.enemydead(this.player.x,90):this.player.bullet&&this.enemydead(this.player.bullet.x,80)}enemyToPlayer(){Math.abs(this.enemy.x-this.player.x)<100?((this.enemy.dull||this.enemy.blocked)&&(this.enemy.attack=!1),this.enemy.toggleStatus(this.respTime,"attack"),this.enemy.counter++,this.enemy.attack&&(this.player.keyboard.input.LEFT?this.player.x<this.enemy.x&&(this.player.block=!0,this.p1Hp.block()):this.player.keyboard.input.RIGHT?this.player.x>this.enemy.x&&(this.player.block=!0,this.p1Hp.block()):(this.p1Hp.hit(this.enemyStr),this.player.stun=!0))):this.enemy.bullet?Math.abs(this.enemy.bullet.x-this.player.x)<100&&(this.enemy.bullet.collide=!0,this.player.keyboard.input.LEFT?this.player.x<this.enemy.x&&(this.player.block=!0,this.p1Hp.block()):this.player.keyboard.input.RIGHT?this.player.x>this.enemy.x&&(this.player.block=!0,this.p1Hp.block()):(this.p1Hp.hit(this.enemyStr),this.player.stun=!0),this.enemy.bullet=null):this.enemy.attack=!1}collision(){this.playerToEnemy(),this.enemyToPlayer()}enemydead(t,s=90){Math.abs(t-this.enemy.x)<s?(this.prop>this.hitChance?(this.enemy.dull=!0,this.enemyHp.hit()):(this.enemy.blocked=!0,this.enemyHp.block()),this.enemyHp.len<=0&&(this.enemy.alive=!1),this.player.keyboard.input.KICK&&this.player.keyboard.input.SPECIAL&&this.enemy.updateX(this.player.x,1,-2)):this.prop=Math.random()}getRand(t){return this.enemy.x=Math.random()>.5?0:1e3,this.enemy.x}respawn(){this.enemy.transparent<=0&&(this.sound.play("./asset/sound/die.wav"),this.enemyHp.len=200,this.enemy=new c(800,this.ctx),this.enemyStr+=.1,this.respTime--,this.hitChance+=.02,this.round++)}pHp(){this.ctx.fillStyle="red",this.p1Hp.draw("yellow"),this.enemyHp.draw("yellow")}setup(){this.pHp(),this.player.draw(),this.enemy.draw(this.player.x)}update(){this.roundText(),this.player.soundControl(this.enemy),this.player.update(this.enemy.x),this.collision(),this.player.keyboard.disable=this.player.stun}roundFinished(){this.player.win(),this.start=!1,this.splay&&(this.sound.play("./asset/sound/youwin.wav"),this.splay=!1)}roundText(){this.ctx.textAlign="center",this.ctx.fillStyle="red",this.ctx.fillText(`Round ${this.round}`,500,60,60)}draw(){this.p1Hp.len<=0?this.gameover():(this.setup(),this.enemy.alive?this.update():this.roundFinished(),this.start&&this.enemy.update(this.player.x))}};var u=class{constructor(t){this.ctx=t,this.background=new l(this.ctx),this.play=this.play.bind(this),this.input=new e,this.input.gameControl(),this.fps=0,this.image=new Image,this.image.src="https://i.pinimg.com/originals/f6/c4/51/f6c4516c11809f1b3550e0c68abfef89.gif",this.test=70,this.time=60,this.training=!1,this.vs=!1,this.vsMode=null,this.trainMode=null,this.round=1,this.box=[],this.canvas=document.getElementById("MyCanvas"),this.transparent=1,this.textX=1e3,this.sound=new h,this.sControl=!1}intro(){this.image.onload=()=>{this.ctx.drawImage(this.image,0,0,1e3,500),this.ctx.font="40px StreetFigther",this.ctx.fillStyle="black",this.ctx.textAlign="center",this.ctx.fillText("Best Street Fighter",500,200),this.ctx.font="20px Acme",this.setup()}}mouseEvent(){this.canvas.addEventListener("mousemove",t=>{this.canvas.style.cursor="default",this.box.forEach(s=>{t.layerX>=s.x-s.w&&t.layerX<=s.x+s.w&&t.layerY>=s.y-s.h&&t.layerY<=s.y+s.h&&(this.input.restart||(this.canvas.style.cursor="pointer"))})},!1)}clickEvent(){this.canvas.addEventListener("click",t=>{this.box.forEach(s=>{t.layerX>=s.x-s.w&&t.layerX<=s.x+s.w&&t.layerY>=s.y-s.h&&t.layerY<=s.y+s.h&&(this.input.restart||("vs"===s.mode?(this.vs=!0,this.input.restart=!0,this.vsMode=new p(this.ctx)):"train"===s.mode&&(this.trainMode=new d(this.ctx),this.input.restart=!0,this.training=!0)))})},!1)}createBox(t,s,i,e,h){this.ctx.font="20px StreetFighter",this.ctx.fillText(t,s,i);const a={x:s,y:i,h:e,w:this.ctx.measureText(t).width/2,mode:h};this.box.push(a)}setup(){this.createBox("1 Player Mode",500,300,20,"train"),this.createBox("2 Player Mode",500,350,20,"vs")}clock(){this.ctx.textAlign="center",this.ctx.fillStyle="red",this.ctx.font="40px Acme",this.fps++,this.fps>70&&(this.time--,this.fps=0),this.ctx.fillText(`${this.time}`,500,60)}roundStart(){this.ctx.save(),this.ctx.font="70px StreetFighter",this.ctx.fillStyle="black",this.ctx.fillText(` Round ${this.round} Start`,this.textX,150),this.textX-=10,this.ctx.restore(),this.textX<=0?this.trainMode.start=!0:this.sControl=!0}play(){this.input.restart&&(this.clock(),this.background.draw(),this.roundStart(),this.training?this.trainMode.draw():this.vs&&this.vsMode.gamefun()),requestAnimationFrame(this.play)}};var m=class{constructor(){this.bgm=document.getElementById("myAudio"),this.bgsound=document.getElementById("music-button"),this.icon=document.getElementById("icon")}musicAction(){this.bgsound.addEventListener("click",()=>{this.bgm.paused?(this.bgm.play(),this.icon.className="fas fa-volume-up"):(this.bgm.pause(),this.icon.className="fas fa-volume-off")})}};document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("MyCanvas");t.width=1e3,t.height=500;const s=t.getContext("2d"),i=new u(s),e=new m;i.intro(),i.mouseEvent(),i.clickEvent(),e.musicAction(),i.play()})}]);
//# sourceMappingURL=bundle.js.map