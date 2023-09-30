import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Menu from "./Menu/Menu";
import Content from "./Content/Content";
import Cart from "./Cart/Cart";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const showCart = () => setIsCartOpen(true);
  const hideCart = () => setIsCartOpen(false);

  const addToCart = (product) => {
    const newProduct = { ...product, count: 1 };
    if (products.length === 0) {
      setProducts([newProduct]);
    } else {
      const productList = products;
      productList.push(newProduct);
      setProducts(productList);
    }
    showCart();
  };

  const increaseCount = (product) => {
    const { id } = product;
    const productList = products;
    productList.forEach((product) => {
      if (product.id === id) {
        product.count = product.count + 1;
      }
    });
    setProducts(productList);
  };

  const decreaseCount = (product) => {
    const { id } = product;
    const productList = products;
    productList.forEach((product, index) => {
      if (product.id === id && product.count > 1) {
        product.count = product.count - 1;
      } else {
        productList.splice(index, 1);
      }
    });
    setProducts(productList);
  };

  return (
    <div className={classes.root}>
      <Menu />
      <Content addToCart={addToCart} />
      {isCartOpen && (
        <Cart
          products={products}
          increaseCount={increaseCount}
          decreaseCount={decreaseCount}
          hideCart={hideCart}
        />
      )}
    </div>
  );
}

export default App;
