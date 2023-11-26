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


export const getBookDetail = createAsyncThunk<BookDetail, string , {rejectValue : string}>(
    'book/bookDetail',
    async (bookId, thunkAPI) => {
        try{
            const URL = process.env.REACT_APP_ITEM_KEY

            const {data} = await axios.get (
                URL + bookId,
            );

            return data.item[0];

        }catch (e :any){
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const saveBook = createAsyncThunk(
    'book/saveBook',
    async (book :BookDetail, thunkAPI) => {
        try{
            const state = thunkAPI.getState() as RootState
            const {token} = state.member;

           // state.book.bookDetail.status = status;
            console.log("data",  token);

            const {data} = await axios.post (
                '/book/saveBook',
                book,
                {
                    headers : {
                        Authorization : token,  // 토큰을 가진 사람만 데이터에 접근 가능
                    },
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
            })
            /*책 저장 */
            .addCase(saveBook.pending, (state, _) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(saveBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;

            })
            .addCase(saveBook.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                toast.error("저장에 실패했습니다.");
            });
    }

});

export const {init} = bookSlice.actions;
export default bookSlice.reducer;