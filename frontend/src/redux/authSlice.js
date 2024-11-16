import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuthenticated: false,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        storeAuthData: (state, action) => {
            state.isAuthenticated = action.payload?.authUser ? true: false;
            state.user = action.payload?.authUser;
        }
    },
});

export const { storeAuthData } = authSlice.actions;
export default authSlice.reducer;