import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {Member} from "../../types/basic";
import { toast } from 'react-toastify';

export interface memberReducer {
    member    : Member;
    token     : string
    isLogin   : boolean;
    isError   : boolean;
    isSuccess : boolean;
    isLoading : boolean;
}

const initialState: memberReducer = {
    member : {
        password : '',
        rePwd    : '',
        name     : '',
        nickname : '',
        birth    : '',
        email    : '',
    },
    token     : '',
    isLogin   : false,
    isError   : false,
    isSuccess : false,
    isLoading : false,
};

export const join = createAsyncThunk<string, Member, { rejectValue: string }>(
    'member/join',

    async (member: Member, { rejectWithValue }) => {

        try {
            const { data } = await axios.post(
                'auth/join',
                member,
            );

            return data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const login = createAsyncThunk<string, Member, { rejectValue: string }>(
    'member/login',
    async (userData: Member, { rejectWithValue }) => {
        //callback function

        try {
            const response = await axios.post(
                 '/auth/login',
                userData,
                { withCredentials: true }
            );

            return response.data.accessToken;
        } catch (error: any) {
            console.log("에러", error)
            if (error.response.data.status) {
                return rejectWithValue('아이디와 비밀번호를 확인하세요');
            } else {
                return rejectWithValue('아이디와 비밀번호를 확인하세요');
            }
        }
    }
);





export const memberSlice = createSlice({
    name : 'member',
    initialState,
    reducers : {
        init : (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
        },
    },

    extraReducers : (builder) => {
        builder
            .addCase(join.pending, (state, _) => {
                // 대기
                state.isLoading = true;
            })
            .addCase(join.fulfilled, (state, action) => {
                // 성공
                state.isLoading = false;
                state.isSuccess = true;

            })
            .addCase(join.rejected, (state,action :PayloadAction<any>) => {
                // 거절
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(login.pending, (state, _) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.token = action.payload;
                state.isLogin = true;
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                toast.error(action.payload);
            })
    }
})

export const {init} = memberSlice.actions;
export  default memberSlice.reducer;