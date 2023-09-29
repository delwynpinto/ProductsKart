import React from "react";
import { makeStyles } from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import FilterListIcon from "@material-ui/icons/FilterList";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import menuItemsConfig from "../config/menuItemsConfig";

const useStyles = makeStyles(() => ({
  root: {
    width: 200,
    borderBottom: "1px solid gray",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderBottom: "1px solid gray",
  },
  shoppingIcon: {
    marginRight: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 700,
  },
  subtext: {
    fontSize: 12,
    color: "gray",
  },
  menu: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderBottom: "1px solid gray",
  },
  filterContainer: {
    height: "100%",
    marginTop: 10,
    marginLeft: 20,
    display: "flex",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  dashboard: {
    padding: 16,
    borderBottom: "1px solid gray",
  },
  sectionItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
  },
  menuLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    background: "#FBE0DD",
    color: "#C77F80",
    padding: 4,
    borderRadius: 4,
  },
}));

const Menu = () => {
  const classes = useStyles();

  const menuItems = menuItemsConfig.map((item) => (
    <div className={classes.sectionItem} key={item.key}>
      <div className={classes.menuItem}>
        {item.icon}
        {item.text}
      </div>
      {item.label && <div className={classes.menuLabel}>{item.label}</div>}
    </div>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <ShoppingBasketIcon className={classes.shoppingIcon} />
        <div>
          <div className={classes.label}>ProductsKart</div>
          <div className={classes.subtext}>Thu 16 Jun</div>
        </div>
      </div>

      <div className={classes.menu}>
        <FastfoodIcon className={classes.shoppingIcon} />
        <div>
          <div className={classes.subtext}>Menu</div>
          <div className={classes.label}>Burger</div>
        </div>
        <div>
          <FilterListIcon />
          <div className={classes.subtext}>Filter</div>
        </div>
      </div>

      <div className={classes.dashboard}>
        <div className={classes.sectionHeader}>
          <div className={classes.subtext}>Menu Dashboard</div>
          <MoreHorizIcon />
        </div>

        <div>{menuItems}</div>
      </div>
      <div className={classes.general}></div>
    </div>
  );
};

export default Menu;
