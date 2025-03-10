import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from "./contactsSlice";
import { filtersReducer } from "./filtersSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'contacts',
    storage,
    whitelist: ["items"]
}

const persistedContactsReducer = persistReducer(persistConfig, contactsReducer)


export const store = configureStore({
    reducer: {
        contacts: persistedContactsReducer,
        filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                ],
                ignoredPaths: ['contacts.items'],
            },
        }),
});

export const persistor = persistStore(store)