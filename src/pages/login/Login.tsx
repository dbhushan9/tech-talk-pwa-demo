import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
import WebauthnRegistrationForm from "../../components/webauthn-register-form/WebauthnRegisterForm";
import { useStyles } from "../../styles";

const Login = () => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.cardGrid} maxWidth="xl">
        <Typography
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          <Box fontWeight="fontWeightMedium">
            Authentication
          </Box>
        </Typography>
        <WebauthnRegistrationForm />
      </Container>
    </>
  );
};

export default Login;
