import React, {useMemo, FC, MouseEvent, useRef, useState} from "react";
import {AppBar, Toolbar, Typography, IconButton, makeStyles, Grid, Box, Menu, MenuItem} from "@material-ui/core";
import { AccountCircle, PowerSettingsNew } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {useSelector} from "react-redux";
import {UserDetail} from "../../reducers/userReducer";

const useNavBarStyles = makeStyles(() => {
    return {
        icon: {
            color: "#FFFFFF"
        },
        email: {
            cursor: "default",
            fontStyle: "italic"
        }
    };
});

const NavBar: FC<Record<string, never>> = () => {
    const classes = useNavBarStyles();
    const navigate = useNavigate();
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);
    const appBarRef = useRef<null | HTMLHeadingElement>(null);
    const accountMenuRef = useRef<null | HTMLButtonElement>(null);
    const {isUserAuthenticated, onLogout, getValueInCookie} = useAuth();
    const user = useSelector((state: { user: UserDetail }) => state.user);

    console.log(user)

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
                anchorEl={accountMenuRef.current}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                keepMounted
                open={isAccountMenuOpen}
                style={{ marginTop: appBarRef.current?.clientHeight ?? "" }}
                onClose={handleMenuClose}
            >
                <MenuItem
                    className={classes.email}
                >{getValueInCookie("username") ?? ""}</MenuItem>
                <MenuItem
                    onClick={() => handleMenuItemClick("profile")}
                >Profile</MenuItem>
                <MenuItem
                    onClick={() => handleMenuItemClick("account")}
                >My account</MenuItem>
            </Menu>
        );
    }, [handleMenuClose, handleMenuItemClick, isAccountMenuOpen]);

    const handleLogout = (): void => {
        onLogout();
    };

    return (
        <>
            <AppBar
                position="absolute"
                ref={registerAppBarRef}
            >
                <Toolbar>
                    <Grid
                        container
                        justifyContent="space-between"
                    >
                        <Grid item>
                            <Box
                                mt={1}
                            />
                            <Typography variant="h5">Copper</Typography>
                        </Grid>
                        {isUserAuthenticated && (
                            <Grid item>
                                <IconButton
                                    onClick={handleMenuOpen}
                                >
                                    <AccountCircle
                                        className={classes.icon}
                                    />
                                </IconButton>
                                <IconButton
                                    onClick={handleLogout}
                                >
                                    <PowerSettingsNew
                                        className={classes.icon}
                                    />
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
            {renderAccountMenu}
        </>
    );
};

export default NavBar;