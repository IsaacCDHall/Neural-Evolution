import React from 'react';
import { GlobbalSketchVest } from './RocketGA';

class ChangeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test1: {
        CANVAS_HEIGHT: 400,
        CANVAS_WIDTH: 800,
        POPULATION_SIZE: 25,
        LIFESPAN: 300,
        COUNT: 0,
        ROCKETS: [],
        GENERATION: 1,
        MAX_FIT: 0,
        AVG_FIT: 0,
      },
      content: ''
    };
    this._content = null;
    this.handleChange = this.handleChange.bind(this);
    this.reRunTest = this.reRunTest.bind(this);
  }
  handleChange(event) {
    this.setState({ content: event.target.value });
    console.log(GlobbalSketchVest);
    GlobbalSketchVest.LIFESPAN = event.target.value;
  }

  reRunTest(event) {
    event.preventDefault();
    console.log(this._content.value);
    // props.addPost({
    //   content: _content.value,
    // });
    this._content.value = '';
  }

  render() {
    return (
    ''
    );
  }
}

export default ChangeTest;
