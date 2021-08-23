import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const RecipeIngredients = ({ ingredients }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ingreList, setIngreList] = useState(null);

  console.log(ingredients);

  useEffect(() => {
    setIngreList(
      ingredients.map((ingredient) => {
        return {
          name: ingredient.name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
          amountUS: `${ingredient.measures.us.amount} ${ingredient.measures.us.unitShort}`,
          amountMetrics: `${Math.round(ingredient.measures.metric.amount)} ${
            ingredient.measures.metric.unitShort === "ml"
              ? "g"
              : ingredient.measures.metric.unitShort
          }`,
          aisle: ingredient.aisle,
        };
      })
    );
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickGrocery = (grocery) => {
    window.open(
      "https://www.woolworths.com.au/shop/search/products?searchTerm=" +
        grocery,
      "_blank"
    );
  };
  return (
    <List
      component="nav"
      label="enable dense"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Ingredients" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {ingreList?.map((item, index) => (
          <ListItem button key={index}>
            <ListItemText
              onClick={() => handleClickGrocery(item.name)}
              primary={`${item.name}`}
              secondary={`${
                item.amountMetrics == item.amountUS
                  ? item.amountMetrics
                  : `${item.amountUS} or ${item.amountMetrics}`
              }`}
            />
          </ListItem>
        ))}
      </Collapse>
    </List>
  );
};

export default RecipeIngredients;
