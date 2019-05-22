import React from 'react';

function NavLink(props) {

  return (
    <React.Fragment>
      <style jsx>{`
      .link {
        color: white;
        background: #9D5A63;
        padding: 5px 20px 5px 20px;
        width: 150px;
      }
      .link:hover {
        font-weight: bold;
        color: #F39E02;
        background: rgb(100, 78, 91);
      }
      `}</style>
      <h3 className='link'>{props.text}</h3>
    </React.Fragment>
  );
}

export default NavLink;