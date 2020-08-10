import React, { Component } from 'react';
import { Stage, Layer, Circle} from 'react-konva';
import Konva from 'konva';
import './App.css';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state={isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(
      {isToggleOn: !this.state.isToggleOn}
    );
  }

  render() {
    let btn_class=this.state.isToggleOn ? 'App-header-blue' : 'App-header-red';
    return (

      <button className={btn_class} onClick={this.handleClick}>
        {this.state.isToggleOn ? 'App-header-blue' : 'App-header-red'}
      </button>
    );
  }
}
//

class Bubble extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      radius: props.r,
      op: props.op,
      speed: 0.8}

    this.tick=this.tick.bind(this);
    this.collision=this.collision.bind(this);
  };

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 5
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);

  }

  collision(){
    if (this.state.y+this.state.radius >= window.innerHeight || this.state.y < 0)
      this.setState({speed: this.state.speed*-1})
  }

  tick() {
    this.setState(
      {y: this.state.y+this.state.speed}
    );
    this.collision();
  }


  render(){
    return(
      <Circle
      x={this.state.x} 
      y={this.state.y} 
      radius={this.state.radius} 
      fill="red"
      stroke="black"
      opacity={this.state.op}
      strokeWidth={1} />
      )
  }
}

let bubbles = [];
  for (let i=0; i<50; i++) {
    let x = Math.random()*window.innerWidth;
    let y = Math.random()*window.innerHeight;
    let r = Math.random()*50;
    let op = Math.random()*1
    bubbles[i] = <Bubble key={i} x={x} y={y} r={r} op={op}/>
    bubbles.push(bubbles[i])
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Welcome to obi</h2>
        <Toggle />
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {bubbles}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default App;
