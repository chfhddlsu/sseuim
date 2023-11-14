import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {Member} from "../../types/basic";

export interface memberReducer {
    member    : Member;
    isLogin   : boolean;
    isError   : boolean;
    isSuccess : boolean;
    isLoading : boolean;
}

const initialState: memberReducer = {
    member : {
        id       : '',
        pwd      : '',
        rePwd    : '',
        name     : '',
        nickname : '',
        birth    : '',
        email    : '',
    },
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
                '/join',
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
    }
})

export const {init} = memberSlice.actions;
export  default memberSlice.reducer;