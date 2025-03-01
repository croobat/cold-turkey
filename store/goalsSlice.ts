import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface SavingsGoal {
	id: string;
	amount: number;
	target: number;
	name: string;
	createdAt: string;
}

interface GoalsState {
	goals: SavingsGoal[];
}

const initialState: GoalsState = {
	goals: [],
};

export const goalsSlice = createSlice({
	name: 'goals',
	initialState,
	reducers: {
		addSavingsGoal: (state, action: PayloadAction<Omit<SavingsGoal, 'id'>>) => {
			state.goals.push({
				...action.payload,
				id: Date.now().toString(),
			});
		},
		updateSavingsAmount: (state, action: PayloadAction<{ id: string; amount: number }>) => {
			const goal = state.goals.find((g) => g.id === action.payload.id);
			if (goal) {
				goal.amount = action.payload.amount;
			}
		},
		deleteSavingsGoal: (state, action: PayloadAction<string>) => {
			state.goals = state.goals.filter((goal) => goal.id !== action.payload);
		},
	},
});

export const { addSavingsGoal, updateSavingsAmount, deleteSavingsGoal } = goalsSlice.actions;

export const selectSavingsGoals = (state: RootState) => state.goals.goals;

export default goalsSlice.reducer;
