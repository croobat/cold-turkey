import { Text, Button, SegmentedButtons, TextInput, Card } from 'react-native-paper';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { resetAllSlices, useAppDispatch } from '@/store';
import {
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

import i18n from '@/locales';

import { style } from '@/constants/Styles';

export default function SettingsScreen() {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const theme = useSelector(selectTheme);
	const language = useSelector(selectLanguage);
	const currency = useSelector(selectCurrency);
	const chigarettesPerDay = useSelector(selectCigarettesPerDay);
	const pricePerCigarette = useSelector(selectPricePerCigarette);

	const handleThemeChange = (theme: string) => {
		if (theme === 'light' || theme === 'dark') {
			dispatch(setTheme(theme));
		}
	};

	const handleLanguageChange = (language: string) => {
		if (language === 'en' || language === 'es') {
			i18n.changeLanguage(language);
			dispatch(setLanguage(language));
		}
	};

	const handleCurrencyChange = (currency: string) => {
		if (currency === 'usd' || currency === 'eur' || currency === 'mxn') {
			dispatch(setCurrency(currency));
		}
	};

	const handleChangeCigarettesPerDay = (text: string) => {
		dispatch(setCigarettesPerDay(parseInt(text) || 0));
	};

	const handleChangePricePerCigarette = (text: string) => {
		dispatch(setPricePerCigarette(parseFloat(text) || 0));
	};

	const handleConfirmWipeData = () => {
		resetAllSlices();
	};

	return (
		<SafeAreaView style={style.container}>
			<ScrollView contentContainerStyle={[style.paddingHorizontal, style.paddingBottom, style.rowGap]}>
				{/* Theme Settings */}
				<Card>
					<Card.Title title={t('settings.appearance')} />
					<Card.Content style={[style.xsRowGap]}>
						<Text variant="bodyMedium">{t('settings.theme')}</Text>
						<SegmentedButtons
							density="regular"
							value={theme}
							onValueChange={handleThemeChange}
							buttons={[
								{ value: 'light', label: t('settings.light'), icon: 'white-balance-sunny' },
								{ value: 'dark', label: t('settings.dark'), icon: 'weather-night' },
							]}
						/>
					</Card.Content>
				</Card>

				{/* Language and Currency Settings */}
				<Card>
					<Card.Title title={t('settings.preferences')} />
					<Card.Content style={[style.rowGap]}>
						<View style={[style.xsRowGap]}>
							<Text variant="bodyMedium">{t('settings.language')}</Text>
							<SegmentedButtons
								density="regular"
								value={language}
								onValueChange={handleLanguageChange}
								buttons={[
									{ value: 'es', label: 'ES' },
									{ value: 'en', label: 'EN' },
								]}
							/>
						</View>

						<View style={[style.xsRowGap]}>
							<Text variant="bodyMedium">{t('settings.currency')}</Text>
							<SegmentedButtons
								density="regular"
								value={currency}
								onValueChange={handleCurrencyChange}
								buttons={[
									{ value: 'usd', label: 'USD' },
									{ value: 'eur', label: 'EUR' },
									{ value: 'mxn', label: 'MXN' },
								]}
							/>
						</View>
					</Card.Content>
				</Card>

				{/* Stats Settings */}
				<Card>
					<Card.Title title={t('settings.statistics')} />
					<Card.Content style={[style.rowGap]}>
						<TextInput
							label={t('settings.cigarettesPerDay')}
							value={chigarettesPerDay.toString()}
							onChangeText={handleChangeCigarettesPerDay}
							keyboardType="numeric"
							mode="outlined"
							error={chigarettesPerDay < 0}
						/>

						<TextInput
							label={t('settings.pricePerCigarette')}
							value={pricePerCigarette.toString()}
							onChangeText={handleChangePricePerCigarette}
							keyboardType="numeric"
							mode="outlined"
							error={pricePerCigarette < 0}
						/>
					</Card.Content>
				</Card>

				{/* Wipe Data Button */}
				<Button icon="delete" mode="contained-tonal" onPress={handleConfirmWipeData}>
					{t('settings.wipeAllData').toUpperCase()}
				</Button>
			</ScrollView>
		</SafeAreaView>
	);
}
