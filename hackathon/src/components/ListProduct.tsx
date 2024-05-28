import React from "react";
import Hamburger from "./images/Hamburger.jpg"
import bread from "./images/bread.jpg"
import pizza from "./images/pizza.jpg"
import Cake from "./images/Cake.jpg"
import RenderProduct from "./RenderProduct";

export default function ListProduct() {
  return (
    <div>
      <div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1 className="panel-title">List Products</h1>
            </div>
            <div className="panel-body" id="list-product">
              <div>
                
              </div>
              <RenderProduct></RenderProduct>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
