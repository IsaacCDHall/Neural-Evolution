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
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() > .50) {
        newGenes[i] = this.genes[i];
      } else {
        newGenes[i] = otherDNA.genes[i];
      }
    }
    return new DNA(this.p, this.lifespan, newGenes);
  }

  mutation() {
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < 0.0002) {
        console.log("mutated");
        this.genes[i] = this.p.createVector(this.p.random(-1, 1), this.p.random(-1, 1));
        this.genes[i].setMag(0.2);
      }
    }
  }


}
