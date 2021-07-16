import { AppBar, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import React from "react";
import "./App.css";
import AppRouter from "./components/app-router/AppRouter";
import { useStyles } from "./styles";

function App() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <CssBaseline>
        <AppBar position="relative">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <img
              alt="logo"
              src="/icons/logo512.png"
              height="32px"
              className={classes.icon}
            />
            <Typography variant="h6">Tech Talks</Typography>

          </Toolbar>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </AppBar>
        <main className={classes.container}>
          <AppRouter />
        </main>
      </CssBaseline>
    </>
  );
}

export default App;
