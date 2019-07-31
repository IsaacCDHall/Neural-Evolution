import P5 from 'p5';
import 'p5/lib/addons/p5.dom';
import * as tf from '@tensorflow/tfjs';
import { Pipe } from './pipe';
import { Bird } from './bird';
import { Population } from './population';


"use strict";
const globalAny = global;
const pipes = [];
var pop;
var player;
var controls = {
    popSize: 100,
    mutRate: 0.01,
    mutSize: 0.1,
    speed: 5,
    gravity: 0.5,
    lift: 5,
    paused: false
};
new P5((p5) => {
    tf.setBackend('cpu');
    p5.setup = () => {
        var canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight - 180);
        canvas.parent('canvas');
        p5.background(0);
        globalAny.p5 = p5; // Hacky way to make p5 global...
        globalAny.tf = tf;
        setControls(controls);
        pop = new Population(controls.popSize);
        pop.mutationRate = controls.mutRate;
        pop.mutationSize = controls.mutSize;
        // Single player
        player = new Bird(p5.createVector(25, p5.height / 2 + 50));
        player.player = true;
        // insert pipes
        var spacing = 150;
        for (var i = 0; i < 100; i++) {
            var x = 500 + i * spacing * 2;
            // var gap = Math.max(50, 100-i*10);
            var height = p5.height / 2 + Math.sin(Math.PI * i / 4) * p5.height / 4 + p5.random() * Math.min(p5.height / 4, i * 5);
            var pipe = new Pipe(p5.createVector(x, height), Math.max(100, 300 - i * 5));
            pipe.text = '#' + (i + 1);
            pipes.push(pipe);
            //spacing -- makes it too difficult, below .5 is too easy
            spacing -= 0.7;
        }
        $('#restartBtn').click(() => restart());
        $('#pauseBtn').click(() => {
            if (controls.paused)
                p5.loop();
            else
                p5.noLoop();
            controls.paused = !controls.paused;
        });
    };
    var xOffset = 0;
    p5.draw = () => {
        p5.translate(-xOffset, 0);
        p5.background(0);
        pipes.forEach(pipe => pipe.draw());
        if (!pop)
            return;
        pop.birds.forEach(bird => {
            bird.update();
            bird.draw();
            bird.checkCollidePipes(pipes);
            bird.sensePipes(pipes);
        });
        if (player) {
            player.update();
            player.draw();
            player.checkCollidePipes(pipes);
        }
        var bestBird = pop.birds.sort((a, b) => b.pos.x - a.pos.x)[0];
        if (bestBird.pos.x > pop.bestDist)
            pop.bestDist = bestBird.pos.x;
        p5.push();
        p5.stroke(255, 0, 0);
        p5.line(pop.bestDist, 0, pop.bestDist, p5.height);
        p5.pop();
        if (pop.birds.every(b => !b.alive) && (!player || !player.alive)) {
            restart();
        }
        var aliveBirds = pop.birds.concat(player).filter(b => b.alive);
        var avgBirdX = aliveBirds.map(b => b.pos.x).reduce((a, b) => a + b, 0) / aliveBirds.length;
        xOffset = avgBirdX - 100;
        var stats = {
            generation: pop.generation,
            birds: pop.size,
            alive: aliveBirds.length,
            score: bestBird.pos.x,
            best: pop.bestDist
        };
        setStats(stats);
    };
});
function restart() {
    pop.calcFitness();
    console.log('Most Fit:', pop.birds.sort((a,b) => b.pos.x-a.pos.x)[0].dna.values);
    controls = getControls();
    pop.size = controls.popSize;
    pop.mutationRate = controls.mutRate;
    pop.mutationSize = controls.mutSize;
    pop.nextGen();
    pop.birds.concat(player).forEach(bird => {
        bird.speed = controls.speed;
        bird.gravity = controls.gravity;
        bird.lift = controls.lift;
        bird.reset();
    });
    if (player)
        player.reset();
    p5.loop();
}
function setStats(stats) {
    $('#generation').text(stats.generation);
    $('#alive').text(stats.alive);
    $('#score').text(stats.score);
    $('#bestScore').text(stats.best);
}
function setControls(controls) {
    $('#popSize').val(controls.popSize);
    $('#mutRate').val(controls.mutRate);
    $('#mutSize').val(controls.mutSize);
    $('#speed').val(controls.speed);
    $('#gravity').val(controls.gravity);
    $('#lift').val(controls.lift);
}
function getControls() {
    var controls = {
        popSize: +$('#popSize').val(),
        mutRate: +$('#mutRate').val(),
        mutSize: +$('#mutSize').val(),
        speed: +$('#speed').val(),
        gravity: +$('#gravity').val(),
        lift: +$('#lift').val(),
        paused: false
    };
    return controls;
}
