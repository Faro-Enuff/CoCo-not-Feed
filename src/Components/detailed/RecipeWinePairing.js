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

const RecipeWinePairing = ({ wines }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [pairedWines, setPairedWines] = useState([]);
  console.log(wines);

  useEffect(() => {
    setPairedWines(
      wines.pairedWines.map((wine) =>
        wine.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
      )
    );
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickBottle = (bottle) => {
    window.open(
      "https://www.woolworths.com.au/shop/search/products?searchTerm=" + bottle,
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
      {pairedWines && pairedWines.length !== 0 && (
        <ListItem button onClick={handleClick}>
          <ListItemText primary="Wine Suggestions" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      )}
      <Collapse in={open} timeout="auto" unmountOnExit>
        {pairedWines.map((wine, index) => (
          <ListItem button key={index}>
            <ListItemText
              onClick={() => handleClickBottle(wine)}
              primary={`${wine}`}
            />
          </ListItem>
        ))}
      </Collapse>
    </List>
  );
};

export default RecipeWinePairing;
