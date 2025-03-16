import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { formatISO } from 'date-fns';
import type { RootState } from '@/store';
import type { MotivationalQuote, MotivationalSliceState } from '@/types';

const initialState: MotivationalSliceState = {
	lastChange: '',
	lastQuote: { author: '', en: { quote: '' }, es: { quote: '' } },
};

const motivationalSlice = createSlice({
	name: 'motivational',
	initialState,
	reducers: {
		setLastChange: (state: MotivationalSliceState, action: PayloadAction<string>) => {
			state.lastChange = action.payload;
		},
		setLastQuote: (state: MotivationalSliceState, action: PayloadAction<MotivationalQuote>) => {
			state.lastQuote = action.payload;
		},
		updateLastQuote: (state: MotivationalSliceState, action: PayloadAction<MotivationalQuote>) => {
			state.lastQuote = action.payload;
			state.lastChange = formatISO(new Date());
		},
		resetMotivationalSlice: () => {
			return initialState;
		},
	},
});

export const { setLastChange, setLastQuote, updateLastQuote, resetMotivationalSlice } = motivationalSlice.actions;

export const selectLastChange = (state: RootState) => state.motivational.lastChange;
export const selectLastQuote = (state: RootState) => state.motivational.lastQuote;

export type SetLastChangeAction = ReturnType<typeof setLastChange>;
export type SetLastQuoteAction = ReturnType<typeof setLastQuote>;
export type UpdateLastQuoteAction = ReturnType<typeof updateLastQuote>;
export type ResetMotivationalSliceAction = ReturnType<typeof resetMotivationalSlice>;

export default motivationalSlice.reducer;
