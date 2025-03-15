import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export type JournalEntry = {
	datetime: string;
	title: string;
	content: string;
};

export interface JournalState {
	entries: JournalEntry[];
}

const initialState: JournalState = {
	entries: [],
};

const journalSlice = createSlice({
	name: 'journal',
	initialState,
	reducers: {
		addJournalEntry: (state, action: PayloadAction<JournalEntry>) => {
			state.entries.push(action.payload);
		},
		resetJournalSlice: () => {
			return initialState;
		},
	},
});

export const { addJournalEntry, resetJournalSlice } = journalSlice.actions;

export const selectJournalEntries = (state: RootState) => state.journal.entries;
export const selectLastJournalEntry = (state: RootState): JournalEntry | undefined =>
	state.journal.entries[state.journal.entries.length - 1];

export default journalSlice.reducer;
