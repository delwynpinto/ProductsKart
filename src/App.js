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
  const [products, setProducts] = useState();

  return (
    <div className={classes.root}>
      <Menu />
      <Content setProducts={setProducts} />
      {products && <Cart products={products} setProducts={setProducts} />}
    </div>
  );
}

export default App;
