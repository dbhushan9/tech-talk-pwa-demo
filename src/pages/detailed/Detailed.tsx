import {
    Box,
    Breadcrumbs, Container, Grid, Typography
} from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link, useLocation } from "react-router-dom";
import { useStyles } from "../../styles";
import { TechTalk } from "../../types";
import CardDetailed from "../../components/detailed-card/CardDetailed";


type DetailedState = {
    card: TechTalk
}

const Detailed = () => {
    const classes = useStyles();
    const location = useLocation();
    let techTalk: TechTalk;
    if (location && location.state) {
        techTalk = (location.state as DetailedState).card
    } else {
        techTalk = {
            title: 'Title',
            description: 'Talk Description',
            speaker: 'Speaker Name',
            date: 123456
        }
    }
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
                        <Link to="/tech-talks" className={classes.link}>
                            Tech Talks
                        </Link>
                        <Typography color="textPrimary" className={classes.link}>
                            {techTalk.title}
                        </Typography>
                    </Breadcrumbs>
                </Box>
                <Box mb={5}></Box>
                <Grid container justify='center'>
                    <Grid item sm={10}>
                        <CardDetailed talk={techTalk} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Detailed;
