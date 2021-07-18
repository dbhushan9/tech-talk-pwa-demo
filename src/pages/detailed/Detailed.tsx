import {
    Box,
    Breadcrumbs, Container, Typography
} from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link, useLocation } from "react-router-dom";
import { useStyles } from "../../styles";
import { TechTalk } from "../../types";
import CardDetailed from "../blog/CardDetailed";


type DetailedState = {
    card: TechTalk
}

const Detailed = () => {
    const classes = useStyles();
    const location = useLocation();
    console.warn((location.state as DetailedState).card)
    const techTalk: TechTalk = (location.state as DetailedState).card
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
                <Container className={classes.cardGrid} maxWidth="lg">
                    <CardDetailed talk={techTalk} />
                </Container>
            </Container>
        </>
    );
};

export default Detailed;
