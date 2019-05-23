// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a psuedo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA
//      -- mutate DNA


export class ToBeDNA {
  constructor(p, targetLength) {
    this.p = p;
    this.possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .";
    this.genes = [];
    for (let i = 0; i < targetLength; i++) {
      this.genes[i] = this.possible[Math.floor(Math.random() * this.possible.length)];
      // console.log(this.genes);
      // Pick from range of chars
    }
    this.fitness= 0;
  }

  // Converts character array to a String
  getPhrase() {
    return this.genes.join('');
  }

  // Fitness function (returns floating point % of "correct" characters)
  calcDnaFitness(target, p) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === target[i]) {
        score++;
      }
    }
    this.fitness = score / target.length;
    // increases probability for best genes to pass on by ^squaring results
    this.fitness = p.pow(this.fitness, 2);
  }

  // Crossover
  crossover(partner) {
    // A new child
    let child = new ToBeDNA(this.p, this.genes.length);

    let midpoint = Math.floor(Math.random() * this.genes.length); // Pick a midpoint

    // Half from one, half from the other
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) {
        child.genes[i] = this.genes[i];
      } else {
        child.genes[i] = partner.genes[i];
      }
    }
    return child;
  }

  // Based on a mutation probability, picks a new random character
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < mutationRate) {
        this.genes[i] = this.possible[Math.floor(Math.random() * this.possible.length)];
      }
    }
  }
}
