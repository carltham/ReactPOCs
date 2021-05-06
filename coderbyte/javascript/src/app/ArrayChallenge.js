import { render } from "@testing-library/react";
import React, { useState } from "react";

export default function ArrayChallenge() {
  let arr = [12, 2, 6, 7, 11];
  const result = [...ArrayHandler(arr).keys()];
  console.log("result = ", result);
  return (
    <span>
      arr = [12, 2, 6, 7, 11]
      <br />
      result = <label> {result} </label>
    </span>
  );
}

function ArrayHandler(arr) {
  let sourceArray = arr;
  const combinations = new Map();

  const calculate = () => {
    if (sourceArray.length > 0) {
      // code goes here
      let totalPlaces;
      let counter = 0;
      let positions;
      sourceArray.forEach((presentElemnt) => {
        if (!totalPlaces) {
          totalPlaces = presentElemnt;
          positions = new Array(totalPlaces);
        } else {
          positions[presentElemnt - 1] = true;
        }
      });
      for (
        let presentPosition = 0;
        presentPosition < positions.length;
        presentPosition++
      ) {
        const occupiedSeat = positions[presentPosition];

        if (!occupiedSeat) {
          let previousPosition =
            presentPosition % 2 === 1
              ? presentPosition - 1
              : presentPosition - 2;

          let nextPosition =
            presentPosition % 2 === 1
              ? presentPosition + 2
              : presentPosition + 1;
          addPrevious(previousPosition, presentPosition, positions);
          addNext(nextPosition, presentPosition, positions);
        }
      }
    }
  };

  const addPrevious = (previousPosition, presentPosition, positions) => {
    if (previousPosition > -1 && !positions[previousPosition]) {
      const key = " (" + previousPosition + "->" + presentPosition + ") ";
      if (!combinations.has(key)) {
        combinations.set(key, key);
      }
    }
  };
  const addNext = (nextPosition, presentPosition, positions) => {
    if (nextPosition < positions.length && !positions[nextPosition]) {
      const key = " (" + presentPosition + "->" + nextPosition + ") ";
      if (!combinations.has(key)) {
        combinations.set(key, key);
      }
    }
  };
  calculate(arr);
  return combinations;
}

// keep this function call here
console.log(ArrayHandler([12, 2, 6, 7, 11]).size);
