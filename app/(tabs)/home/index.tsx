import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimatedFAB, Banner, IconButton, Portal, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useAppDispatch, useAppSelector } from '@/store';
import { selectLastQuote, updateLastQuote } from '@/store/motivationalSlice';

import { style } from '@/constants/Styles';
import motivationalQuotes from '@/constants/MotivationalQuotes.json';

export default function HomeScreen() {
	const dispatch = useAppDispatch();

	const [isResetConfirmVisible, setIsResetConfirmVisible] = useState(false);

	const getRandomQuote = useCallback(() => {
		const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
		const selectedQuote = motivationalQuotes[randomIndex];
		dispatch(updateLastQuote(selectedQuote));
	}, [dispatch]);

	// update motivational quote every 10 minutes
	useEffect(() => {
		getRandomQuote();
		const intervalId = setInterval(getRandomQuote, 10 * 1000 * 60);

		return () => clearInterval(intervalId);
	}, [dispatch, getRandomQuote]);

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

	return (
		<SafeAreaView style={[style.container, style.flexCentered]}>
			<Portal>
				<Banner visible={isResetConfirmVisible} icon="alert" actions={resetConfirmActions} style={style.lgPaddingTop}>
					<Text variant="bodyLarge">Are you sure you want to add a relapse, you will reset the timer?</Text>
				</Banner>
			</Portal>

			{/* motivational quote */}
			<View style={[style.centered, style.smRowGap, style.lgMargin, { maxWidth: 350 }]}>
				<Text variant="bodyLarge" style={styles.quoteText}>
					{lastQuote.quote}
				</Text>

				<Text variant="bodySmall" style={[styles.quoteText, { color: 'gray' }]}>
					- {lastQuote.author}
				</Text>

				<IconButton icon="refresh" mode="contained" onPress={getRandomQuote} />
			</View>

			<AnimatedFAB
				icon="restore"
				label="Reset"
				extended={false}
				onPress={() => setIsResetConfirmVisible(true)}
				style={style.fabStyle}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	quoteText: {
		fontStyle: 'italic',
		textAlign: 'center',
	},
});
