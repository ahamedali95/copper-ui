import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./userReducer";

const rootReducer = {
    user: userReducer
};

const store = configureStore({
    reducer: rootReducer,
    //@todo: disable devtools in production
    devTools: true
});

export default store;