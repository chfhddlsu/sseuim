import {BookDetail, Books} from "../../types/basic";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios from "axios";
import {toast} from "react-toastify";

export interface bookReducer {
    book      : Books
    bookDetail : BookDetail;
    isError   : boolean;
    isSuccess : boolean;
    isLoading : boolean;
}

const initialState : bookReducer = {

    book : {
        title  : '',
        author : '',
        isbn13 : '',
        cover  : '',
        publisher : '',
    },

    bookDetail : {
        title         : '',
        author        : '',
        cover         : '',
        pubDate       : '',
        description   : '',
        isbn13        : '',  // bookId
        priceStandard : 0,
        categoryName  : '',
        publisher     : '',
        itemPage      : '',
        status        : '',
        score         : 0,
        memo          : [],
        memoCount     : 0
    },

    isError: false,
    isSuccess: false,
    isLoading: false,
}


export const getBookDetail = createAsyncThunk<BookDetail, string,  {rejectValue : string}>(
    'book/bookDetail',
    async (bookId, thunkAPI) => {
        try{
            const state = thunkAPI.getState() as RootState
            const {token} = state.member;
            const {data} = await axios.get (
                '/bookDetail',
                {
                    headers : {
                        Authorization : token,  // 토큰을 가진 사람만 데이터에 접근 가능
                    },
                    params : {bookId : bookId}
                }
            );

            return data;

        }catch (e :any){
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);


export const bookSlice = createSlice({
    name : 'book',
    initialState ,
    reducers : {
        init : () => initialState
    },
    extraReducers : (builder) =>{
        builder
            .addCase(getBookDetail.pending, (state, _) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getBookDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.bookDetail = {...action.payload};
            })
            .addCase(getBookDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                toast.error(action.payload);
            });
    }

});

export const {init} = bookSlice.actions;
export default bookSlice.reducer;