import React, { FC, LazyExoticComponent, lazy, Suspense } from 'react';
import {
    BrowserRouter,
    Routes as ReactRoutes,
    Route,
} from "react-router-dom";
import ProtectedRoute from "pages/authentication/ProtectedRoute";
import NavBar from "./components/NavBar";

const SignupForm = lazy(() => import("pages/authentication/SignupForm"));
const LoginForm = lazy(() => import("pages/authentication/LoginForm"));
const Dashboard = lazy(() => import("pages/dashboard"));
const Profile = lazy(() => import("./pages/profile/user/Profile"));

type Route = {
    path: string;
    Component: LazyExoticComponent<FC>;
    isProtectedRoute: boolean;
};

const routes: Route[] = [
    {
        path: '/signup',
        Component: SignupForm,
        isProtectedRoute: false
    },
    {
        path: '/login',
        Component: LoginForm,
        isProtectedRoute: false
    },
    {
        path: '/dashboard',
        Component: Dashboard,
        isProtectedRoute: true
    },
    {
        path: '',
        Component: Dashboard,
        isProtectedRoute: false
    },
    {
        path: '/profile',
        Component: Profile,
        isProtectedRoute: true
    },
];

const Routes: FC<{}> = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <ReactRoutes>
                {
                    routes.map((route: Route): JSX.Element => {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                  <Suspense fallback={<div>Loading....</div>}>
                                      {
                                          route.isProtectedRoute ?
                                              <ProtectedRoute
                                                  path={route.path}
                                              >
                                                  <route.Component />
                                              </ProtectedRoute>
                                              :
                                              <route.Component />

                                      }
                                  </Suspense>
                                }
                            />

                        )
                    })
                }
            </ReactRoutes>
        </BrowserRouter>
    );
};

export default Routes;