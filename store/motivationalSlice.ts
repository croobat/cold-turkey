import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

type MotivationalQuote = {
	quote: string;
	author: string;
};

export interface MotivationalState {
	lastTime: number;
	lastQuote: MotivationalQuote;
}

const initialState: MotivationalState = {
	lastTime: 0,
	lastQuote: { quote: '', author: '' },
};

const motivationalSlice = createSlice({
	name: 'motivational',
	initialState,
	reducers: {
		setLastTime: (state: MotivationalState, action: PayloadAction<number>) => {
			state.lastTime = action.payload;
		},
		setLastQuote: (state: MotivationalState, action: PayloadAction<MotivationalQuote>) => {
			state.lastQuote = action.payload;
		},
		updateLastQuote: (state: MotivationalState, action: PayloadAction<MotivationalQuote>) => {
			state.lastQuote = action.payload;
			state.lastTime = Date.now();
		},
	},
});

export const { setLastTime, setLastQuote, updateLastQuote } = motivationalSlice.actions;

export const selectLastTime = (state: RootState) => state.motivational.lastTime;
export const selectLastQuote = (state: RootState) => state.motivational.lastQuote;

export type SetLastTimeAction = ReturnType<typeof setLastTime>;
export type SetLastQuoteAction = ReturnType<typeof setLastQuote>;
export type UpdateLastQuoteAction = ReturnType<typeof updateLastQuote>;

export default motivationalSlice.reducer;
