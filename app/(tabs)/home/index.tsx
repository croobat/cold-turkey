import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, RefreshControl, SafeAreaView } from 'react-native';
import { AnimatedFAB, Banner, Icon, IconButton, Text, Card, useTheme } from 'react-native-paper';
import { format, intervalToDuration, parseISO } from 'date-fns';
import { router } from 'expo-router';

import { useAppDispatch, useAppSelector } from '@/store';
import { selectLastQuote, updateLastQuote } from '@/store/motivationalSlice';
import { selectLastRelapse } from '@/store/logsSlice';
import { style } from '@/constants/Styles';
import motivationalQuotes from '@/constants/MotivationalQuotes.json';
import { METRICS } from '@/constants/Metrics';

const CIGARETTE_COST = 10;
const CIGARETTES_PER_DAY = 10;

export default function HomeScreen() {
	const dispatch = useAppDispatch();
	const [isResetConfirmVisible, setIsResetConfirmVisible] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [currentTime, setCurrentTime] = useState(new Date());
	const theme = useTheme();

	const getRandomQuote = useCallback(() => {
		const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
		const selectedQuote = motivationalQuotes[randomIndex];
		dispatch(updateLastQuote(selectedQuote));
	}, [dispatch]);

	useEffect(() => {
		getRandomQuote();
		const intervalId = setInterval(getRandomQuote, 10 * 1000 * 60);
		return () => clearInterval(intervalId);
	}, [dispatch, getRandomQuote]);

	const handleRefresh = () => {
		setIsRefreshing(true);
		setCurrentTime(new Date());
		setTimeout(() => setIsRefreshing(false), 500);
	};

	const lastQuote = useAppSelector(selectLastQuote);
	const lastRelapse = useAppSelector(selectLastRelapse);

	const quitDate = parseISO(lastRelapse?.datetime ?? new Date().toISOString());
	const duration = intervalToDuration({ start: quitDate, end: currentTime });
	const daysSinceQuit = duration.days ?? 0;
	const hoursSinceQuit = duration.hours ?? 0;
	const minutesSinceQuit = duration.minutes ?? 0;

	const cigarettesNotSmoked = Math.round((daysSinceQuit + hoursSinceQuit / 24) * CIGARETTES_PER_DAY);
	const moneySaved = cigarettesNotSmoked * CIGARETTE_COST;
	const dateSinceQuit = format(quitDate, 'MMMM d, yyyy');
	const timeSinceQuit = format(quitDate, 'p');

	const resetConfirmActions = [
		{
			label: 'Cancel',
			onPress: () => setIsResetConfirmVisible(false),
		},
		{
			label: 'Ok',
			onPress: () => {
				setIsResetConfirmVisible(false);
				router.navigate('/(tabs)/home/relapse-add');
			},
		},
	];

	return (
		<SafeAreaView style={style.container}>
			{/* Confirmation Banner */}
			<Banner visible={isResetConfirmVisible} icon="alert" actions={resetConfirmActions}>
				<Text>Are you sure you want to add a relapse? This will reset your progress.</Text>
			</Banner>

			<ScrollView
				contentContainerStyle={style.paddingHorizontal}
				refreshControl={
					<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={theme.colors.primary} />
				}
			>
				{/* Motivational Quote Section */}
				<Card style={[style.card, style.xsMarginBottom]}>
					<View style={[style.centered]}>
						<Text variant="bodyLarge" style={{ fontStyle: 'italic', textAlign: 'center' }}>
							{lastQuote.quote}
						</Text>
						<Text variant="bodyMedium" style={{ color: 'gray', textAlign: 'center', fontStyle: 'italic' }}>
							- {lastQuote.author}
						</Text>
						<IconButton icon="refresh" mode="contained" onPress={getRandomQuote} />
					</View>
				</Card>

				{/* Progress Overview Section */}
				<Card style={[style.card, style.xsMarginBottom]}>
					<Text variant="titleMedium" style={{ color: theme.colors.primary, textAlign: 'center' }}>
						Time since quitting
					</Text>
					<View style={[style.centered]}>
						<Text variant="titleMedium">{dateSinceQuit}</Text>
						<Text variant="titleMedium">At {timeSinceQuit}</Text>
					</View>
				</Card>

				{/* Not Smoked Since Section */}
				<Card style={[style.card, style.xsMarginBottom]}>
					<Text variant="titleMedium" style={{ color: theme.colors.primary, textAlign: 'center', marginBottom: 10 }}>
						Not smoked since
					</Text>
					<View style={[style.centered]}>
						{Boolean(daysSinceQuit) && <Text variant="titleMedium">{daysSinceQuit} days</Text>}
						{Boolean(hoursSinceQuit) && <Text variant="titleMedium">{hoursSinceQuit} hours</Text>}
						{minutesSinceQuit ? (
							<Text variant="titleMedium">{minutesSinceQuit} minutes</Text>
						) : (
							<Text variant="titleMedium">Right now</Text>
						)}
					</View>
				</Card>

				{/* Statistics Section */}
				<Card style={[style.card, style.xsMarginBottom]}>
					<Text variant="titleMedium" style={{ color: theme.colors.primary, textAlign: 'center', marginBottom: 10 }}>
						Key Statistics
					</Text>
					<View style={[style.row, { justifyContent: 'space-around' }]}>
						<View style={style.centered}>
							<Icon source="smoking-off" size={METRICS.icon} />
							<Text>{cigarettesNotSmoked}</Text>
						</View>
						<View style={style.centered}>
							<Icon source="wallet" size={METRICS.icon} />
							<Text>${moneySaved.toFixed(2)}</Text>
						</View>
						<View style={style.centered}>
							<Icon source="timer" size={METRICS.icon} />
							<Text>
								{daysSinceQuit}d {hoursSinceQuit}h
							</Text>
						</View>
						<View style={style.centered}>
							<Icon source="heart-pulse" size={METRICS.icon} />
							<Text>{cigarettesNotSmoked * 5}</Text>
						</View>
					</View>
				</Card>
			</ScrollView>

			{/* Reset FAB */}
			<AnimatedFAB
				icon="plus"
				label="Reset"
				extended={false}
				onPress={() => setIsResetConfirmVisible(true)}
				style={style.fabStyle}
			/>
		</SafeAreaView>
	);
}
