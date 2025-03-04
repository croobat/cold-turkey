import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity, Animated } from 'react-native';
import { Text, ProgressBar, Card, IconButton, AnimatedFAB, useTheme, Icon, Banner } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

import { useAppSelector, useAppDispatch } from '@/store';
import { selectSavingsGoals, deleteSavingsGoal, SavingsGoal } from '@/store/goalsSlice';
import { selectLastRelapse } from '@/store/logsSlice';
import { selectCigarettesPerDay, selectPricePerCigarette } from '@/store/settingsSlice';
import { style } from '@/constants/Styles';
import { differenceInDays, parseISO } from 'date-fns';

const EmptyGoalsState = ({ onPress }: { onPress: () => void }) => {
	const { t } = useTranslation();
	const theme = useTheme();

	return (
		<View style={[style.container, style.centered, style.paddingHorizontal]}>
			<View style={[style.centered, style.smRowGap]}>
				<IconButton icon="target" size={48} />
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					{t('goal.noGoalsFound')}
				</Text>
				<Text variant="bodyMedium" style={{ textAlign: 'center', color: theme.colors.onSurfaceVariant }}>
					{t('goal.addAGoalToStartTracking')}
				</Text>
				<IconButton icon="plus" mode="contained" onPress={onPress} />
			</View>
		</View>
	);
};

export default function GoalScreen() {
	const { t } = useTranslation();
	const theme = useTheme();
	const dispatch = useAppDispatch();
	const goals = useAppSelector(selectSavingsGoals);
	const lastRelapse = useAppSelector(selectLastRelapse);
	const cigarettesPerDay = useAppSelector(selectCigarettesPerDay);
	const pricePerCigarette = useAppSelector(selectPricePerCigarette);

	const [refreshing, setRefreshing] = useState(false);
	const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
	const fadeAnim = useRef(new Animated.Value(0)).current;

	// smooth screen flicker when deleting a goal
	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: selectedGoal ? 1 : 0,
			duration: 200,
			useNativeDriver: true,
		}).start();
	}, [selectedGoal]);

	const goalResetConfirmActions = [
		{ label: t('form.cancel'), onPress: () => setSelectedGoal(null) },
		{
			label: t('form.confirm'),
			onPress: () => {
				if (!selectedGoal) return;

				dispatch(deleteSavingsGoal(selectedGoal.id));
				setSelectedGoal(null);
			},
		},
	];

	const calculateCigaretteSavings = () => {
		if (!lastRelapse?.datetime || !cigarettesPerDay || !pricePerCigarette) return 0;
		const daysSinceQuit = differenceInDays(new Date(), parseISO(lastRelapse.datetime));
		return daysSinceQuit * cigarettesPerDay * pricePerCigarette;
	};

	const calculateProgress = (amount: number, target: number) => {
		const progress = Math.min(amount / target, 1);
		return Number(progress.toFixed(2));
	};

	const handleRefresh = () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 500);
	};

	const cigaretteSavings = calculateCigaretteSavings();

	if (goals.length === 0 && cigaretteSavings === 0) {
		return <EmptyGoalsState onPress={() => router.push('/goal/goal-add')} />;
	}

	return (
		<>
			<Animated.View style={{ opacity: fadeAnim }}>
				<Banner
					visible={Boolean(selectedGoal)}
					icon="alert"
					actions={goalResetConfirmActions}
					style={[style.marginBottom, { elevation: 4 }]}
				>
					<Text>{t('goal.areYouSureYouWantToDeleteGoal')}</Text>
				</Banner>
			</Animated.View>

			<ScrollView
				style={style.container}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={theme.colors.primary} />
				}
			>
				<View style={style.paddingHorizontal}>
					{cigaretteSavings > 0 && (
						<Card style={style.marginBottom}>
							<Card.Title title={t('goal.cigaretteSavings')} />
							<Card.Content>
								<Text>
									{t('goal.cigaretteSavingsAmount', {
										amount: cigaretteSavings.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										}),
									})}
								</Text>
							</Card.Content>
						</Card>
					)}

					{goals.map((goal) => {
						const isCompleted = calculateProgress(goal.amount + cigaretteSavings, goal.target) === 1;
						const progress = calculateProgress(goal.amount + cigaretteSavings, goal.target);

						return (
							<Card key={goal.id} style={style.marginBottom}>
								<Card.Title
									title={goal.name}
									right={(props) => (
										<TouchableOpacity style={style.marginRight} onPress={() => setSelectedGoal(goal)}>
											<Icon {...props} source="delete" />
										</TouchableOpacity>
									)}
								/>
								<Card.Content style={style.smRowGap}>
									<ProgressBar
										progress={progress}
										color={
											calculateProgress(goal.amount + cigaretteSavings, goal.target) === 1
												? theme.colors.primary
												: theme.colors.tertiary
										}
									/>
									<View style={style.row}>
										<Text>
											{t('goal.progress', {
												current: (goal.amount + cigaretteSavings).toLocaleString('en-US', {
													style: 'currency',
													currency: 'USD',
												}),
												target: goal.target.toLocaleString('en-US', {
													style: 'currency',
													currency: 'USD',
												}),
											})}
										</Text>
										<Text>
											{isCompleted
												? t('health.congratulationsYouDidIt')
												: `${Math.round(progress * 100)}% ${t('health.completed')}`}
										</Text>
									</View>
								</Card.Content>
							</Card>
						);
					})}
				</View>
			</ScrollView>

			<AnimatedFAB
				icon="plus"
				label={t('goal.addNewGoal')}
				extended={false}
				onPress={() => router.push('/goal/goal-add')}
				style={style.fabStyle}
			/>
		</>
	);
}
