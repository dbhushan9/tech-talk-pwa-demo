import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,

  Grid, Typography
} from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "../../styles";
import { TechTalk } from "../../types";

function handleClick(event: any) {
  //   event.preventDefault();
  console.info("You clicked a breadcrumb.", event);
}

const tagColors = ['primary','secondary' ,'default']


const TechTalks = () => {
  const classes = useStyles();
  const [upcomingTechTalks, setUpcomingTechTalks] = useState<TechTalk[]>([])
  const [archivedTechTalks, setArchivedTechTalks] = useState<TechTalk[]>([])
  const [techTalkType, setTechTalkType] = useState<string | null>('Upcoming');

  const handleTechTalkType = (event: React.MouseEvent<HTMLElement>, techTalkType: string | null) => {
    setTechTalkType(techTalkType);
  };

  const getData = () => {
    return fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function (response) {
      console.log(response)
      return response.json();
    })
      .then((data: TechTalk[]) => {
        setUpcomingTechTalks(data.filter(e => !e.archived));
        setArchivedTechTalks(data.filter(e => e.archived));
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="xl">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link to="/" onClick={handleClick} className={classes.link}>
            <HomeOutlinedIcon className={classes.breadcrumb_icon} />
            Home
          </Link>
          <Typography color="textPrimary" className={classes.link}>
            {techTalkType} Tech Talks
          </Typography>
        </Breadcrumbs>
        <Container maxWidth="md">

          <Box paddingBottom={4}>
            <Grid container spacing={0} direction="row" alignItems="center" justify="space-between" >
              <Grid item >
                <Typography
                  variant="h4"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  {techTalkType} Tech Talks
            </Typography>
              </Grid>
              <Grid item >
                <ToggleButtonGroup
                  size="small"
                  value={techTalkType}
                  exclusive
                  onChange={handleTechTalkType}
                  aria-label="text talk type"
                >
                  <ToggleButton value="Upcoming" aria-label="upcoming">
                    upcoming
              </ToggleButton>
                  <ToggleButton value="Archived" aria-label="archived">
                    archived
              </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={4}>
            {(techTalkType === 'Upcoming' ? upcomingTechTalks : archivedTechTalks).map((card: TechTalk) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`https://source.unsplash.com/weekly?${card.id}`}
                    title="Image Title"
                  />
                  <Typography gutterBottom display="block" variant="caption" color="textSecondary" align="center" className={classes.speaker}>
                    {card.date}
                  </Typography>
                  <CardContent className={classes.cardContent}>

                    <Typography gutterBottom variant="h6" align="center">
                      {card.title}
                    </Typography>

                    <Typography gutterBottom variant="body2" align="justify">
                      {card.description}
                    </Typography>
                  </CardContent>

                  <CardActions className={classes.tags}>
                    <Grid
                      container
                      direction="row"
                      justify="space-evenly"
                      alignItems="center"
                    >
                      {
                        card.tags.map(tag => {
                          <Grid item>
                            <Chip size="small" label="PWA"
                              color={tagColors[Math.floor(Math.random() * tagColors.length)]} variant="outlined"
                            />
                          </Grid>
                        })
                      }

                      <Grid item>
                        <Chip size="small" label="React" color="secondary" />
                      </Grid>
                      <Grid item>
                        <Chip size="small" label="Web App" clickable />
                      </Grid>
                    </Grid>

                  </CardActions>
                  <CardActions className={classes.tags}>
                    {/* <Button size="small" color="primary">
                      View
                  </Button> */}
                    <Button size="small" color="primary">
                      Edit
                  </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

        </Container>
      </Container>
    </>
  );
};

export default TechTalks;
