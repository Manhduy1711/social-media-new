import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);
  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page, numberOfPages]);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={page || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <>
          <PaginationItem
            {...item}
            onClick={() => {
              console.log(item);
            }}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        </>
      )}
    />
  );
};

export default Paginate;
