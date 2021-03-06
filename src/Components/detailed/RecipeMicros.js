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

const RecipeMicros = ({ nutrition }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rowsMicro, setRowsMicro] = useState([]);

  useEffect(() => {
    setRowsMicro(
      nutrition?.nutrients.slice(9).map((nutrient) => {
        return {
          name: nutrient.name,
          amount: `${Math.round(nutrient.amount)} ${nutrient.unit}`,
          dailyNeeds: `${nutrient.percentOfDailyNeeds} %`,
        };
      })
    );
    // console.log(rowsMicro);
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      label="enable dense"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Micros" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {rowsMicro?.map((item, index) => (
          <ListItem button key={index}>
            <ListItemText
              primary={`${item.name}`}
              secondary={`${item.amount}  (${item.dailyNeeds})*`}
            />
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="*daily needs" />
        </ListItem>
      </Collapse>
    </List>
  );
};

export default RecipeMicros;
