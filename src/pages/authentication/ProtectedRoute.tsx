import useAuth from "hooks/useAuth";
import React, { FC } from "react";
import {
    Navigate
} from "react-router-dom";

type ProtectedRouteProps = {
    path: string;
    children: JSX.Element;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ path, children }) => {
    const { isUserAuthenticated } = useAuth();
    return isUserAuthenticated ? children : <Navigate to="/login" />
};

export default ProtectedRoute;