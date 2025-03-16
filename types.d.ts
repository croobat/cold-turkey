export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es';
export type Currency = 'usd' | 'eur' | 'mxn';

export type TimeMeasure = 'hours' | 'days' | 'weeks' | 'months' | 'years';

export type MotivationalQuote = {
	author: string;
	en: { quote: string };
	es: { quote: string };
};

export type Motivation = {
	id?: number;
	title: string;
	content: string;
	image: string;
};

export type Achievement = {
	id: string;
	icon: string;
	en: {
		title: string;
		content: string;
	};
	es: {
		title: string;
		content: string;
	};
	completedAt?: string | null;
};

export type Objective = {
	id: number;
	title: string;
	description: string;
	cost: number;
	archivedAt: string;
};

export type Milestone = {
	title: string;
	description: string;
	timeAmount: number;
	timeMeasure: TimeMeasure;
};

export type JournalEntry = {
	datetime: string;
	title: string;
	content: string;
};

export type RelapseLog = {
	datetime: string;
	title: string;
	content: string;
};

export interface SavingsGoal {
	id: string;
	amount: number;
	target: number;
	name: string;
	createdAt: string;
}

export interface SettingsSliceState {
	theme: Theme;
	language: Language;
	currency: Currency;
	pricePerCigarette: number;
	cigarettesPerDay: number;
}

export interface JournalSliceState {
	entries: JournalEntry[];
}

export interface LogsSliceState {
	relapses: RelapseLog[];
}

export interface MotivationalSliceState {
	lastChange: string;
	lastQuote: MotivationalQuote;
}

export interface MotivationsSliceState {
	motivations: Motivation[];
}

export interface GoalsSliceState {
	goals: SavingsGoal[];
}
