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
              max-width: 90%;
              margin: auto;
            }
            .MonkeyRocket {
              display: inline-block;
              cursor: pointer;
              color: #2D3A3A;
              background: #2BA84A;
              width: 200px;
              padding: 5px 20px 5px 20px;
              margin: 0 30px 0px 30px;
              font-size: 36px;
            }
            .MonkeyRocket:hover {
              text-decoration: underline;
              font-weight: bold;
              color: #FCFFFC;
              background: rgb(100, 155, 91);
            }
            .MonkeyRocket:active {
              color: pink;
            }




          `}</style>
        <div>
          <div className='MonkeyRocket' onClick={() => this.handleTestClick('RocketGA')}>

            Rockets

          </div>

          <div className='MonkeyRocket' onClick={() => this.handleTestClick('ToBe')}>

            Monkeys


          </div>

        </div>
        <br/>
        <br/>

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
    );
  }
}

export default Data;
