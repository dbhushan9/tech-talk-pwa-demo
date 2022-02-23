import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { OptionsObject, useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { isLoggedIn, login } from '../../utils/utils';
import { LoginLottie } from '../animations/LoginLottie';
import { beginLogin, beginRegistration, endLogin, endRegistration } from '../services/webauthn-service';

const LoginAnimation = (
  <Container maxWidth="xs" >
    <Box display={{ xs: 'none', sm: 'block' }}>
      <LoginLottie />
    </Box>
  </Container>
)

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(2),
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(5)
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
}));

const errorOptions: OptionsObject = {
  persist: true,
  variant: 'error',
}

const successOptions: OptionsObject = {
  variant: 'success',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  autoHideDuration: 3000,
}

export default function WebauthnRegistrationForm() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();
  const [username, setUsername] = useState<string>("")
  const [errors, setErrors] = useState<string>("");

  const hadleUsernameChange = (e: any) => {
    let { value } = e.target
    setUsername(value)
  }

  let loggedIn = sessionStorage.getItem("loggedIn") === "true"
  if (!!loggedIn) {
    history.push("/", {})
  }

  function registerUser(event: any) {
    event.preventDefault();
    console.log(username)
    if (typeof username === "undefined" || username === "" || username.trim().length === 0) {
      enqueueSnackbar('Please enter username', errorOptions)
      return
    }

    //register
    beginRegistration(username)
      .then(credential => {
        return endRegistration(username, credential)
      })
      .then(res => enqueueSnackbar('registration successful', successOptions))
      .catch(err => {
        console.log(err)
        enqueueSnackbar('Error Registering User: ' + err.message, errorOptions)
      })
  }

  function loginUser(event: any) {

    event.preventDefault();
    if (typeof username === "undefined" || username === "" || username.trim().length === 0) {
      enqueueSnackbar('Please enter username', errorOptions)
      return
    }
    beginLogin(username)
      .then(assertion => endLogin(username, assertion))
      .then(res => {
        enqueueSnackbar('login successful', successOptions);
        login();
        history.push("/", {})
      })
      .catch(err => {
        console.log(err)
        if (err && err.response && err.response.status === 500) {
          enqueueSnackbar('Unregistered User: ', errorOptions)
        } else if (err.message.includes("Error: Request failed with status code 500")) {
          enqueueSnackbar('Unregistered User: ', errorOptions)
        } else {
          enqueueSnackbar('Error Authenticating User: ' + err.message, errorOptions)
        }
      })
  }

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item sm={6}>
            {LoginAnimation}
          </Grid>
          <Grid item sm={6}  >
            <form className={classes.form} noValidate>
              <Grid container
                direction="row"
                justify="flex-end"
                alignItems="center"
                spacing={4}>
                <Grid item xs={12} >
                  <TextField
                    error={!!errors}
                    helperText={errors}
                    autoComplete="off"
                    name="username"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={username}
                    onChange={hadleUsernameChange}
                    id="username"
                    label="username"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={registerUser}
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="reset"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    className={classes.submit}
                    onClick={loginUser}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>


            </form>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}