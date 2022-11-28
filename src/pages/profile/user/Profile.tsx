import { Box, Button, Grid, makeStyles, Theme } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import React, { FC, useEffect, useState } from "react";

import urls from "../../../api/url";
import useMutation from "../../../api/useMutations";
import Alert from "../../../components/alert";
import ConfirmationDialog from "../../../components/confirmationDialog";
import Spinner from "../../../components/spinner";
import { useUserProfileQuery } from "../../../hooks/api";
import EditProfile from "./EditProfile";
import type { Profile as ProfileType } from "./types";
import ViewProfile from "./ViewProfile";

const useProfileStyles = makeStyles((theme: Theme) => {
    return {
        pageTitle: {
            fontSize: theme.spacing(5),
            marginLeft: theme.spacing(2)
        },
        editBtn: {
            marginRight: theme.spacing(2)
        },
        link: {
            marginLeft: theme.spacing(1),
            cursor: "pointer"
        },
        loader: {
            minHeight: "calc(100vh - 20px)"
        }
    };
});

const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    occupation: "",
    company: "",
    experience: "",
    twitterUrl: "",
    githubUrl: "",
    linkedInUrl: "",
    dob: "",
    phoneNumber: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
    shortBio: ""
};

const Profile: FC<Record<string, never>> = () => {
    const classes = useProfileStyles();
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const { isLoading: isProfileLoading, data: userProfileData, errors: userProfileFetchErrors, fetch: fetchUserProfile, doesProfileExist } = useUserProfileQuery();
    const { isLoading: isProfileDeleteInProgress, isSuccess: userProfileDeleteSuccess, errors: userProfileDeleteErrors, submit: deleteUserProfile } = useMutation(urls.USER_PROFILE, "user", { method: "delete" });
    const userProfile = userProfileData?.attributes ?? {} as ProfileType;

    useEffect((): void => {
        (!isEditable || userProfileDeleteSuccess) && fetchUserProfile();
    }, [isEditable, userProfileDeleteSuccess]);

    const handleDeleteConfirm = (): void => {
        setIsDialogOpen(false);
        deleteUserProfile();
    };

    return (
        <Box
            mt={10}
        >
            {isEditable ? (
                <EditProfile
                    data={Object.keys(userProfile).length ? userProfile : INITIAL_STATE}
                    onCancel={() => setIsEditable(false)}
                />
            )
                : (
                    <>
                        <Spinner
                            className={(isProfileLoading || isProfileDeleteInProgress) ? classes.loader : ""}
                            isActive={isProfileLoading || isProfileDeleteInProgress}
                        >
                            <Grid container>
                                <Grid
                                    item
                                    xs={3}
                                ></Grid>
                                <Grid
                                    item
                                    xs={5}
                                >
                                    {!isProfileDeleteInProgress && !!userProfileDeleteErrors.length && (
                                        <Alert
                                            errors={userProfileDeleteErrors}
                                        />
                                    )}
                                    {!isProfileLoading && !!userProfileFetchErrors.length && (
                                        <Alert
                                            errors={userProfileFetchErrors}
                                        />
                                    )}
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                >
                                    <Grid
                                        container
                                        justifyContent="flex-end"
                                        spacing={2}
                                    >
                                        {doesProfileExist ? (
                                            <>
                                                <Grid item>
                                                    <Button
                                                        color="primary"
                                                        startIcon={<Edit />}
                                                        variant="outlined"
                                                        onClick={() => setIsEditable(true)}
                                                    >
                                                           Edit
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        color="primary"
                                                        startIcon={<Delete />}
                                                        variant="outlined"
                                                        onClick={() => setIsDialogOpen(true)}
                                                    >
                                                           Delete
                                                    </Button>
                                                </Grid>
                                            </>
                                        )
                                            : (
                                                <Grid item>
                                                    <Button
                                                        color="primary"
                                                        startIcon={<Add />}
                                                        variant="outlined"
                                                        onClick={() => setIsEditable(true)}
                                                    >
                                                       Add
                                                    </Button>
                                                </Grid>
                                            )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Spinner>
                        {!isProfileLoading && userProfileData && (
                            <>
                                <Box
                                    mt={5}
                                />
                                <ViewProfile
                                    data={userProfile}
                                />
                            </>
                        )}
                    </>
                )}
            <ConfirmationDialog
                content="Are you sure you want to delete your profile?"
                isOpen={isDialogOpen}
                title="Profile Delete Confirmation"
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </Box>
    );
};

export default Profile;