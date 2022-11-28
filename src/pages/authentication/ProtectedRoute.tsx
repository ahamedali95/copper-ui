import React, {FC} from "react";
import {
    Navigate
} from "react-router-dom";
import useAuth from "hooks/useAuth";

type ProtectedRouteProps = {
    path: string;
    children: JSX.Element;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ path, children }) => {
    const { isUserAuthenticated } = useAuth();
    console.log(isUserAuthenticated)

    return isUserAuthenticated ? children : <Navigate to="/login" />
};

export default ProtectedRoute;