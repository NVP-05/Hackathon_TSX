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
let flag = 0;
localStorage.setItem("flag", JSON.stringify(flag));

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
    window.location.reload();
    for (let i = 0; i < cartLocal.length; i++) {
      if (id == cartLocal[i].id) {
        for (let j = 0; j < productLocal.length; j++) {
          if (cartLocal[i].id == productLocal[j].id) {
            if (cartLocal[i].quantity >= productLocal[j].quantity) {
              alert("Sản phẩm trong kho không còn đủ.");
              productLocal[j].status = false;
              localStorage.setItem("products", JSON.stringify(productLocal));
              setActive(!active);
              return;
            }
          }
        }
      }
    }
    let productFound = false;
    const updatedCart = cartLocal.map((item) => {
      if (item.id === id) {
        productFound = true;
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    if (!productFound) {
      const productToAdd = productLocal.find((product) => product.id === id);
      if (productToAdd) {
        updatedCart.push({ ...productToAdd, quantity: 1 });
        flag = 1;
        localStorage.setItem("flag", JSON.stringify(flag));
      }
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
    // setActive(!active);
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
