import React, { useCallback, useEffect } from 'react';
import {} from '@/store/exampleSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectLastQuote, updateLastQuote } from '@/store/motivationalSlice';
import motivationalQuotes from '@/constants/MotivationalQuotes.json';
import { style } from '@/constants/Styles';

export default function HomeScreen() {
	const dispatch = useAppDispatch();

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

	return (
		<ScrollView contentContainerStyle={style.flexCentered}>
			<SafeAreaView style={[style.centered, style.largePadding]}>
				{/* motivational quote */}
				<View style={[style.centered, style.smallRowGap]}>
					<Text variant="bodyLarge" style={styles.quoteText}>
						{lastQuote.quote}
					</Text>

					<Text variant="bodySmall" style={[styles.quoteText, { color: 'gray' }]}>
						- {lastQuote.author}
					</Text>

					<IconButton icon="refresh" mode="contained" onPress={getRandomQuote} />
				</View>
			</SafeAreaView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	quoteText: {
		fontStyle: 'italic',
		textAlign: 'center',
	},
});
