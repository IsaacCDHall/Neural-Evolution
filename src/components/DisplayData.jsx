import React from 'react';


function DisplayData(props) {

  function formatDecimals(flt) {
    var splitStr = flt.toString().split('.'),
      whole = (flt * 100) | 0;

    if (splitStr.length > 1 && splitStr[1].length > 2) {
      return splitStr[1][2] > 4 ? (whole + 1) / 100 : whole / 100;
    } else {
      return flt;
    }
  }
  return (
    <div>
      <style jsx>{`
        th {
          text-decoration: underline;
          border: 1px solid #F39E02;
        }
        table {
          display: block;
          height: 400px;
          // overflow-y: scroll;
          margin: 0px auto;
        }
      `}</style>
      {props.iterations.length > 0 ?
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Gen#</th>
              <th scope="col">Qty</th>
              <th scope="col">Fitness</th>
              <th scope="col">NoComplete</th>
              <th scope="col">Complete</th>
              <th scope="col">Crashed</th>
            </tr>
          </thead>
          <tbody>
            {props.iterations.map((iteration) => (
              <tr key={iteration.generation}>
                <td>{iteration.generation}</td>
                <td>{iteration.totalPop}</td>
                <td>{formatDecimals(iteration.averageFitness * 100 * iteration.totalPop)} / {iteration.totalPop * 100}</td>
                <td>{iteration.totalNoComplete}</td>
                <td>{iteration.totalCompleted}</td>
                <td>{iteration.totalCrashed}</td>
              </tr>
            ))}
          </tbody>
        </table>
        : null}
    </div>
  );
}

export default DisplayData;