import React, { useState } from "react";
import ItemList from "./ItemList";
import { produce, pantryItems } from "./storeItems";

export default function GroceryCart() {
  // declare and initialize state

  const addItem = (item) => {
    let newCart = [item];
    let itemNr = 0;
    cart.forEach((existingItem) => {
      if (existingItem !== item) {
        newCart[++itemNr] = item;
      }
    });
    setCart((prev) => {
      return [item, ...prev];
    });
  };

  const removeItem = (targetIndex) => {
    console.log("targetIndex", targetIndex);
    console.log("cart before click", cart);
    let newCart = cart.filter((item, index) => {
      console.log("index", index);
      return index !== targetIndex;
    });
    console.log("newCart after click", newCart);
    setCart(newCart);
  };

  return (
    <div>
      <h1>Grocery Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li onClick={() => removeItem(index)} key={index}>
            {item}
          </li>
        ))}
      </ul>
      <h2>Produce</h2>
      <ItemList items={produce} onItemClick={addItem} />
      <h2>Pantry Items</h2>
      <ItemList items={pantryItems} onItemClick={addItem} />
    </div>
  );
}
