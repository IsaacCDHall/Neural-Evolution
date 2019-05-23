export class RocketIteration {
  constructor(totalPop, totalCrashed, totalCompleted, averageFitness, generation) {
    this.totalPop = totalPop;
    this.totalCrashed = totalCrashed;
    this.totalCompleted = totalCompleted;
    this.averageFitness = averageFitness;
    this.totalDQ = this.totalPop - this.totalCrashed - this.totalCompleted;
    this.generation = generation;
  }
}
