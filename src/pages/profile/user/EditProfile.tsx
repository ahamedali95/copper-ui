import React, {FC, useReducer, ChangeEvent, useState} from "react";
import {
    Typography,
    TextField,
    Grid,
    Box,
    TextareaAutosize, makeStyles, Theme, Button, Select, MenuItem, InputAdornment, Divider, FormHelperText
} from "@material-ui/core";
import {string, object} from 'yup';
import MuiPhoneNumber from 'material-ui-phone-number';
import {format, sub} from 'date-fns';
import {experienceMap} from "../../../util/helpers";
import {Twitter, GitHub, LinkedIn} from '@material-ui/icons';
import useMutation from "../../../api/useMutations";
import urls from "../../../api/url";
import type { Profile } from './types';
import { formReducer } from "../../../reducers";
import type { ActionWithPayload, ActionWithoutPayload } from "../../../reducers";
import Spinner from "../../../components/spinner";
import type { ResponseError } from '../../../api/types'
import Alert from "../../../components/alert/Alert";

const useProfileFormStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2)
        },
        shortBio: {
            width: '100%',
            maxWidth: 'inherit',
            maxHeight: theme.spacing(20)
        },
        shortBioError: {
            borderColor: theme.palette.primary.main
        },
        helperText: {
            marginLeft: theme.spacing(1.75)
        }
    };
});

type EditProfileProps = {
    data: Profile,
    onCancel: () => unknown;
};

