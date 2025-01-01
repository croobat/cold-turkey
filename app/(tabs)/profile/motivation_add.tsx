import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { AnimatedFAB, TextInput, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { formatISO } from 'date-fns';

import { useAppDispatch } from '@/store';
import { addMotivation } from '@/store/motivationsSlice';

import { style } from '@/constants/Styles';

interface Form {
	title: string;
	content: string;
	image: string;
}

const INITIAL_FORM: Form = {
	title: '',
	content: '',
	image: '',
};

export default function MotivationAddScreen() {
	const dispatch = useAppDispatch();
	const theme = useTheme();

	const [form, setForm] = useState<Form>(INITIAL_FORM);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = () => {
		if (!form.title.trim()) {
			setError('Title is required.');
			return;
		}

		const datetime = formatISO(new Date());

		const motivation = {
			datetime,
			title: form.title,
			content: form.content,
			// image: form.image,
		};

		dispatch(addMotivation(motivation));
		router.back();
	};

	return (
		<SafeAreaView style={[style.container]}>
			<View style={[style.lgMargin, style.lgRowGap]}>
				<View style={style.smRowGap}>
					<TextInput
						label="Title"
						value={form.title}
						mode="outlined"
						onChangeText={(text) => {
							setForm({ ...form, title: text });
							if (error) setError(null);
						}}
						error={!!error}
					/>
					{error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
				</View>

				<TextInput
					label="Content"
					value={form.content}
					mode="outlined"
					onChangeText={(text) => setForm({ ...form, content: text })}
				/>
			</View>

			<AnimatedFAB
				icon="check"
				label="Save"
				extended={false}
				onPress={handleSubmit}
				disabled={!!error}
				style={style.fabStyle}
			/>
		</SafeAreaView>
	);
}
