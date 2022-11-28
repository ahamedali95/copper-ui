import React, {FC, useEffect, useState} from 'react';
import urls from "api/url";
import { useNavigate } from 'react-router-dom';
import useMutation from "api/useMutations";
import {useDispatch} from "react-redux";
import {setUserDetails, UserDetail} from "../../reducers/userReducer";
import CredentialForm from "./CredentialForm";
import {string, object} from 'yup';
import useCredentialValidation from "../../hooks/useCredentialValidation";
import Spinner from "../../components/spinner";
import {Box, Grid, makeStyles} from "@material-ui/core";
import Alert from "../../components/alert";

const useloginFormStyles = makeStyles(() => {
    return {
        loader: {
            minHeight: 'calc(100vh - 20px)'
        }
    };
});

const LoginForm: FC<{}> = () => {
    const classes = useloginFormStyles();
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
    const { isLoading, data, isSuccess, errors, submit: authenticateUser } = useMutation(urls.SIGNON, "users", { method: 'post' });
    const { username, password, validationErrors, setPassword, setUsername, onSubmit } = useCredentialValidation({ validationSchema: credentialSchema, userSubmit: authenticateUser });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect((): void => {
        if (isSuccess) {
            dispatch(setUserDetails(data?.attributes as UserDetail));
            navigate('/profile');
        }
    }, [data?.attributes, isSuccess]);

    return (
        <>
            <Spinner
                isActive={isLoading}
                className={classes.loader}
            >
                <CredentialForm
                    type="login"
                    errors={validationErrors}
                    username={username}
                    password={password}
                    onUserNameChange={setUsername}
                    onPasswordChange={setPassword}
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

export default LoginForm;