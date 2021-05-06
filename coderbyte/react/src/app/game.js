import React, { createRef } from "react";

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
  boxShadow: "-30px -10px 10px #9E9E9E",
  position: "relative",
  float: "left",
  marginLeft: "auto",
  marginRight: "auto",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

const circleStyle = {
  width: 50,
  height: 50,
  borderRadius: 50 / 2,
  borderWidth: (50 * 5) / 100,
  borderStyle: "inset",
};

class Constants {
  static _CIRCLE = "circle";
  static _CROSS = "cross";
  static _NONE = "None";
}

class Calculator {
  searchWinner = (table) => {
    let isAWinner =
      this.searchWinnerInRows(table) ||
      this.searchWinnerInColumns(table) ||
      this.searchWinnerInDownDiagonal(table) ||
      this.searchWinnerInUpDiagonal(table);
    return isAWinner;
  };
  searchWinnerInRows = (table) => {
    let isAWinner;
    for (let rowNr = 0; rowNr < table.length; rowNr++) {
      isAWinner = true;
      const row = table[rowNr];
      let prevColShape;

      for (let colNr = 0; colNr < row.length; colNr++) {
        const col = table[rowNr][colNr];
        isAWinner =
          isAWinner &&
          col.shape !== null &&
          (!prevColShape || col.shape === prevColShape);
        prevColShape = col.shape;
      }
      if (isAWinner) {
        return isAWinner;
      }
    }
    return isAWinner;
  };
  searchWinnerInColumns = (table) => {
    let isAWinner;
    for (let colNr = 0; colNr < table[0].length; colNr++) {
      isAWinner = true;
      let prevRowShape;

      for (let rowNr = 0; rowNr < table.length; rowNr++) {
        const col = table[rowNr][colNr];

        isAWinner =
          isAWinner &&
          col.shape !== null &&
          (!prevRowShape || col.shape === prevRowShape);
        prevRowShape = col.shape;
      }
      if (isAWinner) {
        return isAWinner;
      }
    }
    return isAWinner;
  };
  searchWinnerInDownDiagonal = (table) => {
    let downGoingDiagonalWinner = true;

    let prevDownGoingDiagonalRowShape;
    for (let colNr = 0; colNr < table.length; colNr++) {
      const downGoingDiagonal = table[colNr][colNr];

      downGoingDiagonalWinner =
        downGoingDiagonalWinner &&
        downGoingDiagonal.shape !== null &&
        (!prevDownGoingDiagonalRowShape ||
          downGoingDiagonal.shape === prevDownGoingDiagonalRowShape);
      prevDownGoingDiagonalRowShape = downGoingDiagonal.shape;
    }

    return downGoingDiagonalWinner;
  };
  searchWinnerInUpDiagonal = (table) => {
    let upGoingDiagonalWinner = true;

    let prevUpGoingDiagonalRowShape;
    for (let colNr = 0; colNr < table.length; colNr++) {
      const upGoingDiagonal = table[colNr][table.length - 1 - colNr];

      upGoingDiagonalWinner =
        upGoingDiagonalWinner &&
        upGoingDiagonal.shape !== null &&
        (!prevUpGoingDiagonalRowShape ||
          upGoingDiagonal.shape === prevUpGoingDiagonalRowShape);
      prevUpGoingDiagonalRowShape = upGoingDiagonal.shape;
    }

    return upGoingDiagonalWinner;
  };
}

class Game extends React.Component {
  render = () => {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  };
}

class Board extends React.Component {
  bordData = [];
  _player;
  _winner;
  _calculator = new Calculator();
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.doReset();
    this.state = { bordData: this.bordData };
  }
  handleClick = (event) => {
    let selectedBoxString = event.currentTarget.id;
    let selectedBoxArray = selectedBoxString.split("-");
    let x = selectedBoxArray[0],
      y = selectedBoxArray[1];
    if (this._winner !== Constants._NONE || this.bordData[x][y].shape) {
      return;
    }
    this.bordData[x][y].shape = this._player;
    this.setState({ bordData: this.bordData });
    let isAWinner = this._calculator.searchWinner(this.bordData);
    if (isAWinner) {
      this._winner = this._player;
    }
    this._player =
      this._player === Constants._CROSS ? Constants._CIRCLE : Constants._CROSS;
    return this._player;
  };
  handleReset = () => {
    this.doReset();
    this.setState({ bordData: this.bordData });
  };
  doReset = () => {
    this.bordData = [];
    this._player =
      Math.floor(Math.random() * 2) === 0
        ? Constants._CIRCLE
        : Constants._CROSS;
    this._winner = Constants._NONE;
    const fields = [
      ["0-0", "0-1", "0-2"],
      ["1-0", "1-1", "1-2"],
      ["2-0", "2-1", "2-2"],
    ];
    fields.forEach((dataRow) => {
      let bordRow = [];
      dataRow.forEach((dataId) => {
        bordRow.push({ id: dataId, shape: null });
      });
      this.bordData.push(bordRow);
    });
  };
  render = () => {
    return (
      <div style={containerStyle} className="gameBoard">
        {this._winner !== Constants._NONE ? (
          <div id="winnerArea" className="winner" style={instructionsStyle}>
            Winner: <span>{this._winner}</span>
          </div>
        ) : (
          <div id="statusArea" className="status" style={instructionsStyle}>
            Next player: <span>{this._player}</span>
          </div>
        )}

        <button style={buttonStyle} onClick={this.handleReset}>
          Reset
        </button>
        <div style={boardStyle}>
          {this.state.bordData.map((row, index) => (
            <Row
              key={index}
              row={this.state.bordData[index]}
              handleClick={this.handleClick}
            />
          ))}
          {/* <Row row={this.state.bordData[0]} handleClick={this.handleClick} />
          <Row row={this.state.bordData[1]} handleClick={this.handleClick} />
          <Row row={this.state.bordData[2]} handleClick={this.handleClick} /> */}
        </div>
      </div>
    );
  };
}

class Row extends React.Component {
  render = () => {
    return (
      <div className="board-row" style={rowStyle}>
        {this.props.row.map((sqare, index) => (
          <Square
            key={index}
            boxId={sqare.id}
            handleClick={this.props.handleClick}
            shape={sqare.shape}
          />
        ))}
      </div>
    );
  };
}

class Square extends React.Component {
  renderSymbol = () => {
    if (this.props.shape === Constants._CROSS) {
      return <CanvasComponent />;
    } else if (this.props.shape === Constants._CIRCLE) {
      return <Circle />;
    }
  };
  render = () => {
    return (
      <div
        id={this.props.boxId}
        className="square"
        onClick={this.props.handleClick}
        style={squareStyle}
      >
        {this.renderSymbol()}
      </div>
    );
  };
}

class Circle extends React.Component {
  render = () => {
    return <div style={circleStyle}></div>;
  };
}

class CanvasComponent extends React.Component {
  constructor() {
    super();
    this.canvas = createRef();
  }
  componentDidMount = () => {
    this.updateCanvas();
  };
  updateCanvas = () => {
    const ctx = this.canvas.current.getContext("2d");

    ctx.shadowColor = "black";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 6;
    ctx.strokeStyle = "red";
    ctx.lineWidth = "8";
    ctx.font = "italic bold 55px Unknown Font, sans-serif";
    ctx.strokeText("x", 10, 45);
  };
  render = () => {
    return <canvas ref={this.canvas} width={60} height={60} />;
  };
}

export default Game;

//ReactDOM.render(<Game />, document.getElementById("root"));
