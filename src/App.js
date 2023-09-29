import React from "react";
import { makeStyles } from "@material-ui/core";
import Menu from "./Menu/Menu";
import Content from "./Content/Content";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Menu />
      <Content />
    </div>
  );
}

export default App;
