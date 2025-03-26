import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import { AnimatedFAB, TextInput, Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { useAppDispatch } from '@/store';
import { addSavingsGoal } from '@/store/goalsSlice';
import { style } from '@/constants/Styles';

interface Form {
	name: string;
	target: string;
	amount: string;
}

const INITIAL_FORM: Form = {
	name: '',
	target: '',
	amount: '',
};

export default function GoalAddScreen() {
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const { t } = useTranslation();

	const [form, setForm] = useState<Form>(INITIAL_FORM);
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
		const target = parseFloat(form.target);
		if (!target || target <= 0) {
			setError(t('error.mustBeAnEntireNumberGreaterThanZero'));
			return;
		}

		const amount = parseFloat(form.amount) || 0;

		dispatch(
			addSavingsGoal({
				name: form.name || t('goal.defaultGoalName'),
				target,
				amount,
				createdAt: new Date().toISOString(),
			}),
		);
		router.back();
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
						<TextInput
							label={t('goal.goalName')}
							value={form.name}
							mode="outlined"
							onChangeText={(text) => setForm({ ...form, name: text })}
						/>

						<View style={style.smRowGap}>
							<TextInput
								label={t('goal.targetAmount')}
								value={form.target}
								mode="outlined"
								keyboardType="numeric"
								onChangeText={(text) => {
									setForm({ ...form, target: text });
									if (error) setError(null);
								}}
								error={!!error}
							/>
							{error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
						</View>

						<TextInput
							label={t('goal.currentAmount')}
							value={form.amount}
							mode="outlined"
							keyboardType="numeric"
							onChangeText={(text) => setForm({ ...form, amount: text })}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>

			<Animated.View style={animatedFabStyle}>
				<AnimatedFAB
					icon="check"
					label={t('form.save')}
					extended={false}
					onPress={handleSubmit}
					disabled={!!error}
					style={style.fabStyle}
				/>
			</Animated.View>
		</SafeAreaView>
	);
}
