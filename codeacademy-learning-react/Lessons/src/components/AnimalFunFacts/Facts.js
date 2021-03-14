import React from "react";
import ReactDOM from "react-dom";
import { animals } from "./animals";

export default function App() {
  const imageWidth = "50px";
  let showBackground = true;

  const title = "";
  const animalFacts = (
    <div>
      <h1>{title === "" ? "Click an animal for a fun fact" : title}</h1>
      <p id="fact"></p>
    </div>
  );

  const background = (
    <img
      id="background"
      class="background"
      alt="ocean"
      src="/images/ocean.jpg"
    />
  );

  const getAnimalsArray = () => {
    var animalsArray = [];
    Object.keys(animals).forEach(function (key) {
      animalsArray.push({ name: key, animal: animals[key] });
    });
    return animalsArray;
  };

  const getAnimalsFactsFor = (name) => {
    let foundAnimal;
    var animalsArray = Object.keys(animals).filter((key, value) => {
      if (!foundAnimal && key === name) {
        foundAnimal = animals[key];
      }
      return key === name;
    });

    return foundAnimal;
  };

  function createImages(data) {
    return (
      <img
        key={data.name}
        className="animal"
        alt={data.name}
        src={data.animal.image}
        aria-label={data.name}
        role="button"
        width={imageWidth}
        height={imageWidth}
        onClick={displayFact}
      />
    );
  }

  function displayFact(e) {
    let key = e.target.alt;
    document.getElementById("fact").innerHTML = getAnimalsFactsFor(key).facts;
  }

  const handleSwitchBackground = (event) => {
    showBackground = !showBackground;
    var img = document.getElementById("background");
    img.style.visibility = showBackground ? "visible" : "hidden";
  };

  return (
    <div>
      {animalFacts}
      <button id="backgroundSwitch" onClick={handleSwitchBackground}>
        Background switch
      </button>
      {background}
      <div id="background" className="animals">
        {getAnimalsArray().map(createImages, this)}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
