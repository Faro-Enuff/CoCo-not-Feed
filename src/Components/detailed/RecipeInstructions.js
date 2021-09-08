import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Library Import
import SwipeableViews from "react-swipeable-views";

// Internal Imports
import Carousel from "./Carousel";

// Core Imports
import { CardContent, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((muiTheme) => ({
  recipeText: {
    padding: 20,
  },
  btn: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

const RecipeInstructions = ({ stepInstructions, textInstructions }) => {
  const [instructionScheme, setInstructionScheme] = useState(false);
  const classes = useStyles();
  const sorryText =
    "SORRY, but we need your creativity. Content is unfortunately not available yet.";
  const handleViewClick = () => {
    setInstructionScheme(!instructionScheme);
  };

  console.log(instructionScheme);

  return (
    <CardContent>
      {instructionScheme ? (
        stepInstructions.length ? (
          <SwipeableViews>
            {stepInstructions[0].steps.map((item, key) => (
              <Carousel key={key} item={item} />
            ))}
          </SwipeableViews>
        ) : (
          <Typography paragraph>{sorryText}</Typography>
        )
      ) : (
        <div className={classes.recipeText}>
          <Typography variant="h6">Instructions:</Typography>
          {textInstructions.replace(/<[^>]+>/g, "") || sorryText}
        </div>
      )}
      <div className={classes.btn}>
        <Button variant="contained" color="secondary" onClick={handleViewClick}>
          Change View
        </Button>
      </div>
    </CardContent>
  );
};

export default RecipeInstructions;
