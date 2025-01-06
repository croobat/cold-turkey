import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

type MotivationalQuote = {
	quote: string;
	author: string;
};

export interface MotivationalState {
	lastChange: number;
	lastQuote: MotivationalQuote;
}

const initialState: MotivationalState = {
	lastChange: 0,
	lastQuote: { quote: '', author: '' },
};

const motivationalSlice = createSlice({
	name: 'motivational',
	initialState,
	reducers: {
		setLastChange: (state: MotivationalState, action: PayloadAction<number>) => {
			state.lastChange = action.payload;
		},
		setLastQuote: (state: MotivationalState, action: PayloadAction<MotivationalQuote>) => {
			state.lastQuote = action.payload;
		},
		updateLastQuote: (state: MotivationalState, action: PayloadAction<MotivationalQuote>) => {
			state.lastQuote = action.payload;
			state.lastChange = Date.now();
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
