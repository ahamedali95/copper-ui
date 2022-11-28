import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Box, Button, Grid, InputAdornment, TextField, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {UserDetail} from "../../reducers/userReducer";
import {Email} from "@material-ui/icons";
import { Alert as MuiAlert} from "@material-ui/lab";
import {Credential} from "../authentication/types";
import { string, object } from "yup";
import useMutation from "../../api/useMutations";
import useCredentialValidation from "../../hooks/useCredentialValidation";
import urls from "../../api/url";
import Alert from "../../components/alert/Alert";
import useAuth from "../../hooks/useAuth";

const Username: FC<{}> = () => {
    const credentialSchema = object().shape({
        username: string().label("Email").email().required()
    });
    const { isLoading, data, isSuccess, errors, submit: updatedUsername } = useMutation(urls.ACCOUNT_DETAIL, "user", { method: 'put' });
    const { username, validationErrors, setUsername, onSubmit } = useCredentialValidation({ validationSchema: credentialSchema, userSubmit: updatedUsername });
    const {onLogout} = useAuth();

    useEffect((): void => {
        isSuccess && onLogout();
    }, [isSuccess]);

    return (
        <Grid container spacing={1} direction="row">
            <Grid item>
                <TextField
                    error={!!validationErrors.username}
                    helperText={validationErrors.username}
                    variant="outlined"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    value={username}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><Email color="secondary" /></InputAdornment>
                        )
                    }}
                />
            </Grid>
            <Grid item>
                <Button fullWidth variant='contained' color='primary' onClick={onSubmit}>
                    Submit
                </Button>
            </Grid>
            <MuiAlert severity="info">Updating username will log you out automatically.</MuiAlert>
            {
                !isLoading && !!errors.length &&
                    <Box mt={2}>
                      <Alert errors={errors} />
                    </Box>
            }
        </Grid>
    );
};

export default Username;