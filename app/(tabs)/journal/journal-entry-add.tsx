import React from 'react';
import { router } from 'expo-router';
import { formatISO } from 'date-fns';

import { useAppDispatch } from '@/store';
import { addJournalEntry } from '@/store/journalSlice';
import EntryForm, { EntryFormData } from '@/components/EntryForm';

export default function JournalEntryAddScreen() {
	const dispatch = useAppDispatch();

	const handleSubmit = (formData: EntryFormData) => {
		const datetime = formatISO(new Date());

		const journalEntry = {
			datetime,
			title: formData.title,
			content: formData.content,
		};

		dispatch(addJournalEntry(journalEntry));
		router.back();
	};

	return <EntryForm onSubmit={handleSubmit} />;
}
