import {Grid, Box, makeStyles, Theme, Typography, Link, IconButton, Paper, Button, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText} from "@material-ui/core";
import React, {FC, useEffect, useState} from "react";
import EditProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";
import urls from "../../../api/url";
import type { Profile as ProfileType } from './types';
import Spinner from "../../../components/spinner";
import Alert from "../../../components/alert";
import {Edit, Add, Delete} from "@material-ui/icons";
import useMutation from "../../../api/useMutations";
import ConfirmationDialog from "../../../components/confirmationDialog";
import type { UserDetail } from '../../../reducers/userReducer';
import {useUserProfileQuery} from "../../../hooks/api";

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
            minHeight: 'calc(100vh - 20px)'
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
    const { isLoading: isProfileLoading, data: userProfileData, errors: userProfileFetchErrors, fetch: fetchUserProfile, doesProfileExist } = useUserProfileQuery();
    const { isLoading: isProfileDeleteInProgress, isSuccess: userProfileDeleteSuccess, errors: userProfileDeleteErrors, submit: deleteUserProfile } = useMutation(urls.USER_PROFILE, "user", { method: 'delete' });
    const userProfile = userProfileData?.attributes ?? {} as ProfileType;

    useEffect((): void => {
        (!isEditable || userProfileDeleteSuccess) && fetchUserProfile();
    }, [isEditable, userProfileDeleteSuccess]);

    const handleDeleteConfirm = (): void => {
        setIsDialogOpen(false);
        deleteUserProfile();
    };

    return (
        <Box mt={10}>
            {
                isEditable ?
                    <EditProfile
                        data={Object.keys(userProfile).length ? userProfile : INITIAL_STATE}
                        onCancel={() => setIsEditable(false)}
                    />
                    :
                    <>
                       <Spinner
                         isActive={isProfileLoading || isProfileDeleteInProgress}
                         className={(isProfileLoading || isProfileDeleteInProgress) ? classes.loader : ''}
                       >
                           <Grid container>
                               <Grid item xs={3}></Grid>
                               <Grid item xs={5}>
                                   {
                                       !isProfileDeleteInProgress && !!userProfileDeleteErrors.length && <Alert errors={userProfileDeleteErrors} />
                                   }
                                   {
                                       !isProfileLoading && !!userProfileFetchErrors.length && <Alert errors={userProfileFetchErrors} />
                                   }
                               </Grid>
                               <Grid item xs={4}>
                                   <Grid container justifyContent="flex-end" spacing={2}>
                                       {
                                           doesProfileExist ?
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
                               </Grid>
                           </Grid>
                       </Spinner>
                        {
                            !isProfileLoading && userProfileData &&
                                <>
                                    <Box mt={5} />
                                    <ViewProfile data={userProfile} />
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