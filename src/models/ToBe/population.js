import { ToBeDNA } from './dna';
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

export class Population {
  constructor(p, target, mutationRate, maxPop) {
    this.p = p;
    this.target = target;
    this.mutationRate = mutationRate;
    this.population = new ToBeDNA(this.p, target.length);
    for (let i = 0; i < maxPop; i++) {
      this.population.genes[i] = new ToBeDNA(this.p, this.target.length);
    }
    this.calcFitness();
    this.matingPool = new ToBeDNA(this.p);
    this.finished = false;
    this.generations = 0;
    // 484 currently
    this.perfectScore = 1;
  }
  // if calcDnaFitness this.fitness = score * score, then we use this for perfect, otherwise 1
    // this.perfectScore = this.p.pow(this.target.length, 2);


  // Fill our fitness array with a value for every member of the population
  calcFitness() {
    for (let i = 0; i < this.population.genes.length; i++) {
      this.population.genes[i].calcDnaFitness(this.target, this.p);

    }
  }

  // Generate a mating pool
  naturalSelection() {
    // Clear the ArrayList
    this.matingPool = [];

    let maxFitness = 0;
    for (let i = 0; i < this.population.genes.length; i++) {
      if (this.population.genes[i].fitness > maxFitness) {
        maxFitness = this.population.genes[i].fitness;
      }
    }

    for (let i = 0; i < this.population.genes.length; i++) {
      let fitness = this.p.map(this.population.genes[i].fitness, 0, maxFitness, 0, 1);
      let n = fitness * 100;
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population.genes[i]);
      }
    }
    // console.log(this.matingPool.length)
  }

  // Create a new generation
  generate() {
    // Refill the population with children from the mating pool
    for (let i = 0; i < this.population.genes.length; i++) {
      let m = Math.floor(this.p.random(this.matingPool.length));
      let d = Math.floor(this.p.random(this.matingPool.length));
      //Could specify here that let b should not be the same as let a, but it's cool
      let mom = this.matingPool[m];
      let dad = this.matingPool[d];
      let child = mom.crossover(dad);
      child.mutate(this.mutationRate);
      this.population.genes[i] = child;
    }
    this.generations++;
  }


  // Compute the current "most fit" member of the population
  getBest() {
    let record = 0;
    let index = 0;
    for (let i = 0; i < this.population.genes.length; i++) {
      if (this.population.genes[i].fitness > record) {
        index = i;
        record = this.population.genes[i].fitness;
        console.log(record)
      }
    }

    if (record === this.perfectScore) {
      this.finished = true;
    }
    return this.population.genes[index].genes.join('');
  }

  finished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }

  // Compute average fitness for the population
  getAverageFitness() {
    let total = 0;
    for (let i = 0; i < this.population.genes.length; i++) {
      total += this.population.genes[i].fitness;
    }
    return total / (this.population.genes.length);
  }

  allPhrases() {
    let everything = "";

    let displayLimit = this.p.min(this.population.genes.length, 50);


    for (let i = 0; i < displayLimit; i++) {
      everything += this.population.genes[i].genes.join('') + "\n";
    }
    return everything;
  }
}
