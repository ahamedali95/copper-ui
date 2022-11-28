import React, { FC } from "react";
import { Grid, Typography, Paper, Box, makeStyles, Theme, Chip, Divider, IconButton } from "@material-ui/core";
import {Twitter, GitHub, LinkedIn} from "@material-ui/icons";
import { differenceInYears } from "date-fns";
import {experienceMap} from "../../../util/helpers";
import type { Profile } from "./types";

type ViewProfileProps = {
    data: Profile
};

const useViewProfileStyles = makeStyles((theme: Theme) => {
    return {
        userHighlights: {
            padding: theme.spacing(2),
            minHeight: "180px"
        },
        shortBio: {
            fontStyle: "italic",
            fontWeight: 400
        }
    };
});

const ViewProfile: FC<ViewProfileProps> = ({ data }) => {
    const classes = useViewProfileStyles();
    const age = differenceInYears(new Date(), new Date(data?.dob));

    return (
        <Grid
            container
            justifyContent="center"
        >
            <Grid
                item
                xs={11}
            >
                <Paper
                    className={classes.userHighlights}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        xs={12}
                    >
                        <Grid
                            item
                            xs={5}
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={2}
                            >
                                <Grid item>
                                    <Typography variant="h4">{`${data.firstName} ${data.lastName}`}</Typography>
                                </Grid>
                                <Grid item>
                                    <Box
                                        mt={0.5}
                                    />
                                    <Chip
                                        label={experienceMap.get(data.experience)}
                                    />
                                </Grid>
                            </Grid>
                            <Box
                                mt={1}
                            />
                            <Typography variant="body1">{`${data.occupation} ${data.company && "@"} ${data.company}`}</Typography>
                            <Box
                                mt={3}
                            />
                            <Typography
                                className={classes.shortBio}
                                variant="subtitle1"
                            >{data.shortBio && `"${data.shortBio}"`}</Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            justifyContent="center"
                            xs={2}
                        >
                            <Divider
                                flexItem
                                orientation="vertical"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={4}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Grid item>
                                    <Typography variant="body1"><strong>Age:</strong></Typography>
                                    <Box
                                        mt={1}
                                    />
                                    <Typography variant="body1"><strong>Years of experience:</strong></Typography>
                                    <Box
                                        mt={1}
                                    />
                                    <Typography variant="body1"><strong>Location:</strong></Typography>
                                    <Box
                                        mt={1}
                                    />
                                    <Typography variant="body1"><strong>Email/Phone:</strong></Typography>
                                    <Box
                                        mt={2}
                                    />
                                    <Grid
                                        container
                                        direction="row"
                                        spacing={4}
                                    >
                                        <Grid item>
                                            {data.twitterUrl && (
                                                <IconButton
                                                    onClick={() => window.open(data.twitterUrl, "_blank")!.focus()}
                                                >
                                                    <Twitter color="secondary"/>
                                                </IconButton>
                                            )}
                                        </Grid>
                                        <Grid item>
                                            {data.githubUrl && (
                                                <IconButton
                                                    onClick={() => window.open(data.githubUrl, "_blank")!.focus()}
                                                >
                                                    <GitHub color="secondary" />
                                                </IconButton>
                                            )}
                                        </Grid>
                                        <Grid item>
                                            {data.linkedInUrl && (
                                                <IconButton
                                                    onClick={() => window.open(data.linkedInUrl, "_blank")!.focus()}
                                                >
                                                    <LinkedIn color="secondary" />
                                                </IconButton>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">{age}</Typography>
                                    <Box
                                        mt={1}
                                    />
                                    <Typography variant="body1">{data.experience} years</Typography>
                                    <Box
                                        mt={1}
                                    />
                                    <Typography variant="body1">{`${data.city}, ${data.country}`}</Typography>
                                    <Box
                                        mt={1}
                                    />
                                    <Typography variant="body1">{data.phoneNumber}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ViewProfile;