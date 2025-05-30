import React from 'react';
import { router } from 'expo-router';
import { formatISO } from 'date-fns';

import { useAppDispatch } from '@/store';
import { addRelapse } from '@/store/logsSlice';
import EntryForm, { EntryFormData } from '../../../components/EntryForm';

export default function RelapseAddScreen() {
	const dispatch = useAppDispatch();

	const handleSubmit = (formData: EntryFormData) => {
		const datetime = formatISO(new Date());

		const relapse = {
			datetime,
			title: formData.title,
			content: formData.content,
		};

		dispatch(addRelapse(relapse));
		router.back();
	};

	return <EntryForm onSubmit={handleSubmit} />;
}
