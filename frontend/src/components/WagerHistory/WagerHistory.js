import React from "react";
import { Paper, TableContainer, TableCell, TableRow, TableBody, Table, TableHead } from "@mui/material";

const WagerHistory = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 500 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Time</TableCell>
          <TableCell align="right">Is Win</TableCell>
          <TableCell align="right">Win Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(({ time, is_win, winAmount }, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {time}
            </TableCell>
            <TableCell align="right">{String(is_win)}</TableCell>
            <TableCell align="right">{winAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default WagerHistory;
