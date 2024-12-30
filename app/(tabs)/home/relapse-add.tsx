import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { AnimatedFAB, TextInput } from 'react-native-paper';
import { router } from 'expo-router';
import { formatISO } from 'date-fns';

import { useAppDispatch } from '@/store';
import { addRelapse } from '@/store/logsSlice';

import { style } from '@/constants/Styles';

interface Form {
	title: string;
	content: string;
}

const INITIAL_FORM: Form = {
	title: '',
	content: '',
};

export default function RelapseAddScreen() {
	const dispatch = useAppDispatch();

	const [form, setForm] = useState<Form>(INITIAL_FORM);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = () => {
		if (!form.title.trim()) {
			setError('Title is required.');
			return;
		}

		const datetime = formatISO(new Date());

		const relapse = {
			datetime,
			title: form.title,
			content: form.content,
		};

		dispatch(addRelapse(relapse));
		router.back();
	};

	return (
		<SafeAreaView style={[style.container]}>
			<View style={[style.lgMargin, style.lgRowGap]}>
				<TextInput
					label="Title"
					value={form.title}
					onChangeText={(text) => {
						setForm({ ...form, title: text });
						if (error) setError(null);
					}}
					error={!!error}
				/>
				{error && <Text style={{ color: 'red' }}>{error}</Text>}

				<TextInput label="Content" value={form.content} onChangeText={(text) => setForm({ ...form, content: text })} />
			</View>

			<AnimatedFAB
				icon="check"
				label="Save"
				extended={true}
				disabled={!!error}
				onPress={handleSubmit}
				style={style.fabStyle}
			/>
		</SafeAreaView>
	);
}
