import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth.slice.ts"
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "@reduxjs/toolkit";
import {persistReducer,persistStore} from "redux-persist"

const reducers = combineReducers({
    auth:authReducer
})

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig,reducers)

export const store = configureStore({
    reducer: persistedReducer
})



export const persistor=persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
