export class DNA {
  constructor(p, lifespan, newGenes) {
    this.p = p;
    this.lifespan = lifespan;
    this.genes = newGenes || this.generateDNA();
  }

  generateDNA() {
    let genes = [];
    for (let i = 0; i < this.lifespan; i++) {
      genes[i] = this.p.createVector(this.p.random(-1, 1), this.p.random(-1, 1));
      genes[i].setMag(0.2);
    }
    return genes;
  }


  crossOver(otherDNA) {
    let newGenes = [];
    // let mid = Math.floor(Math.random() * this.genes.length);
    let mid = Math.random();
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() > .50) {
      // if (i > mid) {
        newGenes[i] = this.genes[i];
      } else {
        newGenes[i] = otherDNA.genes[i];
      }
    }
    return new DNA(this.p, this.lifespan, newGenes);
  }

  mutation() {
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < 0.001) {
        console.log("                                                                  mutated");
        this.genes[i] = this.p.createVector(this.p.random(-1, 1), this.p.random(-1, 1));
        this.genes[i].setMag(0.2);        
      }
    }
  }


}
