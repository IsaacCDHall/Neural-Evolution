import { GlobbalSketchVest } from './RocketGA';
import { Population } from '../models/ToBe/population';

export default function ToBe(p) {
  console.log(p)
  let target, mutationRate, population, maxPop;
  GlobbalSketchVest.restart();
  let gVars = Object.assign({}, GlobbalSketchVest);
  // let f = p.createFont("Courier", 32, true);

  p.setup = function () {
    p.createCanvas(gVars.CANVAS_WIDTH, gVars.CANVAS_HEIGHT);
    target = "Hook me up with a job";
    mutationRate = 0.001;
    maxPop = 300;

    // Create a populationation with a target phrase, mutation rate, and populationation max
    population = new Population(p, target, mutationRate, maxPop);
  };

  p.draw = function () {

    // Generate mating pool
    population.naturalSelection();
    //Create next generation
    population.generate();

    //fitness happens first theorhetically, but dont switch it
    // Calculate fitness
    population.calcFitness();
    p.displayInfo();

    // If target phrase, stop
    if (population.finished) {

      p.textSize(32);
      p.fill(75,181,67);
      p.text(p.nf((p.millis() / 1000.0), 0, 2) + " secs", 20, 315);
      p.noLoop();
    }
  }

  p.displayInfo = function() {
    p.background('100%');
    // Display current status of populationation
    let answer = population.getBest();
    // p.textFont(f);
    p.textAlign(p.LEFT);
    p.fill(1);


    p.textSize(20);
    p.text("Fittest Phrase:",20,35);
    p.textSize('200%');
    p.text(answer, 20, 90);

    p.textSize(20);
    p.text("Total Generations: " + population.getGenerations(), 20, 140);
    p.text("Average Fitness: " + p.nf((population.getAverageFitness() * 100), 0, 2 )+ '%', 20, 175);
    p.text("Generational Population: " + maxPop, 20, 210);
    p.text("Mutation Rate: " + (mutationRate * 100) + "%", 20, 245);

    p.textSize(16);
    p.text("All Phrases (this generation) :\n\n" + population.allPhrases(), 450, 35);
  }
}
