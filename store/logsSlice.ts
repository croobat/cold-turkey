import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { RelapseLog, LogsSliceState } from '@/types';

const initialState: LogsSliceState = {
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
export const selectLastRelapse = (state: RootState): RelapseLog | undefined =>
	state.logs.relapses[state.logs.relapses.length - 1];

export type AddLogAction = ReturnType<typeof addRelapse>;
export type ResetLogsSliceAction = ReturnType<typeof resetLogsSlice>;

export default logsSlice.reducer;
