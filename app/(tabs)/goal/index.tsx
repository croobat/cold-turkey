import React, { useState } from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Text, ProgressBar, Card, IconButton, AnimatedFAB, useTheme, Icon } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

import { useAppSelector, useAppDispatch } from '@/store';
import { selectSavingsGoals, deleteSavingsGoal, SavingsGoal } from '@/store/goalsSlice';
import { selectLastRelapse } from '@/store/logsSlice';
import { selectCigarettesPerDay, selectPricePerCigarette } from '@/store/settingsSlice';
import { style } from '@/constants/Styles';
import { differenceInDays, parseISO } from 'date-fns';
import DeleteAlertBanner from '@/components/DeleteAlertBanner';

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

	const handleDeleteGoal = () => {
		if (!selectedGoal) return;
		dispatch(deleteSavingsGoal(selectedGoal.id));
	};

	const calculateGlobalSavings = () => {
		if (!lastRelapse?.datetime || !cigarettesPerDay || !pricePerCigarette) return 0;
		const daysSinceQuit = differenceInDays(new Date(), parseISO(lastRelapse.datetime));
		return daysSinceQuit * cigarettesPerDay * pricePerCigarette;
	};

	const calculateGoalSavings = (createdAt?: string) => {
		if (!createdAt || !cigarettesPerDay || !pricePerCigarette) return 0;
		const daysSinceCreation = differenceInDays(new Date(), parseISO(createdAt));
		return daysSinceCreation * cigarettesPerDay * pricePerCigarette;
	};

	const calculateProgress = (amount: number, target: number) => {
		const progress = Math.min(amount / target, 1);
		return Number(progress.toFixed(2));
	};

	const handleRefresh = () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 500);
	};

	const globalSavings = calculateGlobalSavings();

	if (goals.length === 0 && globalSavings === 0) {
		return <EmptyGoalsState onPress={() => router.push('/goal/goal-add')} />;
	}

	return (
		<>
			<DeleteAlertBanner
				title={t('goal.areYouSureYouWantToDeleteGoal')}
				onDelete={() => handleDeleteGoal()}
				selectedItem={selectedGoal}
				setSelectedItem={setSelectedGoal}
			/>

			<ScrollView
				style={style.container}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={theme.colors.primary} />
				}
			>
				<View style={style.paddingHorizontal}>
					{globalSavings > 0 && (
						<Card style={style.marginBottom}>
							<Card.Title title={t('goal.cigaretteSavings')} />
							<Card.Content>
								<Text>
									{t('goal.cigaretteSavingsAmount', {
										amount: globalSavings.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										}),
									})}
								</Text>
							</Card.Content>
						</Card>
					)}

					{goals.map((goal) => {
						const goalSavings = calculateGoalSavings(goal.createdAt);
						const isCompleted = calculateProgress(goal.amount + goalSavings, goal.target) === 1;
						const progress = calculateProgress(goal.amount + goalSavings, goal.target);

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
											calculateProgress(goal.amount + goalSavings, goal.target) === 1
												? theme.colors.primary
												: theme.colors.tertiary
										}
									/>
									<View style={style.row}>
										<Text>
											{t('goal.progress', {
												current: (goal.amount + goalSavings).toLocaleString('en-US', {
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
												: `${Math.round(progress * 100)}% ${t('common.completed')}`}
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
