import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export interface CounterState {
	count: number;
}

const initialState: CounterState = {
	count: 0,
};

const exampleSlice = createSlice({
	name: 'example',
	initialState,
	reducers: {
		increment: (state) => {
			state.count += 1;
		},
		decrement: (state) => {
			state.count -= 1;
		},
		reset: (state) => {
			state.count = 0;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.count += action.payload;
		},
	},
});

export const { increment, decrement, reset, incrementByAmount } = exampleSlice.actions;

export const selectCount = (state: RootState) => state.example.count;

export type IncrementAction = ReturnType<typeof increment>;
export type DecrementAction = ReturnType<typeof decrement>;
export type ResetAction = ReturnType<typeof reset>;
export type IncrementByAmountAction = ReturnType<typeof incrementByAmount>;

export default exampleSlice.reducer;
