import { configureStore } from '@reduxjs/toolkit';
import devtoolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

import exampleReducer from '@/store/exampleSlice';

const persistConfig = { key: 'root', storage: AsyncStorage };

const rootReducer = combineReducers({
	example: exampleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: false,
	enhancers: (getDefaultEnhancers: any) => getDefaultEnhancers().concat(devtoolsEnhancer()),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
			immutableCheck: false,
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
