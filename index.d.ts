export type Motivation = {
	id?: number;
	title: string;
	content: string;
	image: string;
};
export type Achievement = {
	id: string;
	title: string;
	content: string;
	icon: string;
	completedAt?: string | null;
};
export type Objective = {
	id: number;
	title: string;
	description: string;
	cost: number;
	archivedAt: string;
};
