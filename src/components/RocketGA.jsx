import { Rocket } from '../models/Rockets/rocket';
import { RocketIteration } from '../models/Iterations/iterations';

export let GlobbalSketchVest = {
  CANVAS_HEIGHT: 500,
  CANVAS_WIDTH: 900,
  POPULATION_SIZE: 25,
  LIFESPAN: 350,
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
  let target = p.createVector(650, 150);
  let matingPool = [];
  let totalDist = 0;
  let recievedProps;
  let rect = {
    x: 445,
    y: 250,
    w: 300,
    h: 30
  };
  let completed = false;
  let angle = 0;


  p.setup = function () {
    p.createCanvas(gVars.CANVAS_WIDTH, gVars.CANVAS_HEIGHT);
    const containerDiv = p.createDiv(null).addClass('canvas-info');
    lifeP = p.createP().addClass('canvas-line').parent(containerDiv);
    generationP = p.createP().addClass('canvas-line').parent(containerDiv);
    gameOver = p.createP(null).addClass('canvas-line').parent(containerDiv);
    p.createFirstPopulation();
    p.updateStats();
    p.angleMode(p.DEGREES);
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
    console.log("iter", gVars.GENERATION)
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
        p.background(4,15,15, 4);




        p.fill(255,0,255);
        p.rect(rect.x, rect.y, rect.w, rect.h );






        p.translate(0, -1.5)
        p.ellipse(target.x, target.y, 30, 30);

        p.fill(0,255,0, 80);
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

        let lifeExpect =  Math.round((gVars.COUNT / gVars.LIFESPAN) * 10);

        lifeP.html('Life Time Completion: ' + lifeExpect + '/10');

      }
    }
    if (completed) {
      gameOver.html('So.. How about that Job, huh?')
    }
  };
}
