import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { AnimatedFAB, Banner, Icon, IconButton, Portal, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, intervalToDuration, parseISO } from 'date-fns';
import { router } from 'expo-router';

import { useAppDispatch, useAppSelector } from '@/store';
import { selectLastQuote, updateLastQuote } from '@/store/motivationalSlice';

import { style } from '@/constants/Styles';
import motivationalQuotes from '@/constants/MotivationalQuotes.json';
import { METRICS } from '@/constants/Metrics';
import { useSelector } from 'react-redux';
import { selectLastRelapse } from '@/store/logsSlice';

// TODO: set currency, cigarrete cost and cigarretes per day to user preferences
const CIGARETTE_COST = 10;
const CIGARETTES_PER_DAY = 10;

export default function HomeScreen() {
	const dispatch = useAppDispatch();
	const [isResetConfirmVisible, setIsResetConfirmVisible] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false); // State to track refresh
	const [currentTime, setCurrentTime] = useState(new Date());
	const theme = useTheme();

	const getRandomQuote = useCallback(() => {
		const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
		const selectedQuote = motivationalQuotes[randomIndex];
		dispatch(updateLastQuote(selectedQuote));
	}, [dispatch]);

	// Update motivational quote every 10 minutes
	useEffect(() => {
		getRandomQuote();
		const intervalId = setInterval(getRandomQuote, 10 * 1000 * 60);
		return () => clearInterval(intervalId);
	}, [dispatch, getRandomQuote]);

	const handleRefresh = () => {
		setIsRefreshing(true);
		setCurrentTime(new Date());
		// Simulate a refresh delay
		setTimeout(() => setIsRefreshing(false), 500);
	};

	const lastQuote = useAppSelector(selectLastQuote);

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

	const lastRelapse = useSelector(selectLastRelapse);

	const quitDate = parseISO(lastRelapse?.datetime ?? new Date().toISOString());
	const duration = intervalToDuration({ start: quitDate, end: currentTime });
	const daysSinceQuit = duration.days ?? 0;
	const hoursSinceQuit = duration.hours ?? 0;
	const minutesSinceQuit = duration.minutes ?? 0;

	const cigarettesNotSmoked = Math.round((daysSinceQuit + hoursSinceQuit / 24) * CIGARETTES_PER_DAY);

	const moneySaved = cigarettesNotSmoked * CIGARETTE_COST;

	const dateSinceQuit = format(quitDate, 'MMMM d, yyyy');
	const timeSinceQuit = format(quitDate, 'p');

	if (lastRelapse === undefined) {
		return (
			<SafeAreaView style={style.container}>
				<ScrollView contentContainerStyle={[style.content, style.centered, style.rowGap]}>
					<Text variant="titleLarge">No quit date found</Text>
					<Text variant="bodyLarge" style={{ textAlign: 'center' }}>
						Please add a relapse to start tracking your progress.
					</Text>
					<IconButton icon="plus" mode="contained" onPress={() => router.navigate('/(tabs)/home/relapse-add')} />
				</ScrollView>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={style.container}>
			<ScrollView
				contentContainerStyle={[style.content]}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={handleRefresh}
						progressViewOffset={METRICS.xxl}
						tintColor={theme.colors.primary}
					/>
				}
			>
				<View style={[{ minHeight: '80%', justifyContent: 'space-evenly' }]}>
					{/* Motivational Quote */}
					<View style={[style.centered, style.xsRowGap]}>
						<Text variant="bodyLarge" style={{ fontStyle: 'italic', textAlign: 'center' }}>
							{lastQuote.quote}
						</Text>

						<Text variant="bodyMedium" style={[{ color: 'gray', fontStyle: 'italic', textAlign: 'center' }]}>
							- {lastQuote.author}
						</Text>

						<IconButton icon="refresh" mode="contained" onPress={getRandomQuote} />
					</View>

					{/* Time since quitting */}
					<View style={[style.centered]}>
						<Text variant="titleMedium" style={[style.xsMarginBottom, { color: theme.colors.primary }]}>
							Time since quitting
						</Text>

						<Text variant="titleMedium">{dateSinceQuit}</Text>
						<Text variant="titleMedium">At {timeSinceQuit}</Text>
					</View>

					{/* Not smoked since */}
					<View style={[style.centered]}>
						<Text variant="titleMedium" style={[style.xsMarginBottom, { color: theme.colors.primary }]}>
							Not smoked since
						</Text>

						{Boolean(daysSinceQuit) && <Text variant="titleMedium">{daysSinceQuit} days</Text>}
						{Boolean(hoursSinceQuit) && <Text variant="titleMedium">{hoursSinceQuit} hours</Text>}
						{minutesSinceQuit ? (
							<Text variant="titleMedium">{minutesSinceQuit} minutes</Text>
						) : (
							<Text variant="titleMedium">Right now</Text>
						)}
					</View>

					{/* Saved resources */}
					<View style={[style.centered, style.xsRowGap]}>
						<Text variant="titleMedium" style={[style.xsMarginBottom, { color: theme.colors.primary }]}>
							Saved
						</Text>

						<View style={[style.row, { width: '100%', justifyContent: 'space-evenly' }]}>
							<View style={[style.column, style.xsRowGap]}>
								<Icon source="smoking-off" size={METRICS.icon} />
								<Text variant="titleMedium">{cigarettesNotSmoked}</Text>
							</View>

							<View style={[style.column, style.xsRowGap]}>
								<Icon source="wallet" size={METRICS.icon} />
								<Text variant="titleMedium">${moneySaved.toFixed(2)}</Text>
							</View>

							<View style={[style.column, style.xsRowGap]}>
								<Icon source="timer" size={METRICS.icon} />
								<Text variant="titleMedium">
									{daysSinceQuit}d {hoursSinceQuit}h
								</Text>
							</View>

							<View style={[style.column, style.xsRowGap]}>
								<Icon source="heart-pulse" size={METRICS.icon} />
								<Text variant="titleMedium">{cigarettesNotSmoked * 5}</Text>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>

			<AnimatedFAB
				icon="plus"
				label="Reset"
				extended={false}
				onPress={() => setIsResetConfirmVisible(true)}
				style={style.fabStyle}
			/>

			<Portal>
				<Banner visible={isResetConfirmVisible} icon="alert" actions={resetConfirmActions} style={style.lgPaddingTop}>
					<Text variant="bodyLarge">Are you sure you want to add a relapse? This will reset your progress.</Text>
				</Banner>
			</Portal>
		</SafeAreaView>
	);
}
