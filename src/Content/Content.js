import React from "react";
import { makeStyles } from "@material-ui/core";
import products from "../data/products.json";
import ChatIcon from "@material-ui/icons/Chat";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    background: "rgb(229 232 237)",
    overflow: "hidden",
  },
  header: {
    height: 100,
    paddingLeft: 16,
    paddingRight: 16,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
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
  headerItemcontainer: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ccc",
    width: 70,
  },
  shareContainer: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ccc",
    width: 70,
    backgroundColor: "crimson",
    marginLeft: 16,
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerItemtext: {
    flex: 1,
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
      <div className={classes.header}>
        <div class={classes.headerItemcontainer}>
          <ChatIcon className={classes.headerIcon} />
          <div class={classes.headerItemtext}>Chat</div>
        </div>

        <div class={classes.shareContainer}>
          <ShareIcon className={classes.headerIcon} />
          <div class={classes.headerItemtext}>Share</div>
        </div>
      </div>
      <div className={classes.titlePane}>
        <label className={classes.titleLabel}>Hamburger</label>
        <div className={classes.subtext}>Discover whatever you need easily</div>
      </div>

      <div className={classes.productsContainer}>{productsGrid}</div>
    </div>
  );
};

export default Content;
