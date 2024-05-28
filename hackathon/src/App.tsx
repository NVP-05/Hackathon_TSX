import React from "react";
import ListProduct from "./components/ListProduct";
import Cart from "./components/Cart";

export default function App() {
  return (
    <div>
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="row">
          <ListProduct></ListProduct>
          <Cart></Cart>
        </div>
      </div>
    </div>
  );
}
