import { CssBaseline, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import { SnackbarProvider } from 'notistack';
import React, { useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./components/app-router/AppRoutes";
import Header from "./components/header/Header";

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 2),
    height: '91vh',
    overflowX: 'auto',
    paddingBottom: theme.spacing(3)
  },
  btn_root: {
    color: 'white',
  },
}))

function App() {
  const classes = useStyles();
  const notistackRef = useRef<any>()
  const onClickDismiss = (key: any) => {
    if (notistackRef && !!notistackRef.current)
      notistackRef.current.closeSnackbar(key);
  }

  return (
    <>
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={3}
        action={(key) => (
          <IconButton aria-label="delete" style={{ fill: 'white' }} onClick={() => onClickDismiss(key)} color="inherit">
            <CancelIcon />
          </IconButton>
        )}
      >
        <CssBaseline>
          <BrowserRouter>
            <Header />
            <main className={classes.container}>
              <AppRoutes />
            </main>
          </BrowserRouter>
        </CssBaseline>
      </SnackbarProvider>
    </>
  );
}

export default App;
