import { Text, Button, SegmentedButtons, TextInput, Card } from 'react-native-paper';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { resetAllSlices, useAppDispatch } from '@/store';
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

import { style } from '@/constants/Styles';

export default function SettingsScreen() {
	const dispatch = useAppDispatch();

	const chigarrettesPerDay = useSelector(selectCigarettesPerDay);
	const pricePerCigarette = useSelector(selectPricePerCigarette);

	return (
		<SafeAreaView style={style.container}>
			<ScrollView contentContainerStyle={[style.paddingHorizontal, style.paddingBottom, style.rowGap]}>
				{/* Theme Settings */}
				<Card>
					<Card.Title title="Appearance" />
					<Card.Content style={[style.row]}>
						<Text variant="bodyMedium">Theme</Text>
						<SegmentedButtons
							style={{ width: 200 }}
							density="regular"
							value={useSelector(selectTheme)}
							onValueChange={(value) => dispatch(setTheme(value as Theme))}
							buttons={[
								{ value: 'light', label: 'Light', icon: 'white-balance-sunny' },
								{ value: 'dark', label: 'Dark', icon: 'weather-night' },
							]}
						/>
					</Card.Content>
				</Card>

				{/* Language and Currency Settings */}
				<Card>
					<Card.Title title="Preferences" />
					<Card.Content style={[style.rowGap]}>
						<View style={style.row}>
							<Text variant="bodyMedium">Language</Text>

							<SegmentedButtons
								style={{ width: 150 }}
								density="regular"
								value={useSelector(selectLanguage)}
								onValueChange={(value) => dispatch(setLanguage(value as Language))}
								buttons={[
									{ value: 'es', label: 'ES' },
									{ value: 'en', label: 'EN' },
								]}
							/>
						</View>

						<View style={style.row}>
							<Text variant="bodyMedium">Currency</Text>
							<SegmentedButtons
								style={{ width: 150 }}
								density="regular"
								value={useSelector(selectCurrency)}
								onValueChange={(value) => dispatch(setCurrency(value as Currency))}
								buttons={[
									{ value: 'MXN', label: 'MXN' },
									{ value: 'USD', label: 'USD' },
								]}
							/>
						</View>
					</Card.Content>
				</Card>

				{/* Stats Settings */}
				<Card>
					<Card.Title title="Statistics" />
					<Card.Content style={[style.rowGap]}>
						<TextInput
							label="Cigarettes per day"
							value={chigarrettesPerDay.toString()}
							onChangeText={(text) => dispatch(setCigarettesPerDay(parseInt(text) || 0))}
							keyboardType="numeric"
							mode="outlined"
							error={chigarrettesPerDay < 0}
						/>

						<TextInput
							label="Price per cigarette"
							value={pricePerCigarette.toString()}
							onChangeText={(text) => dispatch(setPricePerCigarette(parseFloat(text) || 0))}
							keyboardType="numeric"
							mode="outlined"
							error={pricePerCigarette < 0}
						/>
					</Card.Content>
				</Card>

				{/* Wipe Data Button */}
				<Button icon="delete" mode="contained-tonal" onPress={() => resetAllSlices()}>
					Wipe All Data
				</Button>
			</ScrollView>
		</SafeAreaView>
	);
}
