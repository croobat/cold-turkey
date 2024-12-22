import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

type Log = {
	datetime: string;
	message: string;
};

export interface LogsState {
	relapses: Log[];
}

const initialState: LogsState = {
	relapses: [],
};

const logsSlice = createSlice({
	name: 'logs',
	initialState,
	reducers: {
		addLog: (state: LogsState, action: PayloadAction<Log>) => {
			state.relapses.push(action.payload);
		},
	},
});

export const { addLog } = logsSlice.actions;

export const selectLogs = (state: RootState) => state.logs.relapses;

export type AddLogAction = ReturnType<typeof addLog>;

export default logsSlice.reducer;
