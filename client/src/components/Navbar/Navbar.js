import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import memories from "../../images/memories.png";
import decode from "jwt-decode";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localtion = useLocation();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile"))?.data
  );

  console.log();
  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/");
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
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
        >
          Memories
        </Typography>
        <img src={memories} alt="memories" height={60} />
      </div>
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
