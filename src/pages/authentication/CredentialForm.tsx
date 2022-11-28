import React, {ChangeEvent, FC} from 'react';
import {Box, Button, Grid, InputAdornment, makeStyles, TextField, Typography} from "@material-ui/core";
import logo from 'assets/icons/logo.svg';
import { Credential } from './types';
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
            minWidth: '400px',
            minHeight: '450px',
            padding: '50px'
        }
    };
});

const CredentialForm: FC<CredentialFormProps> = ({ username, password, onPasswordChange, onUserNameChange, onSubmitClick, type, errors }) => {
    const classes = useCredentialFormStyles();

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
                        error={!!errors.username}
                        helperText={errors.username}
                        variant="outlined"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onUserNameChange(e.target.value)}
                        value={username}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><Email color="secondary" /></InputAdornment>
                            )
                        }}
                    />
                    <Box mt={1}/>
                    <Typography>Enter your Password</Typography>
                    <Box mt={1}/>
                    <TextField
                        error={!!errors.password}
                        helperText={
                            <Typography variant="caption" style={{ maxWidth: '100px'}}>
                                {
                                    (errors.password ?? '').split(':').map((error: string) => {
                                        return <p key={error}>{error}</p>;
                                    })
                                }
                            </Typography>
                        }
                        variant="outlined"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onPasswordChange(e.target.value)}
                        type='password'
                        value={password}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><Lock color="secondary" /></InputAdornment>
                            )
                        }}
                    />
                    <Box mt={3}/>
                    <Grid item xs={12}>
                        <Button fullWidth variant='contained' color='primary' onClick={onSubmitClick}>
                            { type === 'signup' ? 'Sign Up' : 'Log In' }
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </Grid>
    );
};

export default CredentialForm;