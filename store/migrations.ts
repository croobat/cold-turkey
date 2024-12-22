const migrations = {
	1: (state: any) => {
		state.logs.relapses = state.logs.without;
		delete state.logs.without;

		return state;
	},
};

export default migrations;
