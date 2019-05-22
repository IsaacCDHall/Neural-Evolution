import { GlobbalSketchVest } from './RocketGA';
import { Population } from '../models/ToBe/population';

export default function ToBe(p) {
  let target, mutationRate, population, maxPop;
  GlobbalSketchVest.restart();
  let gVars = Object.assign({}, GlobbalSketchVest);
  // let f = p.createFont("Courier", 32, true);

  p.setup = function () {
    p.createCanvas(gVars.CANVAS_WIDTH, gVars.CANVAS_HEIGHT);
    target = "You should hire Isaac.";
    mutationRate = 0.01;
    maxPop = 350;

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
      p.text(p.nf((p.millis() / 1000.0), 0, 2) + " secs", 20, 225);
      p.noLoop();
    }
  }

  p.displayInfo = function() {
    p.background(205);
    // Display current status of populationation
    let answer = population.getBest();
    // p.textFont(f);
    p.textAlign(p.LEFT);
    p.fill(0);


    p.textSize(16);
    p.text("Best phrase:",20,30);
    p.textSize(32);
    p.text(answer, 20, 75);

    p.textSize(12);
    p.text("total generations: " + population.getGenerations(), 20, 140);
    p.text("average fitness: " + p.nf(population.getAverageFitness(), 0, 2), 20, 155);
    p.text("total populationation: " + maxPop, 20, 170);
    p.text("mutation rate: " + (mutationRate * 100) + "%", 20, 185);

    p.textSize(10);
    p.text("All phrases:\n" + population.allPhrases(), 450, 10);
  }
}
