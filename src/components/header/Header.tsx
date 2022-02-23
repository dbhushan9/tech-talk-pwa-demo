import { AppBar, Toolbar, Tooltip, Typography } from "@material-ui/core";
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isLoggedIn, logout } from "../../utils/utils";


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
    const [pwaPrompt, setPwaPrompt] = useState<BeforeInstallPromptEvent>()
    const [dismissed, setDismissed] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
    const handlePWAInstall = async (event: React.MouseEvent<HTMLElement>) => {
        if (pwaPrompt) {
            pwaPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await pwaPrompt.userChoice;
            // Optionally, send analytics event with outcome of user choice
            console.log(`User response to the install prompt: ${outcome} : `, outcome === 'dismissed');
            setDismissed(outcome === 'dismissed')
            // We've used the prompt, and can't use it again, throw it away
            setPwaPrompt(undefined)
        }
    };

    let loggedIn =  sessionStorage.getItem("loggedIn") === "true"
    console.warn("LoggedIN: ",loggedIn)

    

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
            <MenuItem onClick={() => { logout(); navigateTo('/login') }}>Logout</MenuItem>
        </Menu>
    );





    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (event) => {
            !dismissed && enqueueSnackbar('App is now ready to install', { preventDuplicate: true, persist: true })
            const e: BeforeInstallPromptEvent = event as BeforeInstallPromptEvent;
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            // Update UI notify the user they can install the PWA
            setPwaPrompt(e);
            // Optionally, send analytics event that PWA install promo was shown.
            console.log(`'beforeinstallprompt' event was fired.`);
        });
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.warn("PWA Install prompt", pwaPrompt)

    useEffect(() => {
        console.warn("User loggedIn changed: ",loggedIn);
        
    }, [loggedIn])

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
                    {pwaPrompt && !dismissed &&
                        <Tooltip title="Install App" placement="left">
                            <IconButton
                                aria-label="pwa-install"
                                onClick={handlePWAInstall}
                                color="inherit"
                            >
                                <Badge badgeContent={17} variant="dot" color="secondary">
                                    <SystemUpdateAltIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    }
                    {loggedIn &&<IconButton
                        edge="end"
                        aria-label="menu"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>}
                </div>
            </Toolbar>
            {loggedIn && renderMenu}
        </AppBar>
    )
}

export default Header
