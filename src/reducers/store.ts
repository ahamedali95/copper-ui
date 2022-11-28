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

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export default store;