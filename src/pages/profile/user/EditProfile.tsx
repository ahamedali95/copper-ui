import {
    Box, Button, Divider, FormHelperText, Grid, InputAdornment, makeStyles, MenuItem, Select, TextareaAutosize,
    TextField, Theme, Typography
} from "@material-ui/core";
import { GitHub, LinkedIn, Twitter } from "@material-ui/icons";
import { format, sub } from "date-fns";
import MuiPhoneNumber from "material-ui-phone-number";
import React, { ChangeEvent, FC, useEffect, useReducer, useState } from "react";
import { object, string } from "yup";

import urls from "../../../api/url";
import useMutation from "../../../api/useMutations";
import Alert from "../../../components/alert";
import Spinner from "../../../components/spinner";
import type { ActionWithoutPayload, ActionWithPayload } from "../../../reducers";
import { formReducer } from "../../../reducers";
import { experienceMap } from "../../../util/helpers";
import type { Profile } from "./types";

const useProfileFormStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2)
        },
        shortBio: {
            width: "100%",
            maxWidth: "inherit",
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
    const { isLoading, errors, submit, isSuccess } = useMutation(urls.USER_PROFILE, "user", { method: "post" });

    useEffect((): void => {
        isSuccess && onCancel();
    }, [isSuccess]);

    const handleChange = (property: keyof Profile, value: any): void => {
        dispatch({ type: "UPDATE_PROPERTY", property, value });
    };

    const submitForm = async (): Promise<void> => {
        submit(state);
    };

    const handleClick = async (): Promise<void> => {
        const profileSchema = object().shape({
            firstName: string().label("First Name").required().max(30),
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

    const minDate = format(sub(new Date(), { years: 100 }), "yyyy-MM-dd");
    const maxDate = format(new Date(), "yyyy-MM-dd");

    return (
        <>
            <Spinner
                isActive={isLoading}
            >
                <>
                    <div
                        className={classes.root}
                    >
                        <Box
                            mt={4}
                        />
                        <Grid
                            container
                            justifyContent="center"
                        >
                            <Grid
                                item
                                xs={6}
                            >
                                <Typography variant="h3">Edit Profile</Typography>
                                <Box
                                    mt={4}
                                />
                                <Typography
                                    style={{ textTransform: "uppercase" }}
                                    variant="body1"
                                >Personal Details</Typography>
                                <Grid
                                    container
                                    direction="row"
                                    item
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <Typography>First Name</Typography>
                                        <Box
                                            mt={1}
                                        />
                                        <TextField
                                            error={!!validationErrors.firstName}
                                            fullWidth
                                            helperText={validationErrors.firstName}
                                            value={state.firstName}
                                            variant="outlined"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("firstName", e.target.value)}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <Typography>Last Name</Typography>
                                        <Box
                                            mt={1}
                                        />
                                        <TextField
                                            error={!!validationErrors.lastName}
                                            fullWidth
                                            helperText={validationErrors.lastName}
                                            value={state.lastName}
                                            variant="outlined"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("lastName", e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <Typography>Date of Birth</Typography>
                                        <Box
                                            mt={1}
                                        />
                                        <TextField
                                            inputProps={{
                                                min: minDate, max: maxDate
                                            }}
                                            error={!!validationErrors.dob}
                                            fullWidth
                                            helperText={validationErrors.dob}
                                            type="date"
                                            value={state.dob}
                                            variant="outlined"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("dob", e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    item
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <Typography>City</Typography>
                                        <Box
                                            mt={1}
                                        />
                                        <TextField
                                            error={!!validationErrors.city}
                                            fullWidth
                                            helperText={validationErrors.city}
                                            value={state.city}
                                            variant="outlined"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("city", e.target.value)}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <Typography>State</Typography>
                                        <Box
                                            mt={1}
                                        />
                                        <TextField
                                            error={!!validationErrors.state}
                                            fullWidth
                                            helperText={validationErrors.state}
                                            value={state.state}
                                            variant="outlined"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("state", e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <Typography>Postal Code</Typography>
                                        <Box
                                            mt={1}
                                        />
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            error={!!validationErrors.postalCode}
                                            fullWidth
                                            helperText={validationErrors.postalCode}
                                            value={state.postalCode}
                                            variant="outlined"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("postalCode", e.target.value)}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <Typography>Phone Number</Typography>
                                        <Box
                                            mt={1}
                                        />
                                        <MuiPhoneNumber
                                            defaultCountry={"us"}
                                            disableAreaCodes
                                            error={!!validationErrors.phoneNumber}
                                            fullWidth
                                            helperText={validationErrors.phoneNumber}
                                            value={state.phoneNumber}
                                            variant="outlined"
                                            /*
                                            // @ts-ignore */
                                            onChange={(value1: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value2: any) => {
                                                handleChange("phoneNumber", value1);
                                                handleChange("country", value2.name)
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Box
                                    mt={2}
                                />
                                <Divider />
                                <Box
                                    mt={2}
                                />
                                <Typography
                                    style={{ textTransform: "uppercase" }}
                                    variant="body1"
                                >SOCIAL MEDIA LINKS</Typography>
                                <Grid
                                    container
                                    direction="column"
                                    item
                                    spacing={2}
                                >
                                    <Grid item>
                                        <Box
                                            mt={1}
                                        />
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"><Twitter color="secondary" /></InputAdornment>
                                                )

                                            }}
                                            error={!!validationErrors.twitterUrl}
                                            fullWidth
                                            helperText={validationErrors.twitterUrl}
                                            value={state.twitterUrl}
                                            variant="outlined"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("twitterUrl", e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"><GitHub color="secondary" /></InputAdornment>
                                                )

                                            }}
                                            error={!!validationErrors.githubUrl}
                                            fullWidth
                                            helperText={validationErrors.githubUrl}
                                            value={state.githubUrl}
                                            variant="outlined"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("githubUrl", e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"><LinkedIn color="secondary" /></InputAdornment>
                                                )

                                            }}
                                            error={!!validationErrors.linkedInUrl}
                                            fullWidth
                                            helperText={validationErrors.linkedInUrl}
                                            value={state.linkedInUrl}
                                            variant="outlined"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("linkedInUrl", e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Box
                                    mt={2}
                                />
                                <Divider />
                                <Box
                                    mt={2}
                                />
                                <Typography
                                    style={{ textTransform: "uppercase" }}
                                    variant="body1"
                                >Professional History</Typography>
                                <Grid
                                    container
                                    direction="row"
                                    item
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <Typography>Occupation</Typography>
                                        <Box
                                            mt={1}
                                        />
                                        <TextField
                                            error={!!validationErrors.occupation}
                                            fullWidth
                                            helperText={validationErrors.occupation}
                                            value={state.occupation}
                                            variant="outlined"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("occupation", e.target.value)}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <Typography>Current Company</Typography>
                                        <Box
                                            mt={1}
                                        />
                                        <TextField
                                            error={!!validationErrors.company}
                                            fullWidth
                                            helperText={validationErrors.company}
                                            value={state.company}
                                            variant="outlined"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("company", e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={6}
                                    >
                                        <Typography>Years of Experience</Typography>
                                        <Box
                                            mt={1}
                                        />
                                        <Select
                                            error={!!validationErrors.experience}
                                            fullWidth
                                            value={state.experience}
                                            variant="outlined"
                                            onChange={(e: any) => handleChange("experience", e.target.value)}
                                        >
                                            {[...experienceMap.keys()].map((key: string): JSX.Element => {
                                                return (
                                                    <MenuItem
                                                        key={key}
                                                        value={key}
                                                    >{key}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText
                                            className={classes.helperText}
                                            error={!!validationErrors.experience}
                                        >{validationErrors.experience}</FormHelperText>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    item
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                    >
                                        <Typography>Tell us little more about you</Typography>
                                        <Box
                                            mt={1}
                                        />
                                        <TextareaAutosize
                                            className={`${classes.shortBio} ${validationErrors.shortBio ? classes.shortBioError : ""}`}
                                            maxRows={4}
                                            minRows={4}
                                            placeholder="Maximum 140 characters"
                                            value={state.shortBio}
                                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange("shortBio", e.target.value)}
                                        />
                                        <FormHelperText
                                            className={classes.helperText}
                                            error={!!validationErrors.shortBio}
                                        >{validationErrors.shortBio}</FormHelperText>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                    >
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-end"
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={2}
                                    >
                                        <Button
                                            color="primary"
                                            fullWidth
                                            variant="outlined"
                                            onClick={onCancel}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                    >
                                        <Button
                                            color="primary"
                                            fullWidth
                                            variant="contained"
                                            onClick={handleClick}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                                {!isLoading && !!errors.length && (
                                    <>
                                        <Box
                                            mt={3}
                                        />
                                        <Alert
                                            errors={errors}
                                        />
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </>
            </Spinner>
        </>
    );
};

export default EditProfile;
