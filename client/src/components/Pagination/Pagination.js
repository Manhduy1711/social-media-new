import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import useStyles from "./styles";
const Pagination = () => {
  const classes = useStyles();
  return (
    <Pagination classes={{ ul: classes.ul }} count={5} page={1} var>
      <PaginationItem></PaginationItem>
    </Pagination>
  );
};

export default Pagination;
