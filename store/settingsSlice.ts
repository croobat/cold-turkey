import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es';
export type Currency = 'usd' | 'eur' | 'mxn';

export interface SettingsState {
	theme: Theme;
	language: Language;
	currency: Currency;
	pricePerCigarette: number;
	cigarettesPerDay: number;
}

const initialState: SettingsState = {
	theme: 'dark',
	language: 'en',
	currency: 'usd',
	pricePerCigarette: 0,
	cigarettesPerDay: 0,
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setTheme: (state: SettingsState, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
		},
		setLanguage: (state: SettingsState, action: PayloadAction<Language>) => {
			state.language = action.payload;
		},
		setCurrency: (state: SettingsState, action: PayloadAction<Currency>) => {
			state.currency = action.payload;
		},
		setPricePerCigarette: (state: SettingsState, action: PayloadAction<number>) => {
			state.pricePerCigarette = action.payload;
		},
		setCigarettesPerDay: (state: SettingsState, action: PayloadAction<number>) => {
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
