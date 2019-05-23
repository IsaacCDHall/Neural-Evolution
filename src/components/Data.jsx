import React from 'react';
import DisplayData from './DisplayData';
import RocketGA from './RocketGA';
import ToBe from './ToBe';
import P5Wrapper from 'react-p5-wrapper';

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
              background: #248232;
              width: 200px;
              padding: 5px 20px 5px 20px;
              margin: 0 30px 0px 30px;
              font-size: 36px;
              transition: .6s;
            }
            .MonkeyRocket:hover {
              color: #FCFFFC;
              background: #2BA84A;
            }
            .MonkeyRocket:active {
              color: black;
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
        </div>
      </div>
    );
  }
}

export default Data;
