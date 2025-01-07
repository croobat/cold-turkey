import { configureStore } from '@reduxjs/toolkit';
import devtoolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { persistReducer, initStore, PersistConfig } from 'react-native-redux-persist2';
import { useDispatch, useSelector } from 'react-redux';

import logsReducer, { resetLogsSlice } from '@/store/logsSlice';
import motivationalReducer, { resetMotivationalSlice } from '@/store/motivationalSlice';
import motivationsReducer, { resetMotivationsSlice } from '@/store/motivationsSlice';
import settingsReducer, { resetSettingsSlice } from '@/store/settingsSlice';

const reducers = {
	logs: logsReducer,
	motivational: motivationalReducer,
	settings: settingsReducer,
};

const rootReducer = persistReducer(reducers);

export const store = configureStore({
	reducer: rootReducer,
	devTools: false,
	enhancers: (getDefaultEnhancers: any) => getDefaultEnhancers().concat(devtoolsEnhancer()),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
			immutableCheck: false,
			serializableCheck: false,
		}),
});

const persistConfig: PersistConfig = {
	key: 'root',
	storage: {
		type: 'AsyncStorage',
	},
};

initStore(store, persistConfig);

export const resetAllSlices = () => {
	store.dispatch(resetLogsSlice());
	store.dispatch(resetMotivationalSlice());
	store.dispatch(resetSettingsSlice());
	store.dispatch(resetMotivationsSlice());
	store.dispatch(resetArchivementsSlice());
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