const EditProfile: FC<EditProfileProps> = ({ data, onCancel }) => {
    const classes = useProfileFormStyles();
    const [state, dispatch] = useReducer<(state: Profile, action: ActionWithPayload<Profile> | ActionWithoutPayload) => Profile>(formReducer, data);
    const [validationErrors, setValidationErrors] = useState<Profile>({} as Profile);
    const { isLoading, errors, fetch } = useMutation(urls.USER_PROFILE, "user", { method: "post" });

    const handleChange = (property: keyof Profile, value: any): void => {
        dispatch({ type: 'UPDATE_PROPERTY', property, value });
    };

    const submitForm = async (): Promise<void> => {
        await fetch(state);
        onCancel();
    };

    const handleClick = async (): Promise<void> => {
        const profileSchema = object().shape({
            firstName: string().label('First Name').required().max(30),
            lastName: string().label("Last Name").required().max(30),
            occupation: string().label("Occupation").required().max(30),
            company: string().label("Company").notRequired().max(30),
            experience: string().label("Years of Experience").required(),
            twitterUrl: string().url().label("Twitter Url").notRequired(),
            githubUrl: string().url().label("Github Url").notRequired(),
            linkedInUrl: string().url().label("LinkedIn Url").notRequired(),
            dob: string().label("Date of Birth").required(),
            phoneNumber: string().label("Phone Number").required(),
            city: string().label("City").required().max(30),
            state: string().label("State").required().max(30),
            postalCode: string().label("Postal Code").notRequired().max(12),
            shortBio: string().label("Bio").notRequired().max(140)
        });

        try {
            await profileSchema.validate(state, { abortEarly: false, strict: true });
            setValidationErrors({} as Profile);
            submitForm();
        } catch(err) {
            const errors = (err as any).inner.reduce((acc: Profile, value: { path: string, message: string }): Profile => {
                return { ...acc, [value.path]: value.message };
            }, {});

            setValidationErrors(errors);
        }

    };

    const minDate = format(sub(new Date(), { years: 100 }), 'yyyy-MM-dd');
    const maxDate = format(new Date(), 'yyyy-MM-dd');

    console.log(state)



    return (
        <>
            <Spinner isActive={isLoading}>
                <>
                    <div className={classes.root}>
                        <Box mt={4} />
                        <Grid
                            container
                            justifyContent="center"
                        >
                            <Grid item xs={6}>
                                <Typography variant="h3">Edit Profile</Typography>
                                <Box mt={4} />
                                <Typography variant="body1" style={{textTransform: 'uppercase'}}>Personal Details</Typography>
                                <Grid item container direction="row" spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography>First Name</Typography>
                                        <Box mt={1} />
                                        <TextField error={!!validationErrors.firstName} helperText={validationErrors.firstName} fullWidth variant='outlined' value={state.firstName} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("firstName", e.target.value)}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Last Name</Typography>
                                        <Box mt={1} />
                                        <TextField error={!!validationErrors.lastName} helperText={validationErrors.lastName} fullWidth variant='outlined' value={state.lastName} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("lastName", e.target.value)}/>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography>Date of Birth</Typography>
                                        <Box mt={1} />
                                        <TextField
                                            error={!!validationErrors.dob} helperText={validationErrors.dob}
                                            type="date"
                                            inputProps={{
                                                min: minDate, max: maxDate
                                            }}
                                            variant='outlined'
                                            fullWidth
                                            value={state.dob}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("dob", e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography>City</Typography>
                                        <Box mt={1} />
                                        <TextField error={!!validationErrors.city} helperText={validationErrors.city} fullWidth variant='outlined' value={state.city} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("city", e.target.value)}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>State</Typography>
                                        <Box mt={1} />
                                        <TextField error={!!validationErrors.state} helperText={validationErrors.state} fullWidth variant='outlined' value={state.state} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("state", e.target.value)}/>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography>Postal Code</Typography>
                                        <Box mt={1} />
                                        <TextField
                                            error={!!validationErrors.postalCode} helperText={validationErrors.postalCode}
                                            fullWidth
                                            variant='outlined'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={state.postalCode} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("postalCode", e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Phone Number</Typography>
                                        <Box mt={1} />
                                        {/* @ts-ignore */}
                                        <MuiPhoneNumber
                                            error={!!validationErrors.phoneNumber} helperText={validationErrors.phoneNumber}
                                            fullWidth
                                            disableAreaCodes
                                            variant="outlined"
                                            defaultCountry={'us'}
                                            value={state.phoneNumber}
                                            onChange={(value1: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value2: any) => {
                                                handleChange("phoneNumber", value1);
                                                handleChange("country", value2.name)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Box mt={2} />
                                <Divider />
                                <Box mt={2} />
                                <Typography variant="body1" style={{textTransform: 'uppercase'}}>SOCIAL MEDIA LINKS</Typography>
                                <Grid item container direction="column" spacing={2}>
                                    <Grid item>
                                        <Box mt={1} />
                                        <TextField
                                            error={!!validationErrors.twitterUrl} helperText={validationErrors.twitterUrl}
                                            fullWidth
                                            variant='outlined'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"><Twitter color="secondary" /></InputAdornment>
                                                ),

                                            }}
                                            value={state.twitterUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("twitterUrl", e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            error={!!validationErrors.githubUrl} helperText={validationErrors.githubUrl}
                                            fullWidth
                                            variant='outlined'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"><GitHub color="secondary" /></InputAdornment>
                                                ),

                                            }}
                                            value={state.githubUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("githubUrl", e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            error={!!validationErrors.linkedInUrl} helperText={validationErrors.linkedInUrl}
                                            fullWidth
                                            variant='outlined'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"><LinkedIn color="secondary" /></InputAdornment>
                                                ),

                                            }}
                                            value={state.linkedInUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("linkedInUrl", e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Box mt={2} />
                                <Divider />
                                <Box mt={2} />
                                <Typography variant="body1" style={{textTransform: 'uppercase'}}>Professional History</Typography>
                                <Grid item container direction="row" spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography>Occupation</Typography>
                                        <Box mt={1} />
                                        <TextField error={!!validationErrors.occupation} helperText={validationErrors.occupation} fullWidth variant='outlined' value={state.occupation} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("occupation", e.target.value)}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Current Company</Typography>
                                        <Box mt={1} />
                                        <TextField  error={!!validationErrors.company} helperText={validationErrors.company} fullWidth variant='outlined' value={state.company} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("company", e.target.value)}/>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography>Years of Experience</Typography>
                                        <Box mt={1} />
                                        <Select
                                            error={!!validationErrors.experience}
                                            fullWidth
                                            variant="outlined"
                                            value={state.experience}
                                            onChange={(e: any) => handleChange("experience", e.target.value)}
                                        >
                                            {
                                               [...experienceMap.keys()].map((key: string): JSX.Element => {
                                                   return (
                                                       <MenuItem value={key} key={key}>{key}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                        <FormHelperText className={classes.helperText} error={!!validationErrors.experience}>{validationErrors.experience}</FormHelperText>
                                    </Grid>
                                </Grid>

                                <Grid item container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography>Tell us little more about you</Typography>
                                        <Box mt={1} />
                                        <TextareaAutosize
                                            className={`${classes.shortBio} ${validationErrors.shortBio ? classes.shortBioError : ''}`}
                                            minRows={4}
                                            maxRows={4}
                                            placeholder="Maximum 140 characters"
                                            value={state.shortBio} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange("shortBio", e.target.value)}
                                        />
                                        <FormHelperText className={classes.helperText} error={!!validationErrors.shortBio}>{validationErrors.shortBio}</FormHelperText>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12}>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" spacing={2} justifyContent="flex-end">
                                    <Grid item xs={2}>
                                        <Button fullWidth variant='outlined' color='primary' onClick={onCancel}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button fullWidth variant='contained' color='primary' onClick={handleClick}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                                {
                                    !isLoading && !!errors.length &&
                                        <>
                                            <Box mt={3} />
                                            <Alert errors={errors} />
                                        </>
                                }
                            </Grid>
                        </Grid>
                    </div>
                </>
            </Spinner>
        </>
    );
};

export default EditProfile;
