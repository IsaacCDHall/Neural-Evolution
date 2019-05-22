// import p5 from '../../node_modules/p5/lib/p5.min.js';
import { DNA } from './dna';

export class Rocket {
  constructor(p, lifespan, newDNA) {
    this.p = p;
    this.h = 25;
    this.w = 5;
    this.pos = p.createVector(p.width / 2, p.height - 2);
    this.vel = p.createVector();
    this.acc = p.createVector();
    this.dna = newDNA || new DNA(p, lifespan);
    this.fitness = 0;
    this.completed = false;
    this.crashed = false;
    this.count = lifespan;
    this.lifespan = lifespan;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  calcFitness(target) {
    let distance = this.p.dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = this.p.map(distance, 0, this.p.width, this.p.width, 0);
    if (this.completed) {
      this.fitness = this.fitness * 20 * (this.lifespan / this.count);
      // console.log("completed at ", distance, this.count, this.fitness);
    } else if (this.crashed) {
      this.fitness = (this.fitness / 2) * (this.count / this.lifespan);
      // console.log("crashed at ", distance, this.count, this.fitness);
    } else {
      this.fitness = this.fitness;
      // console.log("other at ", distance, this.count, this.fitness);
    }
  }

  update(count, target, rect) {
    if (this.p.dist(this.pos.x, this.pos.y, target.x, target.y)) {
      if (!this.completed && !this.crashed) {
        let distance = this.p.dist(this.pos.x, this.pos.y, target.x, target.y);
        if (distance < 25) {
          this.completed = true;
          this.count = count;
          this.pos = target.copy();
        }

        if (this.pos.x > rect.x && this.pos.x < rect.x + rect.w && this.pos.y > rect.y && this.pos.y < rect.y + rect.h) {
          this.crashed = true;
          this.count = count;
        }
        if (this.pos.x > this.p.width || this.pos.x < 0 || this.pos.y > this.p.height || this.pos.y < 0) {
          this.crashed = true;
          this.count = count;
        }

        this.applyForce(this.dna.genes[count]);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.limit(4);
      }
    }
  }

  show() {
    this.p.push();
    this.p.noStroke();
    this.p.translate(this.pos.x, this.pos.y);
    this.p.rotate(this.vel.heading());
    this.p.rectMode(this.p.CENTER);
    this.p.rect(0, 0, this.h, this.w);
    this.p.pop();
  }
}