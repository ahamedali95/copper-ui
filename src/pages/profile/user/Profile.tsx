import {Grid, Box, makeStyles, Theme, Typography, Link, IconButton, Paper, Button, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText} from "@material-ui/core";
import React, {FC, useEffect, useState} from "react";
import EditProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";
import useQuery from "../../../api/useQuery";
import urls from "../../../api/url";
import type { Profile as ProfileType } from './types';
import Spinner from "../../../components/spinner";
import Alert from "../../../components/alert/Alert";
import {Edit, Add, Delete} from "@material-ui/icons";
import useAuth from "../../../hooks/useAuth";
import useMutation from "../../../api/useMutations";
import ConfirmationDialog from "../../../components/confirmationDialog";

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
            cursor: 'pointer'
        },
        loader: {
            minHeight: '90vh'
        }
    };
});


const INITIAL_STATE2 = {
    firstName: 'Straut',
    lastName: 'Astropokesis',
    occupation: 'Software Engineer',
    company: 'JP Morgan',
    experience: '10+',
    twitterUrl: 'https://twitter.com/NYPDnews',
    githubUrl: 'https://github.com/ahamedali95',
    linkedInUrl: 'https://www.linkedin.com/in/ahameddev',
    dob: '12/23/1995',
    phoneNumber: '+16312443321',
    country: 'United States',
    city: 'Philadelphia',
    state: 'PA',
    postalCode: '34311',
    shortBio: 'Experienced software engineer with a demonstrated history of working in the financial services industry in building consumer facing application'
};

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    occupation: '',
    company: '',
    experience: '',
    twitterUrl: '',
    githubUrl: '',
    linkedInUrl: '',
    dob: '',
    phoneNumber: '',
    country: '',
    city: '',
    state: '',
    postalCode: '',
    shortBio: '',
};

const Profile: FC<{}> = () => {
    const classes = useProfileStyles();
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [profileDeleted, setProfileDeleted] = useState<boolean>(false);
    const { isLoading: isProfileLoading, data: userProfileData, errors: userProfileFetchErrors, fetch: fetchUserProfile } = useQuery<ProfileType>(urls.USER_PROFILE, "user", { method: "get" });
    const { isLoading: isProfileDeleteInProgress, data: userProfileDeleteData, errors: userProfileDeleteErrors, fetch: deleteUserProfile } = useMutation(urls.USER_PROFILE, "user", { method: 'delete' });
    const {cookies} = useAuth();

    console.log(userProfileDeleteData)
    console.log(userProfileData)

    useEffect((): void => {
        (!isEditable) && fetchUserProfile();
    }, [isEditable]);

    useEffect((): void => {
        (profileDeleted) && fetchUserProfile();
    }, [profileDeleted]);

    const userProfile = userProfileData?.attributes ?? {} as ProfileType;
    const doesProfileExist = cookies["doesUserProfileExist"] == 'true';

    const handleDeleteConfirm = async (): Promise<void> => {
        // setIsDialogOpen(true)
       try {
           await deleteUserProfile();
           setProfileDeleted(true);
       } catch (e) {

       }
        // await fetchUserProfile();
    };

    console.log(profileDeleted)

    return (
        <Box mt={10}>
            {
                isEditable ?
                    <EditProfile
                        data={Object.keys(userProfile).length ? userProfile : INITIAL_STATE}
                        onCancel={() => {
                            setIsEditable(false);
                        }}
                    />
                    :
                    <>
                       <Spinner
                         isActive={isProfileLoading || isProfileDeleteInProgress}
                         className={(isProfileLoading || isProfileDeleteInProgress) ? classes.loader : ''}
                       >
                           <Grid container justifyContent="flex-end" spacing={2}>
                               {
                                   !doesProfileExist ?
                                       <>
                                           <Grid item>
                                               <Button
                                                   startIcon={<Edit />}
                                                   onClick={() => setIsEditable(true)}
                                                   variant='outlined'
                                                   color='primary'
                                               >
                                                   Edit
                                               </Button>
                                           </Grid>
                                           <Grid item>
                                               <Button
                                                   startIcon={<Delete />}
                                                   onClick={() => setIsDialogOpen(true)}
                                                   variant='outlined'
                                                   color='primary'
                                               >
                                                   Delete
                                               </Button>
                                           </Grid>
                                       </>
                                       :
                                       <Grid item>
                                           <Button
                                               startIcon={<Add />}
                                               onClick={() => setIsEditable(true)}
                                               variant='outlined'
                                               color='primary'
                                           >
                                               Add
                                           </Button>
                                       </Grid>
                               }
                           </Grid>
                       </Spinner>
                        {
                            !isProfileLoading && userProfileData &&
                                <>
                                    <Box mt={5} />
                                    <ViewProfile data={userProfile} />
                                </>
                        }
                        {
                            !isProfileLoading && !!userProfileFetchErrors.length &&
                                <>
                                    <Box mt={5} />
                                    <Grid container justifyContent="center" alignItems="center">
                                        <Grid item xs={6}>
                                            <Alert errors={userProfileFetchErrors} />
                                        </Grid>
                                    </Grid>
                                </>
                        }
                    </>
            }
            <ConfirmationDialog
                isOpen={isDialogOpen}
                title="Profile Delete Confirmation"
                content="Are you sure you want to delete your profile?"
                onConfirm={handleDeleteConfirm}
                onClose={() => setIsDialogOpen(false)}
            />
        </Box>
    );
};

export default Profile;