import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';

interface IUser{
    value: any;
}

const init: IUser={
    value: null
}


const userSlice = createSlice({
    name: "user",
    initialState: init,
    reducers:{
        login: (state:any, action: any)=>{
            state.value = action.payload
        },
        logout: (state:any)=>{
            state.value = null;
        }
    }
});

export default userSlice.reducer;
export const {login,logout} = userSlice.actions;
export const selectUser = (state:RootState) => state.user.value;
