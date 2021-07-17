import {
  Box,
  Breadcrumbs, Button, Card,
  CardActions,
  CardContent,
  CardMedia, Container,
  Grid, Paper, Typography, withStyles
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

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

const StyledToggleButton = withStyles({
  root: {
    color: 'rgba(0, 0, 0, 0.87)',
    height: '30px',
    '&$selected': {
      backgroundColor: 'rgba(33, 137, 214, 0.14)',
      color: 'rgb(26, 88, 159)',
      '&:hover': {
        backgroundColor: 'rgba(33, 137, 214, 0.14)',
        color: 'rgb(26, 88, 159)',
      },
    },
  },
  selected: {},
})(ToggleButton);

const cardImages = ['image1-v1.jpg', 'image2-v1.jpg', 'image3-v1.jpg', 'image4-v1.jpg', 'image5-v1.jpg']

const TechTalks = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [upcomingTechTalks, setUpcomingTechTalks] = useState<TechTalk[]>([])
  const [archivedTechTalks, setArchivedTechTalks] = useState<TechTalk[]>([])
  const [techTalkType, setTechTalkType] = useState<string | null>('Upcoming');

  const handleTechTalkType = (event: React.MouseEvent<HTMLElement>, techTalkType: string | null) => {
    if (techTalkType != null) {
      setTechTalkType(techTalkType);
    }
  };


  const getFormattedDate = (timestamp: number) => {
    const dt = new Date(timestamp);
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
          image={`/card-images/${cardImages[index % 5]}`}
          title="Image Title"
        />
        <Typography gutterBottom display="block" variant="caption" color="textSecondary" align="center" className={classes.date}>
          {getFormattedDate(card.date)}
        </Typography>
        <CardContent className={classes.cardContent}>

          <Typography gutterBottom variant="h6" align="center">
            {card.title}
          </Typography>

          <Typography gutterBottom variant="body2" align="center">
            {card.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Box mb={2}>
                <Button size="small" color="primary" variant="outlined" endIcon={<EditIcon />}>
                  Edit
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <Box mb={2}>
                <Button size="small" color="secondary" variant="outlined" endIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
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
            <Grid container spacing={0} direction="row" alignItems="center" className={classes.header_container} >
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
                <Paper elevation={1} >
                  <StyledToggleButtonGroup
                    size="small"
                    value={techTalkType}
                    exclusive
                    onChange={handleTechTalkType}
                    aria-label="text talk type"
                  >
                    <StyledToggleButton value="Upcoming" aria-label="upcoming">
                      upcoming
                    </StyledToggleButton>
                    <StyledToggleButton value="Archived" aria-label="archived">
                      archived
                    </StyledToggleButton>
                  </StyledToggleButtonGroup>
                </Paper>
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
