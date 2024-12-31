import { configureStore } from '@reduxjs/toolkit';
import devtoolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';

import migrations from '@/store/migrations';

import logsReducer, { resetLogsSlice } from '@/store/logsSlice';
import motivationalReducer, { resetMotivationalSlice } from '@/store/motivationalSlice';
import settingsReducer, { resetSettingsSlice } from '@/store/settingsSlice';
const persistConfig = {
	key: 'root',
	version: 1,
	storage: AsyncStorage,
	migrate: createMigrate(migrations, { debug: false }),
};

const rootReducer = combineReducers({
	logs: logsReducer,
	motivational: motivationalReducer,
	settings: settingsReducer,
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

export const resetAllSlices = () => {
	store.dispatch(resetLogsSlice());
	store.dispatch(resetMotivationalSlice());
	store.dispatch(resetSettingsSlice());
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
