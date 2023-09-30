import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "50%",
    height: "100%",
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    overflowY: "auto",
    zIndex: 999,
    transition: "transform 0.3s ease-in-out",
    transform: "translateX(100%)",
  },
  show: {
    transform: "translateX(0%)",
  },
  cartItem: {
    padding: "16px",
    borderBottom: "1px solid #ccc",
  },
  product: {
    backgroundColor: "white",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    width: 175,
    padding: 16,
    margin: 16,
  },
  productDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  productName: {
    fontWeight: 600,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 500,
    color: "red",
    textAlign: "center",
  },
}));

const Cart = (props) => {
  const classes = useStyles();
  const { products, hideCart, increaseCount, decreaseCount } = props;

  const overlayClass = clsx(classes.overlay, {
    [classes.show]: products && products.length > 0,
  });

  const productsList = products.map((product) => (
    <div key={product.id} className={classes.product}>
      <img src={product.image} alt="product.name" />
      <div className={classes.productDetails}>
        <div className={classes.productName}>{product.name}</div>
        <div className={classes.productPrice}>{product.price}</div>
      </div>
      <div>
        <button onClick={(e) => decreaseCount(product)}>-</button>
        {product.count}
        <button onClick={(e) => increaseCount(product)}>+</button>
      </div>
    </div>
  ));

  return (
    <div className={overlayClass}>
      <button onClick={hideCart}>Close Cart</button>

      {productsList}
    </div>
  );
};

export default Cart;
