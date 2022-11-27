import {useCookies, Cookies} from "react-cookie";

type useAuthReturn = {
    cookies: any,
    isUserAuthenticated: boolean;
    deleteAccessToken: () => void;
    setAccessToken: (value: string) => void;
    setValueInCookie: (name: string, value: any) => void
};

const useAuth = (): useAuthReturn => {
    const TOKEN_COOKIE_NAME = 'access-token';
    const additionalCookieNames = ["doesUserProfileExist"];
    const [cookies, setCookie, removeCookie] = useCookies([TOKEN_COOKIE_NAME, ...additionalCookieNames]);

    const setValueInCookie = (name: string, value: any): void => {
        setCookie(name, value);
    };

    const deleteAccessToken = (): void => {
        removeCookie(TOKEN_COOKIE_NAME);
    };

    const setAccessToken = (token: string): void => {
        setCookie(TOKEN_COOKIE_NAME, token);
    };

    return {
        cookies,
        isUserAuthenticated: !!cookies[TOKEN_COOKIE_NAME],
        deleteAccessToken,
        setAccessToken,
        setValueInCookie
    };
};

export default useAuth;