import { useCookies } from "react-cookie";

type CookieName = "access-token" | "username"

type UseAuthReturn = {
    cookies: any,
    isUserAuthenticated: boolean;
    deleteAccessToken: () => void;
    setValueInCookie: (name: CookieName, value: string) => void,
    onLogout: () => void;
    getValueInCookie: (name: CookieName) => string | undefined;
};

const useAuth = (): UseAuthReturn => {
    const cookieNames = ["access-token", "username"];
    const [cookies, setCookie, removeCookie] = useCookies(cookieNames);

    const setValueInCookie = (name: CookieName, value: string): void => {
        setCookie(name, value);
    }

    const getValueInCookie = (name: CookieName): string | undefined => {
        return cookies[name];
    };

    const deleteAccessToken = (): void => {
        removeCookie("access-token");
    };

    const handleLogout = (): void => {
        cookieNames.forEach((name: string) => {
            removeCookie(name);
        });
    };

    return {
        cookies,
        isUserAuthenticated: !!cookies["access-token"],
        deleteAccessToken,
        setValueInCookie,
        onLogout: handleLogout,
        getValueInCookie
    };
};

export default useAuth;