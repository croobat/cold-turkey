import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { Objective } from '@/types';

export interface ObjectivesState {
	objectives: Objective[];
}

const initialState: ObjectivesState = {
	objectives: [],
};

const objectivesSlice = createSlice({
	name: 'objectives',
	initialState,
	reducers: {
		addObjective: (state: ObjectivesState, action: PayloadAction<Objective>) => {
			state.objectives.push({
				...action.payload,
				id: Date.now(),
			});
		},
		resetObjectivesSlice: () => {
			return initialState;
		},
		deleteObjective: (state: ObjectivesState, action: PayloadAction<number>) => {
			state.objectives = state.objectives.filter((objective) => objective.id !== action.payload);
		},
		updateObjective: (state: ObjectivesState, action: PayloadAction<Objective>) => {
			const index = state.objectives.findIndex((objective) => objective.id === action.payload.id);
			if (index !== -1) {
				state.objectives[index] = action.payload;
			}
		},
	},
});

export const { addObjective, resetObjectivesSlice, deleteObjective, updateObjective } = objectivesSlice.actions;
export const selectObjectives = (state: RootState) => state.objectives.objectives;
export const selectObjectiveById = (state: RootState, id: number) =>
	state.objectives.objectives.find((objective) => objective.id === id);
export default objectivesSlice.reducer;
