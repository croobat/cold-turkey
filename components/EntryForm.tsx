import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import { AnimatedFAB, TextInput, useTheme } from 'react-native-paper';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

import { style } from '../constants/Styles';

export interface EntryFormData {
	title: string;
	content: string;
}

interface EntryFormProps {
	onSubmit: (data: EntryFormData) => void;
	initialData?: EntryFormData;
}

const INITIAL_FORM: EntryFormData = {
	title: '',
	content: '',
};

export default function EntryForm({ onSubmit, initialData = INITIAL_FORM }: EntryFormProps) {
	const theme = useTheme();
	const { t } = useTranslation();

	const [form, setForm] = useState<EntryFormData>(initialData);
	const [error, setError] = useState<string | null>(null);
	const fabTranslateY = useSharedValue(0);

	// move FAB up when keyboard is shown
	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			const fabHeight = Platform.OS === 'ios' ? -300 : -30;
			fabTranslateY.value = withTiming(fabHeight, { duration: 200 });
		});
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			fabTranslateY.value = withTiming(0, { duration: 200 });
		});

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	const handleSubmit = () => {
		if (!form.title.trim()) {
			setError('Title is required.');
			return;
		}

		onSubmit(form);
	};

	const animatedFabStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: fabTranslateY.value }],
		};
	});

	return (
		<SafeAreaView style={[style.container]}>
			<KeyboardAvoidingView
				style={style.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={100}
			>
				<ScrollView>
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
							multiline
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>

			<Animated.View style={animatedFabStyle}>
				<AnimatedFAB
					icon="check"
					label="Save"
					extended={false}
					onPress={handleSubmit}
					disabled={!!error}
					style={style.fabStyle}
				/>
			</Animated.View>
		</SafeAreaView>
	);
}
