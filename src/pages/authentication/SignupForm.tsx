import React, {ChangeEvent, FC, useState, useEffect} from 'react';
import {Grid, Typography, TextField, Button, Box} from '@material-ui/core';
import logo from 'assets/icons/logo.svg';
import urls from "api/url";
import { useNavigate } from 'react-router-dom';
import useMutation from "api/useMutations";

const SignupForm: FC<{}> = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { isLoading, data, errors, fetch: createUser } = useMutation(urls.SIGNUP, "users", { method: 'post' });
    const navigate = useNavigate();

    useEffect(() => {
        data && navigate('/login');
    }, [data]);

    const handleSignOn = async (): Promise<void> => {
        console.log(username, password)
        createUser({ email: username, password });

    };

    return (
        <Grid
            container
            justifyContent='center'
            alignItems='center'
            direction='column'
        >
            <Box mt={10} sx={{minWidth: '500px', minHeight: '450px', padding: '50px'}} >
                <Grid
                    container
                    item
                    justifyContent='center'
                    direction='column'

                >
                    <img draggable="false" src={logo} style={{ minHeight: 270 }} />
                    <Typography>Enter your User ID</Typography>
                    <Box mt={1}/>
                    <TextField
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        value={username}
                    />
                    <Box mt={1}/>
                    <Typography>Enter your Password</Typography>
                    <Box mt={1}/>
                    <TextField
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        type='password'
                        value={password}
                    />
                    <Box mt={3}/>
                    <Grid item xs={12}>
                        <Button variant='contained' sx={{width: '100%'}} onClick={handleSignOn}>
                            Sign On
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </Grid>
    );
};

export default SignupForm;