import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { TechTalk } from '../../types';

interface CardDetailedrops {
    talk: TechTalk;
}

const getFormattedDate = (timestamp: number) => {
    const dt = new Date(timestamp * 1000);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // var months = ["January", "Febuary", "March", "April", "May", "June",
    //     "July", "August", "Septempber", "October", "November", "December"];
    // const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${weekday[dt.getDay()]}, ${months[dt.getMonth()]} ${dt.getDate()} @ ${dt.getHours()}:${dt.getMinutes()} IST`
}


const image = '/card-detailed-v1.jpg'

export default function CardDetailed(props: CardDetailedrops) {
    const { talk } = props;

    return (
        <Paper
            elevation={2}
            style={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${image})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={image} alt='bg' />}
            <Box
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.4)',
                }}
            />
            <Grid container>
                <Grid item md={10}>
                    <Box
                        p={3}
                        pr={0}
                        style={{ position: 'relative' }}
                    >
                        <Typography variant="h4" color="inherit" gutterBottom>
                            {talk.title}
                        </Typography>
                        <Box pl={1}>
                            <Typography variant="body2" color="inherit" gutterBottom>
                                {getFormattedDate(talk.date)}
                            </Typography>
                        </Box>
                        <Box pl={1}>
                            <Typography variant="body2" color="inherit" gutterBottom>
                                {talk.speaker}
                            </Typography>
                        </Box>
                        <Box pb={5}></Box>
                        <Typography variant="body1" color="inherit" style={{ fontSize: '19px' }} gutterBottom>
                            {talk.description}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
