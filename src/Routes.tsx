import ProtectedRoute from "pages/authentication/ProtectedRoute";
import React, { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { BrowserRouter, Route, Routes as ReactRoutes } from "react-router-dom";

import NavBar from "./components/NavBar";

const SignupForm = lazy(() => import("pages/authentication/SignupForm"));
const LoginForm = lazy(() => import("pages/authentication/LoginForm"));
const AccountSetting = lazy(() => import("pages/accountSetting/AccountSetting"));
const Profile = lazy(() => import("./pages/profile/user/Profile"));

type Route = {
    path: string;
    Component: LazyExoticComponent<FC<Record<string, never>>>;
    isProtectedRoute: boolean;
};

const routes: Route[] = [
    {
        path: "/signup",
        Component: SignupForm,
        isProtectedRoute: false
    },
    {
        path: "/login",
        Component: LoginForm,
        isProtectedRoute: false
    },
    {
        path: "/settings",
        Component: AccountSetting,
        isProtectedRoute: true
    },
    {
        path: "/profile",
        Component: Profile,
        isProtectedRoute: true
    }
];

const Routes: FC<Record<string, never>> = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <ReactRoutes>
                {routes.map((route: Route): JSX.Element => {
                    return (
                        <Route
                            element={(
                                <Suspense
                                    fallback={<div>Loading....</div>}
                                >
                                    {route.isProtectedRoute ? (
                                        <ProtectedRoute
                                            path={route.path}
                                        >
                                            <route.Component />
                                        </ProtectedRoute>
                                    )
                                        :
                                        <route.Component />}
                                </Suspense>
                            )}
                            key={route.path}
                            path={route.path}
                        />

                    )
                })}
            </ReactRoutes>
        </BrowserRouter>
    );
};

export default Routes;