import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

const RecipeNutrientsMacro = ({ nutrition }) => {
  const classes = useStyles();
  const [rowsMacro, setRowsMacro] = useState([]);

  useEffect(() => {
    setRowsMacro(
      nutrition.nutrients.slice(0, 9).map((nutrient) => {
        return {
          name: nutrient.name,
          amount: `${Math.round(nutrient.amount)} ${nutrient.unit}`,
          dailyNeeds: `${nutrient.percentOfDailyNeeds} %`,
        };
      })
    );
    // console.log(rowsMacro);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Macros</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Daily Needs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsMacro.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.dailyNeeds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecipeNutrientsMacro;
