import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { OptionsObject, useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { RegistrationFormData, TechTalk } from '../../types';
import { RegistrationLottie } from '../animations/RegistrationLottie';
import { CreateTechTalks } from '../services/tech-talk-service';

const RegistrationAnimation = (
  <Container maxWidth="xs" >
    <Box display={{ xs: 'none', sm: 'block' }}>
      <RegistrationLottie />
    </Box>
  </Container>
)

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(2),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  formBG: {
    borderRadius: theme.spacing(1),
    boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 20%) -1px 1px 2px 0px, rgb(0 0 0 / 20%) 1px 2px 1px 0px, rgb(0 0 0 / 20%) 0px 1px 2px 1px'

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
}));

const initialValues: RegistrationFormData = {
  title: "",
  description: "",
  speaker: "",
  date: "2021-07-19T15:30",
}

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

export default function RegistrationForm() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [values, setValues] = useState<RegistrationFormData>(initialValues);
  const [errors, setErrors] = useState<RegistrationFormData>({});

  const handleInputChange = (e: any) => {
    let { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const isValid = (fieldValues: RegistrationFormData) => {
    let temp: RegistrationFormData = {}
    if (!fieldValues.title || fieldValues.title.length < 1) {
      temp.title = "This field is required"
    }
    if (!fieldValues.description || fieldValues.description.length < 1) {
      temp.description = "This field is required"
    }
    if (!fieldValues.speaker || fieldValues.speaker.length < 1) {
      temp.speaker = "This field is required"
    }
    if (!fieldValues.date) {
      temp.date = "This field is required"
    }
    setErrors({
      ...temp
    })
    return Object.keys(temp).length === 0
  }

  const resetForm = () => {
    setValues(initialValues);
    setErrors({})
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (isValid(values) && values.title && values.description && values.date && values.speaker) {
      const data: TechTalk = { title: values.title, description: values.description, speaker: values.speaker, date: new Date(values.date).getTime() / 1000 }
      CreateTechTalks(data)
        .then((res) => {
          enqueueSnackbar('Tech Talk registered', successOptions)
          resetForm()
        })
        .catch(err => {
          enqueueSnackbar('Failed to register Tech Talk', errorOptions)
        })
    }
  }

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item sm={6}>
            {RegistrationAnimation}
          </Grid>
          <Grid item sm={6}  >
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container
                direction="row"
                justify="flex-end"
                alignItems="center"
                spacing={4}>
                <Grid item xs={12} >
                  <TextField
                    error={!!errors.title}
                    helperText={errors.title}
                    autoComplete="off"
                    name="title"
                    variant="outlined"
                    required
                    fullWidth
                    value={values.title}
                    onChange={handleInputChange}
                    id="title"
                    label="Title"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!!errors.description}
                    helperText={errors.description}
                    variant="outlined"
                    required
                    fullWidth
                    multiline={true}
                    rows={3}
                    rowsMax={3}
                    value={values.description}
                    onChange={handleInputChange}
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={!!errors.speaker}
                    value={values.speaker}
                    helperText={errors.speaker}
                    onChange={handleInputChange}
                    name="speaker"
                    label="Speaker"
                    id="speaker"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={values.date}
                    onChange={handleInputChange}
                    type="datetime-local"
                    name="date"
                    label="Date"
                    id="date"
                    error={!!errors.date}
                    helperText={errors.date}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
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
                    onClick={resetForm}
                  >
                    Reset
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