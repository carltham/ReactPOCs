import React from 'react';
import ReactDOM from 'react-dom';

const h1 = <h1>Hello world</h1>;

const navBar = <nav>I am a nav bar</nav>;
const myTeam = {
  center: <li>Benzo Walli</li>,
  powerForward: <li>Rasha Loa</li>,
  smallForward: <li>Tayshaun Dasmoto</li>,
  shootingGuard: <li>Colmar Cumberbatch</li>,
  pointGuard: <li>Femi Billon</li>,
};

const myArticle = <article>TTTT</article>;

const title = <h1 id="title">Introduction to React.js: Part I</h1>;
const sideLength = '50px';
const panda = (
  <img
    src="images/panda.jpg"
    alt="panda"
    width={sideLength}
    height={sideLength}
  />
);
const p1 = <p id="large">foo</p>;
const p2 = <p id="small">bar</p>;
const theExample = (
  <a href="https://www.example.com">
    <h1>Click me!</h1>
  </a>
);
const myDiv = (
  <div>
    <h1>containing the text Hello world</h1>{' '}
  </div>
);
const blog = (
  <div>
    <img src="pics/192940u73.jpg" />
    <h1>Welcome to Dan's Blog!</h1>
    <article>
      Wow I had the tastiest sandwich today. I{' '}
      <strong>literally</strong> almost freaked out.
    </article>
  </div>
);
const myDiv2 = <div className="big">I AM A BIG DIV</div>;
const pics = {
  panda: 'http://bit.ly/1Tqltv5',
  owl: 'http://bit.ly/1XGtkM3',
  owlCat: 'http://bit.ly/1Upbczi',
};

const panda2 = (
  <img
    src={pics.panda}
    alt="Lazy Panda"
    width={sideLength}
    height={sideLength}
  />
);

const owl = (
  <img
    src={pics.owl}
    alt="Unimpressed Owl"
    width={sideLength}
    height={sideLength}
  />
);

const owlCat = (
  <img
    src={pics.owlCat}
    alt="Ghastly Abomination"
    width={sideLength}
    height={sideLength}
    onMouseOver={myFunc}
  />
);
function myFunc() {
  alert(
    'Make myFunc the pFunc... omg that was horrible i am so sorry'
  );
}
const pics2 = {
  kitty:
    'https://content.codecademy.com/courses/React/react_photo-kitty.jpg',
  doggy:
    'https://content.codecademy.com/courses/React/react_photo-puppy.jpeg',
};
var picture;
function coinToss() {
  // This function will randomly return either 'heads' or 'tails'.
  return Math.random() < 0.5 ? 'heads' : 'tails';
}
if (coinToss() === 'heads') {
  picture = pics2.kitty;
} else {
  picture = pics2.doggy;
}
const selectedPic = (
  <img src={picture} width={sideLength} height={sideLength} />
);

const strings = ['Home', 'Shop', 'Contact us', 'About Me'];

const listItems = strings.map((string) => (
  <li key={string}>{string}</li>
));

const h1_2 = React.createElement('h1', null, 'Hello again, world');

class Lession1and2 extends React.Component {
  render() {
    return (
      <div>
        {h1}
        <h1>Hello world 2</h1>
        <a href="http://www.example.com">Welcome to the Web</a>;
        {title}
        {panda}
        <nav>
          {p2} {p1}
        </nav>
        {theExample}
        {myDiv}
        {blog}
        <br />
        {myDiv2}
        {panda2}
        {owl}
        {owlCat}
        {selectedPic}
        <ul>{listItems}</ul>;{h1_2}
      </div>
    );
  }
}

export default Lession1and2;
