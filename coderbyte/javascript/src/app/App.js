import "../css/App.css";
import ArrayChallenge from "./ArrayChallenge";

function App() {
  const width = "200px";
  const height = "200px";
  return (
    <div className="App">
      <header className="App-header">
        <p>Hi there !</p>
        <p>javacsript challenge</p>
      </header>
      <aside>
        <p>
          <ArrayChallenge />
        </p>
      </aside>
    </div>
  );
}

export default App;
