
import { collisionRectRect } from './collision';
export class Bird {
    constructor(pos) {
        this.size = 30;
        this.alive = true;
        this.gravity = 0.1;
        this.speed = 3;
        this.lift = 3;
        this.pos = pos;
        this.vel = p5.createVector(this.speed, 0); //p5.random(-1,1));
        this.acc = p5.createVector(0, this.gravity);
        p5.keyPressed = () => {
            if (p5.keyCode === 32)
                this.flap();
        };
    }
    draw() {
        p5.push();
        p5.fill(this.alive ? 255 : 64);
        p5.noStroke();
        p5.translate(this.pos.x, this.pos.y);
        p5.rotate(this.vel.heading());
        p5.triangle(0, 0 - this.size / 2, this.size, 0, 0, 0 + this.size / 2);
        p5.circle(0, 0, this.size);
        p5.pop();
    }
    flap() {
        this.vel.y = -this.lift;
    }
    update() {
        if (!this.alive)
            return;
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        if (this.pos.y < 0 || this.pos.y >= p5.height)
            this.alive = false;
    }
    checkCollidePipes(pipes) {
        var collide = pipes.some(p => this.checkCollidePipe(p));
        if (collide)
            this.alive = false;
        return collide;
    }
    checkCollidePipe(pipe) {
        var top = pipe.topRect;
        var bot = pipe.bottomRect;
        // p5.push();
        // p5.stroke(255,0,0);
        // p5.noFill();
        // p5.rect(top.x,top.y, top.w,top.h);
        // p5.rect(bot.x,bot.y, bot.w,bot.h);
        // p5.rect(this.pos.x-this.size/2, this.pos.y-this.size/2, this.size,this.size);
        // p5.pop();
        return this.checkCollide(top.x, top.y, top.w, top.h) || this.checkCollide(bot.x, bot.y, bot.w, bot.h);
    }
    checkCollide(x, y, w, h) {
        return collisionRectRect(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size, x, y, w, h);
    }
    sensePipes(pipes) {
        var pipe = pipes.filter(p => p.pos.x + p.width / 2 >= this.pos.x).sort((a, b) => a.pos.x - b.pos.x)[0];
        var distX = p5.width;
        var distY = p5.height;
        if (pipe) {
            p5.circle(pipe.pos.x, pipe.pos.y, 16);
            distX = pipe.pos.x - this.pos.x;
            distY = pipe.pos.y - this.pos.y;
            console.log('distX=%o,\t distY=%o', distX, distY);
            // this.acc.y *= 0.01;
            // this.acc.y = distY/100000;
        }
        // if(distY>10) this.acc.y = distY/100;
        // if(distY<-10) this.acc.y = -0.05;
        // if(distY<200 && pipe.fromTop)  this.vel.y =  2;
    }
}
