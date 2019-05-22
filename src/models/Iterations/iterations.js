export class RocketIteration {
  constructor(totalPop, totalCrashed, totalCompleted, averageFitness, generation) {
    this.totalPop = totalPop;
    this.totalCrashed = totalCrashed;
    this.totalCompleted = totalCompleted;
    this.averageFitness = averageFitness;
    this.totalNoComplete = this.totalPop - this.totalCompleted;
    this.generation = generation;
  }
}
