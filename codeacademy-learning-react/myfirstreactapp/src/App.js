import logo from "./logo.svg";
import "./App.css";
import Random from "./RandomColorPicker/Random";
import Clock from "./Clock";

function App() {
  const width = "200px";
  const height = "200px";
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          width={width}
          height={height}
        />
        <p>Hello Codecademy!</p>
        <p>
          <Random />
        </p>
        <p>
          <Clock />
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
