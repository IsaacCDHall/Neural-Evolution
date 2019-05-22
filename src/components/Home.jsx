import React from 'react';
import About from './About';
import References from './References';

function Home() {

  return (
    <div className='container body'>
      <style jsx>{`
    .body {
      padding: 20px 0 20px 0;
      text-align: center;
      font-family: 'Atomic Age', cursive;
    }
    h1 {
      font-size: 75px;
    }
    .link-class {
      color: white;
    }
  `}</style>
      <About />
      <References />
    </div>
  );
}

export default Home;
