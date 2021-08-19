import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const RecipeInstructions = ({ stepInstructions, textInstructions }) => {
  const [instructionScheme, setInstructionScheme] = useState(false);
  const sorryText =
    "SORRY, but we need your creativity. Content is unfortunately not available yet.";
  const handleViewClick = () => {
    setInstructionScheme(!instructionScheme);
  };
  console.log(instructionScheme);

  return (
    <CardContent>
      <Typography paragraph>
        <b>Instructions: </b>
      </Typography>
      {instructionScheme ? (
        stepInstructions.length ? (
          stepInstructions[0].steps.map((item, key) => (
            <Typography paragraph key={key}>
              {item.number}. {item.step}
            </Typography>
          ))
        ) : (
          <Typography paragraph>{sorryText}</Typography>
        )
      ) : (
        <Typography paragraph>
          {textInstructions.replace(/<[^>]+>/g, "") || sorryText}
        </Typography>
      )}
      <Button variant="contained" color="secondary" onClick={handleViewClick}>
        Change View
      </Button>
    </CardContent>
  );
};

export default RecipeInstructions;
