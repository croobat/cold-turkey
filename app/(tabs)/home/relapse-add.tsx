import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { AnimatedFAB, TextInput, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { formatISO } from 'date-fns';
import { useTranslation } from 'react-i18next';

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
	const theme = useTheme();
	const { t } = useTranslation();

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
				<View style={style.smRowGap}>
					<TextInput
						label={t('form.title')}
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
					label={t('form.content')}
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
