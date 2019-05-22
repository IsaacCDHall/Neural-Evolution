import { Rocket } from '../models/Rockets/rocket';
import { RocketIteration } from '../models/Iterations/iterations';

export let GlobbalSketchVest = {
  CANVAS_HEIGHT: 400,
  CANVAS_WIDTH: 800,
  POPULATION_SIZE: 25,
  LIFESPAN: 300,
  COUNT: 0,
  ROCKETS: [],
  GENERATION: 1,
  MAX_FIT: 0,
  AVG_FIT: 0,
  restart: function () {
    this.COUNT = 0;
    this.ROCKETS = [];
    this.GENERATION = 1;
    this.MAX_FIT = 0;
    this.AVG_FIT = 0;
  },
  rocketIterations: []
};

export default function RocketGA(p) {
  console.log(p);
  let lifeP, generationP, gameOver;
  GlobbalSketchVest.restart();
  let gVars = Object.assign({}, GlobbalSketchVest);
  let target = p.createVector(50, 50);
  let matingPool = [];
  let totalDist = 0;
  let recievedProps;
  let rect = {
    x: 350,
    y: 100,
    w: 20,
    h: 200
  };
  let completed = false;
  

  p.setup = function () {
    p.createCanvas(gVars.CANVAS_WIDTH, gVars.CANVAS_HEIGHT);
    const containerDiv = p.createDiv(null).addClass('canvas-info');
    lifeP = p.createP().addClass('canvas-line').parent(containerDiv);
    generationP = p.createP().addClass('canvas-line').parent(containerDiv);
    gameOver = p.createP(null).addClass('canvas-line').parent(containerDiv);
    p.createFirstPopulation();
    p.updateStats();
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    recievedProps = props;
  };

  p.createFirstPopulation = function () {
    gVars.ROCKETS = [];
    for (let i = 0; i < gVars.POPULATION_SIZE; i++) {
      gVars.ROCKETS[i] = new Rocket(p, gVars.LIFESPAN);
    }
  };

  p.performSelection = function () {
    let maxFit = 0;
    matingPool = [];
    console.log("iteration", gVars.GENERATION)
    for (let i = 0; i < gVars.ROCKETS.length; i++) {
      gVars.ROCKETS[i].calcFitness(target, gVars.COUNT);
      if (gVars.ROCKETS[i].fitness > maxFit) {
        maxFit = gVars.ROCKETS[i].fitness;
      }
    }
    for (let i = 0; i < gVars.POPULATION_SIZE; i++) {
      gVars.ROCKETS[i].fitness /= maxFit;
    }
    for (let i = 0; i < gVars.POPULATION_SIZE; i++) {
      let n = gVars.ROCKETS[i].fitness * 100;
      for (let j = 0; j < n; j++) {
        matingPool.push(gVars.ROCKETS[i]);
      }
    }
    gVars.MAX_FIT = maxFit;
    totalDist += maxFit;
    gVars.AVG_FIT = totalDist / gVars.GENERATION;
  };

  p.endOfLife = function () {
    let newRockets = [];
    if (matingPool.length / (gVars.POPULATION_SIZE * 100) > .95) {
      completed = true;
    }
    for (let i = 0; i < gVars.POPULATION_SIZE; i++) {
      const a = p.random(matingPool);
      let b = p.random(matingPool);
      let parentADNA = a.dna;
      let parentBDNA = b.dna;

      let childDNA = parentADNA.crossOver(parentBDNA);
      childDNA.mutation();
      newRockets[i] = new Rocket(p, gVars.LIFESPAN, childDNA);
    }
    gVars.ROCKETS = newRockets;
  };

  p.updateStats = function () {
    generationP.html('Generation: ' + gVars.GENERATION);
  };

  p.calcStats = function () {
    let totalCrashed = 0;
    let totalCompleted = 0;
    let statAvgFitness = 0;
    for (let i = 0; i < gVars.ROCKETS.length; i++) {
      /*eslint no-unused-expressions: [0, { "allowTernary": true }]*/
      gVars.ROCKETS[i].crashed ? totalCrashed++ : null;
      gVars.ROCKETS[i].completed ? totalCompleted++ : null;
      statAvgFitness += gVars.ROCKETS[i].fitness;
    }
    statAvgFitness /= gVars.ROCKETS.length;
    const newIt = new RocketIteration(gVars.ROCKETS.length, totalCrashed, totalCompleted, statAvgFitness, gVars.GENERATION);
    recievedProps.handleIterations(newIt);
    GlobbalSketchVest.rocketIterations.push(newIt);
  }

  p.draw = function () {
    if (!completed) {
      for (let a = 0; a < 2; a++) {
        p.background(100, 78, 91);
        p.fill(105, 181, 163);
        p.rect(rect.x, rect.y, rect.w, rect.h);
        p.ellipse(target.x, target.y, 25, 25);
        p.fill(243, 158, 2);
        gVars.COUNT++;
        if (gVars.COUNT >= gVars.LIFESPAN) {
          p.performSelection();
          p.calcStats();
          p.updateStats();
          p.endOfLife();
          gVars.GENERATION++;
          gVars.COUNT = 0;
        }

        for (let i = 0; i < gVars.ROCKETS.length; i++) {
          gVars.ROCKETS[i].update(gVars.COUNT, target, rect);
          gVars.ROCKETS[i].show();
        }
        lifeP.html('Lifespan: ' + gVars.COUNT + ' / ' + gVars.LIFESPAN);
      }
    }
    if (completed) { 
      gameOver.html('End of Test!!')
    }
  };
}