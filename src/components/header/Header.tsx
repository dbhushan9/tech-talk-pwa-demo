import { AppBar, Toolbar, Typography } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from "react";
import { useHistory } from "react-router-dom";


export const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(3)
    },
}))

const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const navigateTo = (route: string) => {
        history.push(route, {})
        handleMenuClose();
    }
    const menuId = "menuId"
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => navigateTo('/register-talk')}>Register Talk</MenuItem>
            <MenuItem onClick={() => navigateTo('/tech-talks')}>View All</MenuItem>
        </Menu>
    );
    return (
        <AppBar position="relative">
            <Toolbar>
                <img
                    alt="logo"
                    src="/icons/logo512.png"
                    height="32px"
                    width="32px"
                    className={classes.icon}
                    onClick={() => navigateTo('/')}
                    style={{ cursor: 'pointer' }}
                />
                <Typography
                    variant="h6"
                    onClick={() => navigateTo('/')}
                    style={{ cursor: 'pointer' }}
                >
                    Tech Talks
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <IconButton
                        edge="end"
                        aria-label="menu"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                </div>
            </Toolbar>
            {renderMenu}
        </AppBar>
    )
}

export default Header
