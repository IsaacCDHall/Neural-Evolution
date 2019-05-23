import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <div className='heading'>
      <style jsx>{`
        
        h1 {
          font-size: 75px;
          margin: 20px 60px 20px 60px;
          padding: 5px 0px 5px 0px;
          border: 5px #9D5A63 solid;
          background: rgba(0,0,0,.3);
          text-shadow: black 4px 4px 0px;
        }
      `}</style>
      <h1>Isaac</h1>
    </div>
  );
}

export default Header;
