import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

type RelapseLog = {
	datetime: string;
	title: string;
	content: string;
};

export interface LogsState {
	relapses: RelapseLog[];
}

const initialState: LogsState = {
	relapses: [],
};

const logsSlice = createSlice({
	name: 'logs',
	initialState,
	reducers: {
		addRelapse: (state, action: PayloadAction<RelapseLog>) => {
			state.relapses.push(action.payload);
		},
		resetLogsSlice: () => {
			return initialState;
		},
	},
});

export const { addRelapse, resetLogsSlice } = logsSlice.actions;

export const selectRelapses = (state: RootState) => state.logs.relapses;

export type AddLogAction = ReturnType<typeof addRelapse>;
export type ResetLogsSliceAction = ReturnType<typeof resetLogsSlice>;

export default logsSlice.reducer;
