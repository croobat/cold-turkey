import { Text, Button, SegmentedButtons, useTheme, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { resetAllSlices, store } from '@/store';
import { useState } from 'react';
import {
	Currency,
	Language,
	setTheme,
	setLanguage,
	setCurrency,
	selectTheme,
	selectLanguage,
	selectCurrency,
	selectCigarettesPerDay,
	selectPricePerCigarette,
	setPricePerCigarette,
	setCigarettesPerDay,
} from '@/store/settingsSlice';
import { Theme } from '@/store/settingsSlice';
import { useSelector } from 'react-redux';

export default function SettingsScreen() {
	const theme = useTheme();
	const handleChangeTheme = (value: Theme) => {
		store.dispatch(setTheme(value));
	};
	const handleChangeLanguage = (value: Language) => {
		store.dispatch(setLanguage(value));
	};
	const handleChangeCurrency = (value: Currency) => {
		store.dispatch(setCurrency(value));
	};
	const handleWipeData = () => {
		resetAllSlices();
	};
	const handleChangeCigarettesPerDay = (value: string) => {
		const number = parseInt(value) || 0;
		if (number < 0) return;
		store.dispatch(setCigarettesPerDay(number));
	};
	const handleChangePricePerCigarette = (value: string) => {
		const number = parseFloat(value) || 0;
		if (number < 0) return;
		store.dispatch(setPricePerCigarette(number));
	};
	return (
		<SafeAreaView
			style={{
				flex: 1,
				gap: 20,
				justifyContent: 'flex-start',
				paddingLeft: 12,
				paddingRight: 12,
				paddingTop: 50,
			}}
		>
			<View style={{ gap: 10 }}>
				<Text variant="titleMedium" style={{ color: theme.colors.primary }}>
					App
				</Text>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Text variant="bodyLarge">Theme</Text>
					<SegmentedButtons
						density="small"
						value={useSelector(selectTheme)}
						onValueChange={(value) => handleChangeTheme(value as Theme)}
						theme={theme}
						style={{ width: 150 }}
						buttons={[
							{ value: 'light', label: 'Light', icon: 'white-balance-sunny' },
							{ value: 'dark', label: 'Dark', icon: 'weather-night' },
						]}
					/>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Text variant="bodyLarge">Language</Text>
					<SegmentedButtons
						density="small"
						value={useSelector(selectLanguage)}
						onValueChange={(value) => handleChangeLanguage(value as Language)}
						theme={theme}
						style={{ width: 150 }}
						buttons={[
							{ value: 'es', label: 'ES' },
							{ value: 'en', label: 'EN' },
						]}
					/>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Text variant="bodyLarge">Currency</Text>
					<SegmentedButtons
						density="small"
						value={useSelector(selectCurrency)}
						onValueChange={(value) => handleChangeCurrency(value as Currency)}
						theme={theme}
						style={{ width: 150 }}
						buttons={[
							{ value: 'MXN', label: 'MXN' },
							{ value: 'USD', label: 'USD' },
						]}
					/>
				</View>
				<Text variant="bodyLarge" style={{ color: theme.colors.primary }}>
					Stats
				</Text>
				<TextInput
					label="Cigarettes per day"
					value={useSelector(selectCigarettesPerDay).toString()}
					onChangeText={(text) => handleChangeCigarettesPerDay(text)}
					keyboardType="numeric"
				/>
				<TextInput
					label="Price per cigarette"
					value={useSelector(selectPricePerCigarette).toString()}
					onChangeText={(text) => handleChangePricePerCigarette(text)}
					keyboardType="numeric"
				/>
			</View>
			<Button icon="delete" onPress={handleWipeData} mode="contained" style={{ marginTop: 'auto', marginBottom: 20 }}>
				WIPE ALL DATA
			</Button>
		</SafeAreaView>
	);
}
