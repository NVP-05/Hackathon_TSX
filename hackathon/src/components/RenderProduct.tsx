import React, { useEffect, useState } from "react";
import Hamburger from "./images/Hamburger.jpg";
import bread from "./images/bread.jpg";
import pizza from "./images/pizza.jpg";
import Cake from "./images/Cake.jpg";
import ListProduct from "./ListProduct";

interface Product {
  id: number;
  name: string;
  price: number;
  status: boolean;
  image: string;
  quantity: number;
}
interface Cart {
  id: number;
  name: string;
  price: number;
  status: boolean;
  image: string;
  quantity: number;
}

// let products: Product[] = [
//   {
//     id: Math.floor(Math.random() * 999999999),
//     name: "Pizza",
//     price: 15,
//     status: false,
//     image: pizza,
//     quantity: 0,
//   },
//   {
//     id: Math.floor(Math.random() * 999999999),
//     name: "Hamburger",
//     price: 15,
//     status: true,
//     image: Hamburger,
//     quantity: 15,
//   },
//   {
//     id: Math.floor(Math.random() * 999999999),
//     name: "Bread",
//     price: 20,
//     status: true,
//     image: bread,
//     quantity: 15,
//   },
//   {
//     id: Math.floor(Math.random() * 999999999),
//     name: "Cake",
//     price: 10,
//     status: true,
//     image: Cake,
//     quantity: 15,
//   },
// ];
// localStorage.setItem("products", JSON.stringify(products));

export default function RenderProduct() {
  const [productLocal, setProduct] = useState<Product[]>(() => {
    const data = localStorage.getItem("products");
    const productList = data ? JSON.parse(data) : [];
    return productList;
  });

  const [cartLocal, setCart] = useState<Cart[]>(() => {
    const datas = localStorage.getItem("cart");
    const cartList = datas ? JSON.parse(datas) : [];
    return cartList;
  });

  const [active, setActive] = useState<boolean>(true);

  const add = (id: number) => {
    for (let i = 0; i < productLocal.length; i++) {
      if (id == productLocal[i].id) {
        let newProduct: Product = {
          id: productLocal[i].id,
          name: productLocal[i].name,
          price: productLocal[i].price,
          status: productLocal[i].status,
          image: productLocal[i].image,
          quantity: 1,
        };
        cartLocal.push(newProduct);
        localStorage.setItem("cart", JSON.stringify(cartLocal));
      }
    }
    window.location.reload();
    setActive(!active);
  };

  return (
    <>
      {productLocal.map((item: Product) => {
        if (item.status == true) {
          return (
            <div className="media product">
              <div className="media-left">
                <a href="#">
                  <img className="media-object" src={item.image} alt="pizza" />
                </a>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{item.name}</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                  dicta asperiores veniam repellat unde debitis quisquam magnam
                  magni ut deleniti!
                </p>
                <input
                  name="quantity-product-1"
                  type="number"
                  defaultValue={1}
                />
                <a
                  onClick={() => {
                    add(item.id);
                  }}
                  data-product={1}
                  className="price"
                >
                  {item.price} USD{" "}
                </a>
              </div>
            </div>
          );
        } else {
          return (
            <div className="media product">
              <div className="media-left">
                <a href="#">
                  <img className="media-object" src={item.image} alt="pizza" />
                </a>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{item.name}</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                  dicta asperiores veniam repellat unde debitis quisquam magnam
                  magni ut deleniti!
                </p>
                <span className="price"> {item.price} USD</span>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
