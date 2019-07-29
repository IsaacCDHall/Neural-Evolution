import P5 from 'p5';
import { Pipe } from './pipe';
import { Bird } from './bird';
var globalAny = global;
new P5((p5) => {
    const pipes = [];
    const birds = [];
    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, 600);
        p5.background(0);
        globalAny.p5 = p5; // This is bad practice...
        // Create pipes
        var spacing = 200;
        for (var i = 0; i < 100; i++) {
            var x = 300 + i * spacing * 2;
            // var gap = Math.max(50, 100-i*10);
            var height = p5.height / 2 + Math.sin(Math.PI * i / 10) * p5.height / 4;
            var pipe = new Pipe(p5.createVector(x, height), 200);
            pipes.push(pipe);
        }
        // Create birds
        for (var i = 0; i < 1; i++) {
            birds.push(new Bird(p5.createVector(50, 250 + i * 50))); // p5.random(0,p5.height))));
        }
    };
    var xOffset = 0;
    p5.draw = () => {
        p5.translate(-xOffset, 0);
        p5.background(0);
        // birds[0].pos.set(p5.mouseX,p5.mouseY);
        pipes.forEach(pipe => pipe.draw());
        birds.forEach(bird => {
            bird.update();
            bird.draw();
            bird.checkCollidePipes(pipes);
            bird.sensePipes(pipes);
        });
        var avgBirdX = birds.filter(b => b.alive).map(b => b.pos.x).reduce((a, b) => a + b, 0);
        if (avgBirdX - 100 > xOffset)
            xOffset += 5;
    };
});
