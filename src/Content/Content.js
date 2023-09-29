import React from 'react';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(()=>({
  root: {
    flex: 1,
  }
}))

const Content = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>Content</div>
    );
}

export default Content;
