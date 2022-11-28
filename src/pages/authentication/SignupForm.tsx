import { Box, Grid, makeStyles } from "@material-ui/core";
import urls from "api/url";
import useMutation from "api/useMutations";
import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

import Alert from "../../components/alert";
import Spinner from "../../components/spinner";
import useCredentialValidation from "../../hooks/useCredentialValidation";
import CredentialForm from "./CredentialForm";

const useSignupFormStyles = makeStyles(() => {
    return {
        loader: {
            minHeight: "calc(100vh - 20px)"
        }
    };
});

const SignupForm: FC<Record<string, never>> = () => {
    const classes = useSignupFormStyles();
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
    const { isLoading, data, isSuccess, errors, submit: createUser } = useMutation(urls.SIGNUP, "users", { method: "post" });
    const { username, password, validationErrors, setPassword, setUsername, onSubmit } = useCredentialValidation({ validationSchema: credentialSchema, userSubmit: createUser });
    const navigate = useNavigate();

    useEffect((): void => {
        isSuccess && navigate("/login");
    }, [isSuccess]);

    return (
        <>
            <Spinner
                className={classes.loader}
                isActive={isLoading}
            >
                <CredentialForm
                    errors={validationErrors}
                    password={password}
                    type="signup"
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

export default SignupForm;