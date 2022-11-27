import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Grid, Typography, TextField, Button, Box, makeStyles} from '@material-ui/core';
import logo from 'assets/icons/logo.svg';
import urls from "api/url";
import { useNavigate } from 'react-router-dom';
import useMutation from "api/useMutations";
import {useCookies} from "react-cookie";

const useLoginFormStyles = makeStyles(() => {
    return {
        formContainer: {
            minWidth: '400px',
            minHeight: '450px',
            padding: '50px'
        }
    };
});

const LoginForm: FC<{}> = () => {
    const classes = useLoginFormStyles();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { isLoading, data, errors, fetch: authenticateUser } = useMutation(urls.SIGNON, "users", { method: 'post' });
    const navigate = useNavigate();

    useEffect(() => {
        console.log(data)
        data && navigate('/profile');
    }, [data]);

    const handleSignOn = async (): Promise<void> => {
        authenticateUser({ email: username, password });
    };

    return (
        <Grid
            container
            justifyContent='center'
            alignItems='center'
            direction='column'
        >
            <Box mt={10} className={classes.formContainer}>
                <Grid
                    container
                    item
                    justifyContent='center'
                    direction='column'

                >
                    <img src={logo} style={{ minHeight: 270 }} />
                    <Typography>Enter your User ID</Typography>
                    <Box mt={1}/>
                    <TextField
                        variant="outlined"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        value={username}
                    />
                    <Box mt={1}/>
                    <Typography>Enter your Password</Typography>
                    <Box mt={1}/>
                    <TextField
                        variant="outlined"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        type='password'
                        value={password}
                    />
                    <Box mt={3}/>
                    <Grid item xs={12}>
                        <Button fullWidth variant='contained' color='primary' onClick={handleSignOn}>
                            Sign On
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </Grid>
    );
};

export default LoginForm;