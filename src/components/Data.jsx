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
            .col {
              display: inline-block;
            }
            .test-class {
              cursor: pointer;
              color: white;
              background: #9D5A63;
              width: 150px;
              padding: 5px 20px 5px 20px;              
              word-spacing: 50px;
              margin: 0 30px 0px 30px;
              display: inline-block;
              text-shadow: black 2px 2px 0px;
            }
            .test-class:hover {
              text-decoration: underline;
              font-weight: bold;
              color: #F39E02;
              background: rgb(100, 78, 91);
            }
            .test-link {
              margin: 25px 25px 25px 25px;
              width: 100%;
            }
            .row {
              // padding-left: 38px;
            
            }
            .canvas-style {
              // width: 100px;
              // height:100px;
              // margin: 0px auto;

            }


          `}</style>
        <div className='row'>
          <h3 className='test-link'><span className='test-class' onClick={() => this.handleTestClick('RocketGA')}>Rockets</span><span className='test-class' onClick={() => this.handleTestClick('ToBe')}>ToBe</span></h3>
          <div className='col'>
            <div className='canvas-style'>

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