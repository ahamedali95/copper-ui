import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import urls from "../../api/url";
import useQuery from "../../api/useQuery";
import { Profile as ProfileType } from "../../pages/profile/user/types";
import { setUserProfileExists, UserDetail } from "../../reducers/userReducer";

const useUserProfileQuery = () => {
    const { isLoading, isSuccess, data, errors, fetch } = useQuery<ProfileType>(urls.USER_PROFILE, "user", { method: "get" });
    const user = useSelector((state: {user: UserDetail}) => state.user);
    const dispatch = useDispatch();

    useEffect((): void => {
        if (data) {
            dispatch(setUserProfileExists(true));
        } else {
            dispatch(setUserProfileExists(false));
        }
    }, [data]);

    return {
        isLoading,
        isSuccess,
        data,
        errors,
        fetch,
        doesProfileExist: user.doesUserProfileExist
    };
};

export default useUserProfileQuery;