import React from "react";
import ReactDOM from "react-dom";
import { CopyCat } from "../components/CopyCat";

class CopyCatContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copying: true,
      input: "",
    };

    this.toggleTape = this.toggleTape.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("event" + event);
    console.log("event.target" + event.target);
    console.log("event.target.value" + event.target.value);
    this.setState({ input: event.target.value });
  }

  toggleTape() {
    this.setState({ copying: !this.state.copying });
  }

  render() {
    const copying = this.state.copying;
    const toggleTape = this.toggleTape;

    return (
      <CopyCat
        copying={copying}
        toggleTape={toggleTape}
        input={this.state.input}
        onChange={this.handleChange}
      />
    );
  }
}

ReactDOM.render(<CopyCatContainer />, document.getElementById("app"));
