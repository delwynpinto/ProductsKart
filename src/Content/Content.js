import React from "react";
import { makeStyles } from "@material-ui/core";
import products from "../data/products.json";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    background: "antiquewhite",
    overflow: "hidden",
  },
  header: {
    height: 100,
    borderBottom: "1px solid gray",
  },
  titlePane: {
    height: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 40,
  },
  titleLabel: {
    fontWeight: 600,
    fontSize: 22,
  },
  subtext: {
    fontSize: 12,
    color: "gray",
  },
  productsContainer: {
    display: "flex",
    flexWrap: "wrap",
    margin: 16,
    overflow: "scroll",
    height: "calc(100vh - 240px)",
  },
  product: {
    backgroundColor: "white",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 100,
    padding: 16,
    margin: 16,
  },
  productDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

const Content = (props) => {
  const classes = useStyles();
  const { addToCart } = props;

  const onProductClick = (product) => {
    addToCart(product);
  };

  const productsGrid = products.map((product) => (
    <div
      key={product.id}
      className={classes.product}
      onClick={(e) => onProductClick(product)}
    >
      <img src={product.image} alt="product.name" />
      <div className={classes.productDetails}>
        <div className={classes.productName}>{product.name}</div>
        <div className={classes.productPrice}>{product.price}</div>
      </div>
    </div>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.header}></div>
      <div className={classes.titlePane}>
        <label className={classes.titleLabel}>Hamburger</label>
        <div className={classes.subtext}>Discover whatever you need easily</div>
      </div>

      <div className={classes.productsContainer}>{productsGrid}</div>
    </div>
  );
};

export default Content;
