import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./slices/auth.slice.ts"

export const store = configureStore({
    reducer: {
        counter: loginReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
