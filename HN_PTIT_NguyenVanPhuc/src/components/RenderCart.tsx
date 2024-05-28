import React, { useState } from "react";

interface Cart {
  id: number;
  name: string;
  price: number;
  status: boolean;
  image: string;
  quantity: number;
}

interface RenderCartProps {
  cartLocal: Cart[];
  updateCart: (id: number, quantity: number) => void;
  deleteProduct: (id: number) => void;
}

// let cart:Cart[] = [];
// localStorage.setItem("cart", JSON.stringify(cart));

export default function RenderCart({
  cartLocal,
  updateCart,
  deleteProduct,
}: RenderCartProps) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    cartLocal.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      localStorage.setItem("cart", JSON.stringify(cartLocal));
      return acc;
    }, {} as { [key: number]: number })
  );

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities({
      ...quantities,
      [id]: quantity,
    });
  };

  return (
    <>
      {cartLocal.map((item, index) => (
        <tr key={item.id}>
          <th scope="row">{index + 1}</th>
          <td>{item.name}</td>
          <td>{item.price} USD</td>
          <td>
            <input
              name={`cart-item-quantity-${item.id}`}
              type="number"
              value={quantities[item.id]}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value);
                handleQuantityChange(item.id, newQuantity);
              }}
            />
          </td>
          <td>
            <a
              onClick={() => updateCart(item.id, quantities[item.id])}
              className="label label-info update-cart-item"
              data-product=""
            >
              Update
            </a>
            <a
              onClick={() => deleteProduct(item.id)}
              className="label label-danger delete-cart-item"
              data-product=""
            >
              Delete
            </a>
          </td>
        </tr>
      ))}
    </>
  );
}
