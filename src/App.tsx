import { AppBar, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import "./App.css";
import AppRouter from "./components/app-router/AppRouter";
import { useStyles } from "./styles";

function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline>
        <AppBar position="relative">
          <Toolbar>
            <img
              alt="logo"
              src="/icons/logo512.png"
              height="32px"
              className={classes.icon}
            />
            <Typography variant="h6">Tech Talks</Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.container}>
          <AppRouter />
        </main>
      </CssBaseline>
    </>
  );
}

export default App;
