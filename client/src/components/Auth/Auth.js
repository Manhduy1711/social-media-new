import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import LockOutLinedIcon from "@mui/icons-material/LockOpenOutlined.js";
import { useDispatch } from "react-redux";
import useStyles from "./styles.js";
import Input from "./Input.js";
import jwt_decode from "jwt-decode";
import { AUTH } from "../../constants/actionTypes.js";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../redux/actions/auth.js";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const onChangeHanlder = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword((pre) => !pre);

  const switchMode = () => {
    setIsSignup((pre) => !pre);
    setShowPassword(false);
  };

  const googleSuccess = (res) => {
    const result = jwt_decode(res.credential);
    const data = {
      _id: result.sub,
      name: result.name,
      email: result.email,
      image: result.picture,
    };
    dispatch({ type: AUTH, payload: { data, token: res.credential } });
    navigate("/");
  };
  return (
    <Container component={"main"} maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="name"
                  label={"Name"}
                  handleChange={onChangeHanlder}
                  autoFocus
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={onChangeHanlder}
              type={"email"}
            />
            <Input
              name="password"
              label={"Password"}
              handleChange={onChangeHanlder}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label={"Repeat Password"}
                handleChange={onChangeHanlder}
                type={"password"}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign up" : "Sign in"}
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <GoogleLogin
              onSuccess={(res) => googleSuccess(res)}
              onError={() => {
                console.log("Login Failed");
              }}
              theme="filled_blue"
            />
          </Box>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account"
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
