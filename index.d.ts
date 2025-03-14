export type Motivation = {
	id?: number;
	title: string;
	content: string;
	image: string;
};
export type Achievement = {
	id: number;
	icon: string;
	title: string;
	description: string;
};
export type Objective = {
	id: number;
	title: string;
	description: string;
	cost: number;
	archivedAt: string;
};
