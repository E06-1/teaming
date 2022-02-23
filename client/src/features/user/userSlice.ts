import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from '../../app/store';

interface IUser{
    value: any;
}

const init: IUser={
    value: null
}

const getFromLocal = ()=>{
    let current_user = null;
    try{
        current_user = localStorage.getItem('current-user');
    }
    catch(error:any){

    }
    return current_user;
}
const deleteFromLocal = ()=>{
    
    try{
        localStorage.removeItem('current-user');
    }
    catch(error:any){

    }
}

 export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (data:any) =>
    {
        const {email1, password1} =data;
        const response = await axios.post(
            "http://localhost:4444/login",
            { email: email1, password: password1 },
            { headers: { "Content-Type": "application/json" } }
        )
        return response.data;
    }
);
// const fetchUser = async(username:string, password:string)=>{
//     const tmp = await axios
//     .post(
//       "http://localhost:4444/login",
//       { email: username, password: password },
//       { headers: { "Content-Type": "application/json" } }
//     )
//     .then((res: any) => {
//       console.log(res.data);
//     });
//   return tmp;
// }


const userSlice = createSlice({
    name: "user",
    initialState: init,
    reducers:{
        login: (state:any, action: any)=>{
            let user = getFromLocal();
            let data = null;
            // if(user === null){
            //   data=   fetchUser(action.payload)
            // }
            // console.log('data',data)
             state.value = user
        },
        logout: (state:any)=>{
            deleteFromLocal();
            state.value = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase( fetchUser.fulfilled, (state:any, action: any) =>{
            state.value = action.payload;
        })
    }
});

export default userSlice.reducer;
export const {login,logout} = userSlice.actions;
export const selectUser = (state:RootState) => state.user.value;
