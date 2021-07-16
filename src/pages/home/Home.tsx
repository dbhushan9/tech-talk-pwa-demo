import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Typography
} from "@material-ui/core";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React from "react";
import { useHistory } from "react-router-dom";
import { useStyles } from "../../styles";

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <>
      <Container className={classes.cardGrid} maxWidth="xl">
        <Box mb={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Typography color="textPrimary" className={classes.link}>
              <HomeOutlinedIcon className={classes.breadcrumb_icon} />
              Home
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
            Tech Talks
          </Box>
        </Typography>
        <Typography variant="subtitle1" align="center" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          ullamcorper metus at tortor gravida congue. Aenean at mattis purus.
          Aenean pulvinar, augue consectetur maximus rhoncus, nibh est iaculis
          est, fermentum ultricies enim est id sem. Cras dignissim ut nisi sed
          iaculis. Nulla ullamcorper neque nisl, et scelerisque justo eleifend
          vitae. Nullam vel leo quis ante ultricies venenatis ut et sapien. Duis
          tempus neque in turpis pretium vulputate. Pellentesque vestibulum
          pharetra enim eget dignissim. Maecenas et felis at libero accumsan
          mollis. Nullam lectus neque, elementum eu arcu ut, dictum laoreet
          purus. In semper laoreet euismod. Nam non risus sed neque semper
          bibendum.
        </Typography>
        <Typography variant="subtitle1" align="center" paragraph>
          Phasellus pharetra purus id eros aliquet, ut ultricies eros sodales.
          Donec viverra at erat id varius. Duis a ipsum imperdiet, eleifend nisl
          ac, pulvinar arcu. Nullam facilisis velit orci, laoreet bibendum felis
          vehicula sit amet. Maecenas laoreet risus non ultricies vestibulum.
          Pellentesque a eros eu nulla semper consectetur. Quisque facilisis
          tristique eros at vulputate. Sed luctus tellus eget massa suscipit,
          eget cursus ante scelerisque. Sed nec semper lectus. Aenean a sapien
          tincidunt urna tempus tincidunt. Fusce posuere massa sit amet orci
          fermentum imperdiet. In vel magna risus. Pellentesque lobortis semper
          quam, in congue tellus. Praesent rutrum mi sapien.
        </Typography>
        <div className={classes.buttons}>
          <Grid container spacing={3} justify="center">
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => history.push("/tech-talks")}>
                View Upcoming Talks
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={() => history.push("/register-talk")}>
                Register for a Talk
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Home;
