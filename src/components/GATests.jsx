import React from 'react';
import { Link } from 'react-router-dom';

function GATests() {

  return (
    <div className='heading'>
      <style jsx>{`
        .heading {
          padding: 20px 0 20px 0;
          text-align: center;
        }
        h1 {
          font-size: 75px;
        }
        .link-class {
          color: white;
        }
      `}</style>
      <h1>Genetic Algorithms</h1>
      <h3><Link className='link-class' to="/">Home</Link> | <Link className='link-class' to="/data">Data</Link></h3>
    </div>
  );
}

export default GATests;