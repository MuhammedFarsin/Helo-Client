import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    lastName: "",
    helo_id:"",
    username: "",
    email: "",
    phone: "",
    profilePicture: "",
    password: "",
    googleId: "",
    displayName: "",
    isAdmin: false,
    isBlocked: false,
    bio: "",
};
console.log('this is initialState',initialState)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            Object.assign(state, action.payload);
        },
        removeUser: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
