import React from 'react';
import DisplayData from './DisplayData';
import RocketGA, { GlobalSketchVars } from './RocketGA';
import ToBe from './ToBe';
import P5Wrapper from 'react-p5-wrapper';
import ChangeTest from './ChangeTest';

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTest: null,
      tests: {
        "RocketGA": RocketGA,
        "ToBe": ToBe
      },
      iterations: [],
    };
    this.handleTestClick = this.handleTestClick.bind(this);
    this.handleIterations = this.handleIterations.bind(this);
  }
  handleTestClick(testString) {
    this.setState({ currentTest: testString })
  }
  handleIterations(newIteration) {
    const newState = [...this.state.iterations, newIteration];
    this.setState({ iterations: newState });
  }

  render() {
    const { tests, currentTest, iterations } = this.state;
    return (
      <div className='container'>
        <style jsx>{`

            .container {
              border: 5px solid green;
            }
            .MonkeyRocket {
              cursor: pointer;
              color: white;
              background: #9D5A63;
              width: 150px;
              padding: 5px 20px 5px 20px;
              margin: 0 30px 0px 30px;
              display: inline-block;
              text-shadow: black 2px 2px 0px;
            }
            .MonkeyRocket:hover {
              text-decoration: underline;
              font-weight: bold;
              color: #F39E02;
              background: rgb(100, 78, 91);
            }
            .MonkeyRocket:active {
              color: pink;
            }

            .row {
              border: 40px solid pink;

            }



          `}</style>



        <div className='row'>
          <div className='MonkeyRocket' onClick={() => this.handleTestClick('RocketGA')}>

            Rockets

          </div>

        <div className='MonkeyRocket' onClick={() => this.handleTestClick('ToBe')}>

            Monkeys


        </div>

          <div className='col'>
            <div>

            {this.state.currentTest ? <P5Wrapper sketch={tests[currentTest]} handleIterations={this.handleIterations} /> : null}
            </div>
          </div>
          <div className='col'>
            <DisplayData iterations={iterations} />
            <ChangeTest />
          </div>
        </div>
      </div>
    );
  }
}

export default Data;
