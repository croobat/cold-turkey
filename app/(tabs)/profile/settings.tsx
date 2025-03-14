import { useState } from 'react';
import { Text, Button, SegmentedButtons, TextInput, Card, useTheme, AnimatedFAB } from 'react-native-paper';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { resetAllSlices, useAppDispatch } from '@/store';
import AlertDialog from '@/components/AlertDialog';

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

	const paperTheme = useTheme();

	const theme = useSelector(selectTheme);
	const language = useSelector(selectLanguage);
	const currency = useSelector(selectCurrency);
	const cigarettesPerDay = useSelector(selectCigarettesPerDay);
	const pricePerCigarette = useSelector(selectPricePerCigarette);
	const [isDialogVisible, setIsDialogVisible] = useState(false);

	const handleThemeChange = (theme: any) => dispatch(setTheme(theme));

	const handleLanguageChange = (language: any) => {
		dispatch(setLanguage(language));
		i18n.changeLanguage(language);
	};

	const handleCurrencyChange = (currency: any) => dispatch(setCurrency(currency));

	const handleChangeCigarettesPerDay = (text: string) => {
		dispatch(setCigarettesPerDay(parseInt(text) || 0));
	};

	const handleChangePricePerCigarette = (text: string) => {
		dispatch(setPricePerCigarette(parseFloat(text) || 0));
	};

	const handleWipeData = () => {
		resetAllSlices();
		router.replace('/');
		setIsDialogVisible(false);
	};

	const handleConfirmWipeData = () => {
		setIsDialogVisible(true);
	};


	return (
		<SafeAreaView style={style.container}>
			<KeyboardAvoidingView
				style={style.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={100}
			>
				<ScrollView contentContainerStyle={[style.paddingHorizontal, style.paddingBottom, style.rowGap]}>
					{/* theme */}
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

					{/* preferences */}
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

					{/* stats */}
					<Card>
						<Card.Title title={t('settings.statistics')} />
						<Card.Content style={[style.rowGap]}>
							<TextInput
								label={t('common.cigarettesPerDay')}
								value={cigarettesPerDay.toString()}
								onChangeText={handleChangeCigarettesPerDay}
								keyboardType="numeric"
								mode="outlined"
								error={cigarettesPerDay === 0}
							/>

							<TextInput
								label={t('common.pricePerCigarette')}
								value={pricePerCigarette.toString()}
								onChangeText={handleChangePricePerCigarette}
								keyboardType="numeric"
								mode="outlined"
								error={pricePerCigarette === 0}
							/>
						</Card.Content>
					</Card>

					{/* danger zone */}
					<Card style={{ backgroundColor: paperTheme.colors.errorContainer }}>
						<Card.Content>
							<Button
								icon="delete"
								mode="contained-tonal"
								onPress={handleConfirmWipeData}
								buttonColor={paperTheme.colors.error}
								textColor={paperTheme.colors.errorContainer}
							>
								{t('settings.wipeAllData').toUpperCase()}
							</Button>
						</Card.Content>
					</Card>
				</ScrollView>
			</KeyboardAvoidingView>

			{/* confirmation dialog */}
			<AlertDialog
				show={isDialogVisible}
				setShow={setIsDialogVisible}
				title={t('settings.areYouSureYouWantToWipeAllData')}
				message={t('form.thisActionCannotBeUndone')}
				onConfirm={() => handleWipeData()}
				confirmText={t('form.confirm')}
				cancelText={t('form.cancel')}
			/>
		</SafeAreaView>
	);
}
