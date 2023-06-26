import React from "react";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth";

const App = () => {
  const theme = createTheme();
  return (
    <GoogleOAuthProvider clientId="899060118743-urrpuiinai1bbkl3oidq9em41ctek7vr.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Container maxWidth="lg">
            <Navbar />
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/auth" Component={Auth} />
            </Routes>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
