import React from 'react';


function DisplayData(props) {
  console.log(props);
  function percentCalc(x, y){
    return Math.round((x * y / y) * 100);
  }
  return (
    <div>
      <style jsx>{`
          .tableSpace{
            display: flex;
            justify-content: center;
            margin: auto;
            width: 100vw;
            max-width: 100%;
          }
        th {
          padding: 15px;
          font-size: 30px;

        }
        table {
          text-align: center;
          width: 35%;
          // overflow-y: scroll;
          margin:auto;
        }
        tr{
          border: 1px solid green;

        }
        td{
          font-size: 36px;

        }
      `}</style>
      <div className="tableSpace">
        {props.iterations.length > 0 ?
          <table>
            <thead>
              <tr>
                <th scope="col">Gen#</th>
                <th scope="col">Pop</th>
                <th scope="col">Fitness</th>
                <th scope="col">Complete</th>
                <th scope="col">Crashed</th>
                <th scope="col">DQ'd</th>
              </tr>
            </thead>
            <tbody>

              {props.iterations.map((iteration) => (
                <tr key={iteration.generation}>
                  <td>{iteration.generation}</td>
                  <td>{iteration.totalPop}</td>
                  <td>{percentCalc(iteration.averageFitness, iteration.totalPop) + '%'}</td>
                  <td>{iteration.totalCompleted}</td>
                  <td>{iteration.totalCrashed}</td>
                  <td>{iteration.totalDQ}</td>
                </tr>
              ))}
            </tbody>
          </table>
          : null}
      </div>
    </div>
  );
}

export default DisplayData;
