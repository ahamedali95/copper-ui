import React, {FC, useState, useEffect} from 'react';
import urls from "api/url";
import { useNavigate } from 'react-router-dom';
import useMutation from "api/useMutations";
import CredentialForm from "./CredentialForm";
import {Profile} from "../profile/user/types";
import { Credential } from './types';
import useCredentialValidation from "../../hooks/useCredentialValidation";
import Spinner from "../../components/spinner";
import {Box, makeStyles, Grid} from "@material-ui/core";
import Alert from "../../components/alert/Alert";
import {string, object} from 'yup';

const useSignupFormStyles = makeStyles(() => {
   return {
       loader: {
           minHeight: 'calc(100vh - 20px)'
       }
   };
});

const SignupForm: FC<{}> = () => {
    const classes = useSignupFormStyles();
    const credentialSchema = object().shape({
        username: string().label("Email").email().required(),
        password: string().label("Password").min(12).max(24).test(
            "password-req",
            'password must contain: 1 upper case letter and 1 lower case letter and 1 number and 1 special character of the following: !@#$%^&*',
            (value: any) => {
                return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/.test(value);
            })
            .required()
    });
    const { isLoading, data, isSuccess, errors, submit: createUser } = useMutation(urls.SIGNUP, "users", { method: 'post' });
    const { username, password, validationErrors, setPassword, setUsername, onSubmit } = useCredentialValidation({ validationSchema: credentialSchema, userSubmit: createUser });
    const navigate = useNavigate();

    useEffect((): void => {
        isSuccess && navigate('/login');
    }, [isSuccess]);

    return (
        <>
            <Spinner
                isActive={isLoading}
                className={classes.loader}
            >
                <CredentialForm
                    type="signup"
                    username={username}
                    password={password}
                    onUserNameChange={setUsername}
                    onPasswordChange={setPassword}
                    errors={validationErrors}
                    onSubmitClick={onSubmit}
                />
                <Grid container justifyContent="center">
                    <Grid item xs={3}>
                        {
                            !isLoading && !!errors.length &&
                            <Box mt={2}>
                              <Alert errors={errors} />
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Spinner>
        </>
    );
};

export default SignupForm;