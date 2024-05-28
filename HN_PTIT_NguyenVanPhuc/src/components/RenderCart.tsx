import React, { useEffect, useState } from "react";

interface Cart {
  id: number;
  name: string;
  price: number;
  status: boolean;
  image: string;
  quantity: number;
}

// let cart:Cart[] = [];
// localStorage.setItem("cart", JSON.stringify(cart));
export default function RenderCart() {
  const [cartLocal, setCart] = useState<Cart[]>(() => {
    const datas = localStorage.getItem("cart");
    const cartList = datas ? JSON.parse(datas) : [];
    return cartList;
  });
  const [active, setActive] = useState<boolean>(true);
  const deleteProduct = (id: number) => {
    for (let i = 0; i < cartLocal.length; i++) {
      if (id === cartLocal[i].id) {
        cartLocal.splice(i, 1);
        localStorage.setItem("cart", JSON.stringify(cartLocal));
        setActive(!active);
        window.location.reload();
      }
    }
  };

  return (
    <>
      {cartLocal.map((item, index) => {
        return (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{item.name}</td>
            <td>{item.price} USD</td>
            <td>
              <input
                name="cart-item-quantity-1"
                type="number"
                defaultValue={item.quantity}
              />
            </td>
            <td>
              <a className="label label-info update-cart-item" data-product="">
                Update
              </a>
              <a
                onClick={() => {
                  deleteProduct(item.id);
                }}
                className="label label-danger delete-cart-item"
                data-product=""
              >
                Delete
              </a>
            </td>
          </tr>
        );
      })}
    </>
  );
}
