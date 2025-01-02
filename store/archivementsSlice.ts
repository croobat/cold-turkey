import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { archivementList } from '@/constants/archivements';
type Archivement = {
	title: string;
	content: string;
	icon: string;
	iconColor: string;
};

export interface ArchivementsState {
	archivements: Archivement[];
}

const initialState: ArchivementsState = {
	archivements: archivementList,
};

const archivementsSlice = createSlice({
	name: 'archivements',
	initialState,
	reducers: {
		addArchivement: (state: ArchivementsState, action: PayloadAction<Archivement>) => {
			state.archivements.push(action.payload);
		},
		resetArchivementsSlice: () => {
			return initialState;
		},
	},
});

export const { addArchivement, resetArchivementsSlice } = archivementsSlice.actions;
export const selectArchivements = (state: RootState) => state.archivements.archivements;
export default archivementsSlice.reducer;
