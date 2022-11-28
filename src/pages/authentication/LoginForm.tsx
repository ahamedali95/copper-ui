import { Box, Grid, makeStyles } from "@material-ui/core";
import urls from "api/url";
import useMutation from "api/useMutations";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

import Alert from "../../components/alert";
import Spinner from "../../components/spinner";
import useCredentialValidation from "../../hooks/useCredentialValidation";
import { setUserDetails, UserDetail } from "../../reducers/userReducer";
import CredentialForm from "./CredentialForm";

const useloginFormStyles = makeStyles(() => {
    return {
        loader: {
            minHeight: "calc(100vh - 20px)"
        }
    };
});

const LoginForm: FC<Record<string, never>> = () => {
    const classes = useloginFormStyles();
    const credentialSchema = object().shape({
        username: string().label("Email").email().required(),
        password: string().label("Password").min(12).max(24).test(
            "password-req",
            "password must contain: 1 upper case letter and 1 lower case letter and 1 number and 1 special character of the following: !@#$%^&*",
            (value: any) => {
                return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/.test(value);
            })
            .required()
    });
    const { isLoading, data, isSuccess, errors, submit: authenticateUser } = useMutation(urls.SIGNON, "users", { method: "post" });
    const { username, password, validationErrors, setPassword, setUsername, onSubmit } = useCredentialValidation({ validationSchema: credentialSchema, userSubmit: authenticateUser });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect((): void => {
        if (isSuccess) {
            dispatch(setUserDetails(data?.attributes as UserDetail));
            navigate("/profile");
        }
    }, [data?.attributes, isSuccess]);

    return (
        <>
            <Spinner
                className={classes.loader}
                isActive={isLoading}
            >
                <CredentialForm
                    errors={validationErrors}
                    password={password}
                    type="login"
                    username={username}
                    onPasswordChange={setPassword}
                    onSubmitClick={onSubmit}
                    onUserNameChange={setUsername}
                />
                <Grid
                    container
                    justifyContent="center"
                >
                    <Grid
                        item
                        xs={3}
                    >
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
                </Grid>
            </Spinner>
        </>
    );
};

export default LoginForm;