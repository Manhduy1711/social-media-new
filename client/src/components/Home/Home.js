import {
  Grow,
  Container,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getPostsBySearch } from "../../redux/actions/posts";
import Pagination from "../Pagination/Pagination.js";
import useStyles from "./styles.js";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get("page") || 1;
  const navigate = useNavigate();
  const searchQuery = query.get("searchQuery");
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      setTags((pre) => [...pre, tag]);
      setTag("");
    }
  };

  const onDeleteTagHanlder = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const searchPost = (e) => {
    e.preventDefault();
    console.log(tags);
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <TextField
                style={{ margin: "10px 0" }}
                label="Search Tags"
                name="searchTags"
                variant="outlined"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                fullWidth
                onKeyPress={onKeyPressHandler}
              />
              {tags.length > 0 ? (
                <Paper style={{ padding: "8px 4px" }}>
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      value={tag}
                      label={tag}
                      onDelete={() => onDeleteTagHanlder(tag)}
                    />
                  ))}
                </Paper>
              ) : (
                ""
              )}
              <Button variant="contained" onClick={searchPost} color="primary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination page={Number(page)} className={classes.pagination} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
