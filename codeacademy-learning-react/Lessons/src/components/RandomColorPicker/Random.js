import React from "react";
import Button from "./Button";

class Random extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: [100, 25, 25] };
    this.handleClick = this.handleClick.bind(this);
  }

  applyColor() {
    const color = this.formatColor(this.state.color);
    document.body.style.background = color;
  }

  chooseColor() {
    const random = [];
    for (let i = 0; i < 3; i++) {
      random.push(Math.floor(Math.random() * 256));
    }
    return random;
  }

  componentDidMount() {
    this.applyColor();
  }

  componentDidUpdate(prevProps, prevState) {
    this.applyColor();
  }
  componentWillUnmount() {
    cancelFetch(this.fetchID);
  }

  formatColor(ary) {
    return "rgb(" + ary.join(", ") + ")";
  }

  handleClick() {
    this.setState({ color: this.chooseColor() });
    console.log("this=", this);
    console.log("this.state=", this.state);
    console.log("this.state.color=", this.state.color);
  }

  isLight() {
    const rgb = this.state.color;
    return rgb.reduce((a, b) => a + b) < 127 * 3;
  }

  render() {
    return (
      <div>
        <h1 className={this.isLight() ? "white" : "black"}>
          Your color is {this.formatColor(this.state.color)}.
          <br />
          <Button onClick={this.handleClick} light={this.isLight()} />
        </h1>
      </div>
    );
  }
}

export default Random;
