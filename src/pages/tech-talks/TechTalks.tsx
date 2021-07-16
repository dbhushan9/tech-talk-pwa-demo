import {
  Box,
  Breadcrumbs, Button, Card,
  CardActions,
  CardContent,
  CardMedia, Container,
  Grid, Typography
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingLottie } from "../../components/animations/LoadingLottie";
import { SearchingLottie } from "../../components/animations/SearchingLottie";
import { GetAllTechTalks } from "../../components/services/tech-talk-service";
import { useStyles } from "../../styles";
import { TechTalk } from "../../types";

const NoDataAnimation = (
  <Container maxWidth="xs">
    <Box mb={-5} mt={-1} pb={0} pt={0}>
      <SearchingLottie />
    </Box>
    <Typography gutterBottom variant="h6" align="center" color="primary" >
      <Box fontWeight="fontWeightBold">
        No Tech Talks found
      </Box>
    </Typography>
  </Container>
)

const LoadingAnimation = (
  <Container maxWidth="xs" >
    <Box mt={10}>
      <LoadingLottie />
    </Box>
  </Container>
)

// const tagColors: Exclude<PropTypes.Color, 'inherit'>[] = ['primary', 'secondary', 'default']
// let randomTagColor = () => tagColors[Math.floor(Math.random() * tagColors.length)];

// const chipVariants: ('default' | 'outlined')[] = ['default', 'outlined']
// const randomChipVariant = () => chipVariants[Math.floor(Math.random() * chipVariants.length)]

const TechTalks = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [upcomingTechTalks, setUpcomingTechTalks] = useState<TechTalk[]>([])
  const [archivedTechTalks, setArchivedTechTalks] = useState<TechTalk[]>([])
  const [techTalkType, setTechTalkType] = useState<string | null>('Upcoming');

  const handleTechTalkType = (event: React.MouseEvent<HTMLElement>, techTalkType: string | null) => {
    setTechTalkType(techTalkType);
  };


  const getFormattedDate = (timestamp: number) => {
    const dt = new Date(timestamp);
    //     var months = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
    //     "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
    // const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `${weekday[dt.getDay()]}, ${months[dt.getMonth()]} ${dt.getDate()} @ ${dt.getHours()}:${dt.getMinutes()} IST`
  }


  const getData = () => {
    return GetAllTechTalks().then((data: TechTalk[]) => {
      setUpcomingTechTalks(data.filter(e => !e.archived));
      setArchivedTechTalks(data.filter(e => e.archived));
      setLoading(false)
    }).catch(() => {
      setUpcomingTechTalks([]);
      setArchivedTechTalks([]);
      setLoading(false)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const getCardsToShow = () => {
    return techTalkType === 'Upcoming' ? upcomingTechTalks : archivedTechTalks
  }

  const CardViewer = (card: TechTalk, index: number) => (
    <Grid item key={card.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={`https://source.unsplash.com/weekly?1${index}`}
          title="Image Title"
        />
        <Typography gutterBottom display="block" variant="caption" color="textSecondary" align="center" className={classes.speaker}>
          {getFormattedDate(card.date)}
        </Typography>
        <CardContent className={classes.cardContent}>

          <Typography gutterBottom variant="h6" align="center">
            {card.title}
          </Typography>

          <Typography gutterBottom variant="body2" align="justify">
            {card.description}
          </Typography>
        </CardContent>

        {/* <CardActions className={classes.tags}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            {
              !!card.tags && card.tags.map(tag => (
                <Grid item>
                  <Chip size="small" label={tag}
                    color={randomTagColor()}
                  />
                </Grid>
              ))
            }
          </Grid>

        </CardActions> */}
        <CardActions className={classes.tags2}>
          {/* <Box mb={2}> */}

          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Button size="small" color="primary" variant="outlined" endIcon={<EditIcon />}>
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button size="small" color="secondary" variant="outlined" endIcon={<DeleteIcon />}>
                Delete
              </Button>
            </Grid>

          </Grid>
          {/* </Box> */}

        </CardActions>
      </Card>
    </Grid>
  );

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
              {techTalkType} Tech Talks
            </Typography>
          </Breadcrumbs>
        </Box>
        <Container maxWidth="md">
          <Box paddingBottom={4} >
            <Grid container spacing={0} direction="row" alignItems="center" justify="space-between" >
              <Grid item >
                <Typography
                  variant="h5"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  <Box fontWeight="fontWeightMedium">
                    {techTalkType} Tech Talks
                  </Box>
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
          {loading ? LoadingAnimation :
            <Grid container spacing={4}>
              {
                getCardsToShow().length > 0 ?
                  getCardsToShow().map((card, index) => CardViewer(card, index)) : NoDataAnimation
              }
            </Grid>
          }
        </Container>
      </Container>
    </>
  );
};

export default TechTalks;
