import {combineReducers, configureStore } from "@reduxjs/toolkit";
import memberReducer from './member/memberSlice'
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage/session';

const rootReducers  = combineReducers({
    member : memberReducer
})

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})


export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;