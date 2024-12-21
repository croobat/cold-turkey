import { configureStore } from '@reduxjs/toolkit';
import devtoolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';

import logsReducer from '@/store/logsSlice';
import motivationalReducer from '@/store/motivationalSlice';

const persistConfig = { key: 'root', storage: AsyncStorage };

const rootReducer = combineReducers({
	logs: logsReducer,
	motivational: motivationalReducer,
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
