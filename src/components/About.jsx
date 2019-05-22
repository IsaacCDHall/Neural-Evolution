import React from 'react';

function About() {

  return (
    <div>
      <style jsx>{`
        p {
          color: white;
          text-align: left;
          font-family: sans-serif;
        }
      `}</style>
      <h2>About</h2>
      <p>Genetic Alogrithms are commonly thought of as too complex to implement or even to learn about. They are basic biology. You have a sample population, they receieve a fitness score based on their results, they crossover their 'DNA' based on their fitness and likelyhood of reproducing. During that process a 'mutation' in the DNA can occur. Then a new population is produced and the whole cycle begins again. This website is about showing those results on screen. </p>
    </div>
  );
}

export default About;