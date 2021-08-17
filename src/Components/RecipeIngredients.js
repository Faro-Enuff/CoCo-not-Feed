import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
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
  const [ingreList, setIngreList] = useState(null);

  console.log(ingredients);

  useEffect(() => {
    setIngreList(
      ingredients.map((ingredient) => {
        return {
          name: ingredient.name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
          amountUS: `${ingredient.measures.us.amount}, ${ingredient.measures.us.unitShort}`,
          amountMetrics: `${ingredient.measures.metric.amount}, ${ingredient.measures.metric.unitShort}`,
          aisle: ingredient.aisle,
        };
      })
    );
  }, []);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Shopping List
        </ListSubheader>
      }
      className={classes.root}
    >
      {ingreList &&
        ingreList.map((item, index) => (
          <ListItem button key={index} onClick=>
            <ListItemText
              primary={`${item.name}`}
              secondary={`${item.amountMetrics}`}
            />
          </ListItem>
        ))}
    </List>
  );
};

export default RecipeIngredients;
