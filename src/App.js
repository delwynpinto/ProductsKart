import React, { useEffect, useState } from "react";
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
  const [renderCart, setRenderCart] = useState(false);

  const showCart = () => setIsCartOpen(true);
  const hideCart = () => setIsCartOpen(false);

  const startRender = () => setRenderCart(true);
  const stopRender = () => setRenderCart(false);

  useEffect(() => {
    if (renderCart) {
      stopRender();
    }
  }, [renderCart, stopRender]);

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
    startRender();
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
    startRender();
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
    startRender();
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
          renderCart={renderCart}
        />
      )}
    </div>
  );
}

export default App;
