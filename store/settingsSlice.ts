import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { Theme, Language, Currency, SettingsSliceState } from '@/types';

const initialState: SettingsSliceState = {
	theme: 'light',
	language: 'en',
	currency: 'usd',
	pricePerCigarette: 0.5,
	cigarettesPerDay: 20,
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setTheme: (state: SettingsSliceState, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
		},
		setLanguage: (state: SettingsSliceState, action: PayloadAction<Language>) => {
			state.language = action.payload;
		},
		setCurrency: (state: SettingsSliceState, action: PayloadAction<Currency>) => {
			state.currency = action.payload;
		},
		setPricePerCigarette: (state: SettingsSliceState, action: PayloadAction<number>) => {
			state.pricePerCigarette = action.payload;
		},
		setCigarettesPerDay: (state: SettingsSliceState, action: PayloadAction<number>) => {
			state.cigarettesPerDay = action.payload;
		},
		resetSettingsSlice: () => {
			return initialState;
		},
	},
});

export const { setTheme, setLanguage, setCurrency, setPricePerCigarette, setCigarettesPerDay, resetSettingsSlice } =
	settingsSlice.actions;

export const selectTheme = (state: RootState) => state.settings.theme;
export const selectLanguage = (state: RootState) => state.settings.language;
export const selectCurrency = (state: RootState) => state.settings.currency;
export const selectPricePerCigarette = (state: RootState) => state.settings.pricePerCigarette;
export const selectCigarettesPerDay = (state: RootState) => state.settings.cigarettesPerDay;

export default settingsSlice.reducer;
