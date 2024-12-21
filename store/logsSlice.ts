import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

type Log = {
	datetime: string;
	message: string;
};

export interface LogsState {
	without: Log[];
}

const initialState: LogsState = {
	without: [],
};

const logsSlice = createSlice({
	name: 'logs',
	initialState,
	reducers: {
		addLog: (state: LogsState, action: PayloadAction<Log>) => {
			state.without.push(action.payload);
		},
	},
});

export const { addLog } = logsSlice.actions;

export const selectLogs = (state: RootState) => state.logs.without;

export type AddLogAction = ReturnType<typeof addLog>;

export default logsSlice.reducer;
