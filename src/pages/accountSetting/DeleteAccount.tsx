import { Box, Button, Grid } from "@material-ui/core";
import { Alert as MuiAlert } from "@material-ui/lab";
import React, { FC, useEffect } from "react";

import urls from "../../api/url";
import useMutation from "../../api/useMutations";
import Alert from "../../components/alert";
import useAuth from "../../hooks/useAuth";

const DeleteAccount: FC<Record<string, never>> = () => {
    const { isLoading, data, isSuccess, errors, submit: deleteUser } = useMutation(urls.ACCOUNT_DETAIL, "user", { method: "delete" });
    const { onLogout } = useAuth();

    useEffect((): void => {
        isSuccess && onLogout();
    }, [isSuccess]);

    return (
        <Grid container>
            <Grid
                item
                xs={4}
            >
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => deleteUser()}
                >
                    Delete Account
                </Button>
            </Grid>
            <Box
                mt={2}
            />
            <MuiAlert severity="warning">Deleting you account will delete all the data associated with your account i.e., profile</MuiAlert>
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

export default DeleteAccount;