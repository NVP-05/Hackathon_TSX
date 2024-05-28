import React, { useState } from "react";
import RenderCart from "./RenderCart";

interface Cart {
  id: number;
  name: string;
  price: number;
  status: boolean;
  image: string;
  quantity: number;
}

export default function Cart() {
  const [cartLocal, setCart] = useState<Cart[]>(() => {
    const datas = localStorage.getItem("cart");
    const cartList = datas ? JSON.parse(datas) : [];
    return cartList;
  });

  const [notification, setNotification] = useState<{ message: string, color: string } | null>(null);

  let totals = 0;
  for (let i = 0; i < cartLocal.length; i++) {
    let total = cartLocal[i].price * cartLocal[i].quantity;
    totals += total;
  }

  const updateCart = (id: number, quantity: number) => {
    const updatedCart = cartLocal.map(item => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setNotification({ message: "Update successfully", color: "orange" });
    setTimeout(() => setNotification(null), 2000); 
  };

  const deleteProduct = (id: number) => {
    const updatedCart = cartLocal.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setNotification({ message: "Delete successfully", color: "red" });
    setTimeout(() => setNotification(null), 2000); 
  };

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h1 className="panel-title">Your Cart</h1>
        </div>
        <div className="panel-body">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "4%" }}>STT</th>
                <th>Name</th>
                <th style={{ width: "15%" }}>Price</th>
                <th style={{ width: "4%" }}>Quantity</th>
                <th style={{ width: "25%" }}>Action</th>
              </tr>
            </thead>
            <tbody id="my-cart-body">
              <RenderCart
                cartLocal={cartLocal}
                updateCart={updateCart}
                deleteProduct={deleteProduct}
              />
            </tbody>
            <tfoot id="my-cart-footer">
              <tr>
                <td colSpan={4}>
                  There are <b>{cartLocal.length}</b> items in your shopping cart.
                </td>
                <td colSpan={2} className="total-price text-left">
                  {totals} USD
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {notification && (
        <div className="alert alert-warning" role="alert" id="mnotification" style={{ backgroundColor: notification.color }}>
          {notification.message}
        </div>
      )}
    </div>
  );
}
