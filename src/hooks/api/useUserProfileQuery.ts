import useQuery from "../../api/useQuery";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import urls from "../../api/url";
import {setUserProfileExists, UserDetail} from "../../reducers/userReducer";
import {Profile as ProfileType} from "../../pages/profile/user/types";

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