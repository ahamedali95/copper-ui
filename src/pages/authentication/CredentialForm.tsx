import React, {ChangeEvent, FC} from "react";
import {Box, Button, Grid, InputAdornment, makeStyles, TextField, Typography} from "@material-ui/core";
import logo from "assets/icons/logo.svg";
import { Credential } from "./types";
import {Email, Lock} from "@material-ui/icons";

type CredentialFormProps = {
    username: string;
    password: string;
    onUserNameChange: (val: string) => unknown;
    onPasswordChange: (val: string) => unknown;
    onSubmitClick: () => unknown;
    type: string;
    errors: Credential
};

const useCredentialFormStyles = makeStyles(() => {
    return {
        formContainer: {
            minWidth: "400px",
            minHeight: "450px",
            padding: "50px"
        }
    };
});

const CredentialForm: FC<CredentialFormProps> = ({ username, password, onPasswordChange, onUserNameChange, onSubmitClick, type, errors }) => {
    const classes = useCredentialFormStyles();

    return (
        <Grid
            alignItems="center"
            container
            direction="column"
            justifyContent="center"
        >
            <Box
                className={classes.formContainer}
                mt={10}
            >
                <Grid
                    container
                    direction="column"
                    item
                    justifyContent="center"

                >
                    <img
                        src={logo}
                        style={{ minHeight: 270 }}
                    />
                    <Typography>Enter your User ID</Typography>
                    <Box
                        mt={1}
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><Email color="secondary" /></InputAdornment>
                            )
                        }}
                        error={!!errors.username}
                        helperText={errors.username}
                        value={username}
                        variant="outlined"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onUserNameChange(e.target.value)}
                    />
                    <Box
                        mt={1}
                    />
                    <Typography>Enter your Password</Typography>
                    <Box
                        mt={1}
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><Lock color="secondary" /></InputAdornment>
                            )
                        }}
                        helperText={(
                            <Typography
                                style={{ maxWidth: "100px"}}
                                variant="caption"
                            >
                                {(errors.password ?? "").split(":").map((error: string) => {
                                    return (
                                        <p
                                            key={error}
                                        >{error}</p>
                                    );
                                })}
                            </Typography>
                        )}
                        error={!!errors.password}
                        type="password"
                        value={password}
                        variant="outlined"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onPasswordChange(e.target.value)}
                    />
                    <Box
                        mt={3}
                    />
                    <Grid
                        item
                        xs={12}
                    >
                        <Button
                            color="primary"
                            fullWidth
                            variant="contained"
                            onClick={onSubmitClick}
                        >
                            {type === "signup" ? "Sign Up" : "Log In"}
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </Grid>
    );
};

export default CredentialForm;