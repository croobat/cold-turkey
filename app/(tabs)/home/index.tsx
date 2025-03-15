import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, RefreshControl, SafeAreaView } from 'react-native';
import { AnimatedFAB, Banner, Icon, IconButton, Text, Card, useTheme } from 'react-native-paper';
import { format, intervalToDuration, parseISO } from 'date-fns';
import { router, useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store';
import { selectLastQuote, updateLastQuote } from '@/store/motivationalSlice';
import { selectLastRelapse } from '@/store/logsSlice';
import { selectCigarettesPerDay, selectPricePerCigarette } from '@/store/settingsSlice';

import { style } from '@/constants/Styles';
import { METRICS } from '@/constants/Metrics';

import motivationalQuotes from '@/data/motivational-quotes.json';

import WelcomeModal from '@/components/WelcomeModal';
import EmptyRelapsesState from '@/components/EmptyRelapsesState';

const HomeCardTitle = ({ title }: { title: string }) => {
	const theme = useTheme();

	return (
		<Card.Title
			title={title}
			titleVariant="titleMedium"
			titleStyle={{ color: theme.colors.primary, textAlign: 'center' }}
		/>
	);
};

export default function HomeScreen() {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const theme = useTheme();

	const [isResetConfirmVisible, setIsResetConfirmVisible] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [currentTime, setCurrentTime] = useState(new Date());
	const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(false);

	const lastQuote = useAppSelector(selectLastQuote);
	const lastRelapse = useAppSelector(selectLastRelapse);
	const cigaretesPerDay = useAppSelector(selectCigarettesPerDay);
	const pricePerCigarette = useAppSelector(selectPricePerCigarette);

	const isoString = lastRelapse?.datetime || new Date().toISOString();
	const quitDate = parseISO(isoString);

	const duration = intervalToDuration({ start: quitDate, end: currentTime });
	const daysSinceQuit = duration.days ?? 0;
	const hoursSinceQuit = duration.hours ?? 0;
	const minutesSinceQuit = duration.minutes ?? 0;

	const cigarettesNotSmoked = Math.round((daysSinceQuit + hoursSinceQuit / 24) * cigaretesPerDay);
	const moneySaved = cigarettesNotSmoked * pricePerCigarette;
	const dateSinceQuit = format(quitDate, 'MMMM d, yyyy');
	const timeSinceQuit = format(quitDate, 'p');

	const resetConfirmActions = [
		{
			label: t('form.cancel'),
			onPress: () => setIsResetConfirmVisible(false),
		},
		{
			label: t('form.confirm'),
			onPress: () => {
				setIsResetConfirmVisible(false);
				router.navigate('/(tabs)/home/relapse-add');
			},
		},
	];

	const getRandomQuote = useCallback(() => {
		const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
		const selectedQuote = motivationalQuotes[randomIndex];
		dispatch(updateLastQuote(selectedQuote));
	}, [dispatch]);

	const handleRefresh = () => {
		setIsRefreshing(true);
		setCurrentTime(new Date());
		setTimeout(() => setIsRefreshing(false), 500);
	};

	const handleDismissWelcomeModal = () => {
		setIsWelcomeModalVisible(false);
	};

	useEffect(() => {
		getRandomQuote();
		const intervalId = setInterval(getRandomQuote, 10 * 1000 * 60);
		return () => clearInterval(intervalId);
	}, [dispatch, getRandomQuote]);

	useEffect(() => {
		if (!cigaretesPerDay && !pricePerCigarette) {
			setIsWelcomeModalVisible(true);
		}
	}, [cigaretesPerDay, pricePerCigarette]);

	// fetch new quote on focus
	useFocusEffect(useCallback(() => getRandomQuote(), [getRandomQuote]));

	// empty state
	if (lastRelapse === undefined) {
		return (
			<>
				<EmptyRelapsesState></EmptyRelapsesState>
				<WelcomeModal visible={isWelcomeModalVisible} onDismiss={handleDismissWelcomeModal} />
			</>
		);
	}

	return (
		<SafeAreaView style={style.container}>
			{/* confirmation Banner */}
			<Banner visible={isResetConfirmVisible} icon="alert" actions={resetConfirmActions} style={style.marginBottom}>
				<Text>
					{t('home.areYouSureYouWantToAddARelapse')} {t('home.thisWillResetYourProgress')}
				</Text>
			</Banner>

			<ScrollView
				contentContainerStyle={[style.paddingHorizontal, style.rowGap]}
				refreshControl={
					<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={theme.colors.primary} />
				}
			>
				{/* motivational quote section */}
				<Card style={style.padding}>
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

				{/* progress overview section */}
				<Card style={style.paddingBottom}>
					<HomeCardTitle title={t('home.timeSinceQuitting')} />
					<View style={[style.centered]}>
						<Text variant="titleMedium">{dateSinceQuit}</Text>
						<Text variant="titleMedium">At {timeSinceQuit}</Text>
					</View>
				</Card>

				{/* not smoked since section */}
				<Card style={style.paddingBottom}>
					<HomeCardTitle title={t('home.notSmokedSince')} />
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

				{/* statistics section */}
				<Card style={style.paddingBottom}>
					<HomeCardTitle title={t('home.keyStatistics')} />
					<View style={[style.row, style.marginBottom, { justifyContent: 'space-around' }]}>
						<View style={[style.centered, style.smRowGap]}>
							<Icon source="smoking-off" size={METRICS.icon} />
							<Text>{cigarettesNotSmoked}</Text>
						</View>
						<View style={[style.centered, style.smRowGap]}>
							<Icon source="wallet" size={METRICS.icon} />
							<Text>${moneySaved.toFixed(2)}</Text>
						</View>
						<View style={[style.centered, style.smRowGap]}>
							<Icon source="timer" size={METRICS.icon} />
							<Text>
								{daysSinceQuit}d {hoursSinceQuit}h
							</Text>
						</View>
						<View style={[style.centered, style.smRowGap]}>
							<Icon source="heart-pulse" size={METRICS.icon} />
							<Text>{cigarettesNotSmoked * 5}</Text>
						</View>
					</View>
				</Card>
			</ScrollView>

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
