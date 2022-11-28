import React, {ChangeEvent, FC, useEffect} from "react";
import {Box, Button, Grid, InputAdornment, TextField} from "@material-ui/core";
import {Email} from "@material-ui/icons";
import { Alert as MuiAlert} from "@material-ui/lab";
import { string, object } from "yup";
import useMutation from "../../api/useMutations";
import useCredentialValidation from "../../hooks/useCredentialValidation";
import urls from "../../api/url";
import Alert from "../../components/alert";
import useAuth from "../../hooks/useAuth";

const Username: FC<Record<string, never>> = () => {
    const credentialSchema = object().shape({
        username: string().label("Email").email().required()
    });
    const { isLoading, data, isSuccess, errors, submit: updatedUsername } = useMutation(urls.ACCOUNT_DETAIL, "user", { method: "put" });
    const { username, validationErrors, setUsername, onSubmit } = useCredentialValidation({ validationSchema: credentialSchema, userSubmit: updatedUsername });
    const {onLogout} = useAuth();

    useEffect((): void => {
        isSuccess && onLogout();
    }, [isSuccess]);

    return (
        <Grid
            container
            direction="row"
            spacing={1}
        >
            <Grid item>
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><Email color="secondary" /></InputAdornment>
                        )
                    }}
                    error={!!validationErrors.username}
                    helperText={validationErrors.username}
                    value={username}
                    variant="outlined"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                />
            </Grid>
            <Grid item>
                <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </Grid>
            <MuiAlert severity="info">Updating username will log you out automatically.</MuiAlert>
            {!isLoading && !!errors.length && (
                <Box
                    mt={2}
                >
                    <Alert
                        errors={errors}
                    />
                </Box>
            )}
        </Grid>
    );
};

export default Username;