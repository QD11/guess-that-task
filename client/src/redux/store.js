import { configureStore } from '@reduxjs/toolkit';
import {persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './userSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const store = configureStore({
    reducer: {
        user: persistReducer(persistConfig, userReducer)
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

//let persistor = persistStore(store)

export const persistor = persistStore(store)
export default store;