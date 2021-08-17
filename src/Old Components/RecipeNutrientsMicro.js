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

const RecipeNutrientsMicro = ({ nutrition }) => {
  const classes = useStyles();
  const [rowsMicro, setRowsMicro] = useState([]);

  useEffect(() => {
    setRowsMicro(
      nutrition.nutrients.slice(9).map((nutrient) => {
        return {
          name: nutrient.name,
          amount: `${Math.round(nutrient.amount)} ${nutrient.unit}`,
          dailyNeeds: `${nutrient.percentOfDailyNeeds} %`,
        };
      })
    );
    console.log(rowsMicro);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Micros</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Daily Needs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsMicro.map((row) => (
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

export default RecipeNutrientsMicro;
