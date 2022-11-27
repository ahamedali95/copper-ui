import React, {useMemo, FC, MouseEvent, useRef, useState} from 'react';
import {AppBar, Toolbar, Typography, IconButton, makeStyles, Grid, Box, Menu, MenuItem} from '@material-ui/core';
import { AccountCircle, PowerSettingsNew } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie";
import useAuth from "../../hooks/useAuth";

const useNavBarStyles = makeStyles(() => {
    return {
        icon: {
            color: '#FFFFFF'
        }
    };
});

const NavBar: FC<{}> = () => {
    const classes = useNavBarStyles();
    const navigate = useNavigate();
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);
    const appBarRef = useRef<null | HTMLHeadingElement>(null);
    const accountMenuRef = useRef<null | HTMLButtonElement>(null);
    const {isUserAuthenticated, deleteAccessToken} = useAuth();

    const handleMenuItemClick = (menuItem: string): void => {
        if (menuItem === "profile") {
            navigate("/profile");
        } else if (menuItem === "account") {
            navigate("/settings");
        }
    };

    const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>): void => {
        accountMenuRef.current = event.target as HTMLButtonElement;
        setIsAccountMenuOpen(true);
    };

    const handleMenuClose = (): void => {
        setIsAccountMenuOpen(false);
    };

    const registerAppBarRef = (element: HTMLHeadingElement): void => {
        appBarRef.current = element;
    };

    const renderAccountMenu = useMemo((): JSX.Element => {
        return (
            <Menu
                style={{ marginTop: appBarRef.current?.clientHeight ?? '' }}
                anchorEl={accountMenuRef.current}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                keepMounted
                open={isAccountMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleMenuItemClick("profile")}>Profile</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("account")}>My account</MenuItem>
            </Menu>
        );
    }, [handleMenuClose, handleMenuItemClick, isAccountMenuOpen]);

    const handleLogout = (): void => {
        deleteAccessToken();
    };

    return (
        <>
            <AppBar ref={registerAppBarRef} position="absolute">
                <Toolbar>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Box mt={1} />
                            <Typography variant="h5">Copper</Typography>
                        </Grid>
                        {
                            isUserAuthenticated &&
                                <Grid item>
                                  <IconButton onClick={handleMenuOpen}>
                                    <AccountCircle className={classes.icon} />
                                  </IconButton>
                                  <IconButton onClick={handleLogout}>
                                    <PowerSettingsNew className={classes.icon} />
                                  </IconButton>
                                </Grid>
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
            {renderAccountMenu}
        </>
    );
};

export default NavBar;