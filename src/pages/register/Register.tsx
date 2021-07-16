import { Box, Breadcrumbs, Container, Typography } from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../../components/register-form/RegistrationForm";
import { useStyles } from "../../styles";

const Register = () => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.cardGrid} maxWidth="xl">
        <Box mb={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link to="/" className={classes.link}>
            <HomeOutlinedIcon className={classes.breadcrumb_icon} />
            Home
          </Link>
          <Typography color="textPrimary" className={classes.link}>
            Register Talk
          </Typography>
        </Breadcrumbs>
        </Box>
 
        <Typography
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          <Box fontWeight="fontWeightMedium">
            Register for a Tech Talk
          </Box>
        </Typography>
        <RegistrationForm />
      </Container>
    </>
  );
};

export default Register;
