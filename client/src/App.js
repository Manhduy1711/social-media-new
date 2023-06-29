import React from "react";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const theme = createTheme();
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <GoogleOAuthProvider clientId="899060118743-urrpuiinai1bbkl3oidq9em41ctek7vr.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Container maxWidth="lg">
            <Navbar />
            <Routes>
              <Route path="/" Component={() => <Navigate to={"/posts"} />} />
              <Route path="/posts" Component={Home} />
              <Route path="/posts/search" Component={Home} />
              <Route path="/posts/:id" Component={PostDetails} />
              <Route
                path="/auth"
                Component={() =>
                  !user ? <Auth /> : <Navigate to={"/posts"} />
                }
              />
            </Routes>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
