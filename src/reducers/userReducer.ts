import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type UserDetail = {
    id: number;
    email: string;
    doesUserProfileExist: boolean;
};

const initialState = {
    id: 0,
    email: "",
    doesUserProfileExist: false
};

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<UserDetail>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        setUserProfileExists: (state, action: PayloadAction<boolean>) => {
            state.doesUserProfileExist = action.payload;
        }
    }
});

const { setUserDetails, setUserProfileExists } = user.actions;
const userReducer = user.reducer;

export type {
    UserDetail
};

export {
    userReducer,
    setUserDetails,
    setUserProfileExists
};