import { Typography } from "@material-ui/core";
import { Copyright } from "@material-ui/icons";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  footer:{
    backgroundColor: theme.palette.background.paper,
    padding:'50px 0'
  },
}))
const Footer = () => {
  const classes = useStyles();
  return (
    <div>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something footer here
        </Typography>
        <Copyright />
      </footer>
    </div>
  );
};

export default Footer;
