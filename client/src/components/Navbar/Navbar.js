import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, redirect, useLocation } from "react-router-dom";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import decode from "jwt-decode";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import { getPosts } from "../../redux/actions/posts";
const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const localtion = useLocation();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.data
  );

  const logout = () => {
    dispatch({ type: LOGOUT });
    redirect("/");
    setUser(null);
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("profile"))?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile"))?.data);
  }, [localtion]);

  const redirectHome = () => {
    dispatch(getPosts());
    redirect("/");
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link onClick={redirectHome} to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height={"45px"} />
        <img
          src={memoriesLogo}
          className={classes.image}
          alt="logo"
          height={40}
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.name} src={user.image}>
              {user.name.charAt(0)}
            </Avatar>
            <Typography className={classes.name} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
