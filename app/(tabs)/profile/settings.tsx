import { useState } from 'react';
import {
	Text,
	Button,
	SegmentedButtons,
	TextInput,
	Card,
	useTheme,
	Dialog,
	Portal,
	AnimatedFAB,
} from 'react-native-paper';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

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

interface SettingsForm {
	theme: any;
	language: any;
	currency: any;
	cigarettesPerDay: number;
	pricePerCigarette: number;
}

export default function SettingsScreen() {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const paperTheme = useTheme();

	const theme = useSelector(selectTheme);
	const language = useSelector(selectLanguage);
	const currency = useSelector(selectCurrency);
	const cigarettesPerDay = useSelector(selectCigarettesPerDay);
	const pricePerCigarette = useSelector(selectPricePerCigarette);

	const [form, setForm] = useState<SettingsForm>({
		theme,
		language,
		currency,
		cigarettesPerDay,
		pricePerCigarette,
	});
	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleThemeChange = (theme: string) => setForm((prev) => ({ ...prev, theme }));
	const handleLanguageChange = (language: string) => setForm((prev) => ({ ...prev, language }));
	const handleCurrencyChange = (currency: string) => setForm((prev) => ({ ...prev, currency }));
	const handleChangeCigarettesPerDay = (text: string) =>
		setForm((prev) => ({ ...prev, cigarettesPerDay: parseInt(text) || 0 }));
	const handleChangePricePerCigarette = (text: string) =>
		setForm((prev) => ({ ...prev, pricePerCigarette: parseFloat(text) || 0 }));

	const handleWipeData = () => {
		resetAllSlices();
		router.replace('/');
		setIsDialogVisible(false);
	};

	const handleConfirmWipeData = () => {
		setIsDialogVisible(true);
	};

	const handleSubmit = () => {
		if (form.cigarettesPerDay < 0 || form.pricePerCigarette < 0) {
			setError('Values cannot be negative.');
			return;
		}

		i18n.changeLanguage(form.language);

		dispatch(setTheme(form.theme));
		dispatch(setLanguage(form.language));
		dispatch(setCurrency(form.currency));
		dispatch(setCigarettesPerDay(form.cigarettesPerDay));
		dispatch(setPricePerCigarette(form.pricePerCigarette));
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
								value={form.theme}
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
									value={form.language}
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
									value={form.currency}
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
								value={form.cigarettesPerDay.toString()}
								onChangeText={handleChangeCigarettesPerDay}
								keyboardType="numeric"
								mode="outlined"
								error={form.cigarettesPerDay < 0}
							/>

							<TextInput
								label={t('common.pricePerCigarette')}
								value={form.pricePerCigarette.toString()}
								onChangeText={handleChangePricePerCigarette}
								keyboardType="numeric"
								mode="outlined"
								error={form.pricePerCigarette < 0}
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
			<Portal>
				<Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
					<Dialog.Icon icon="alert" />
					<Dialog.Title>{t('settings.areYouSureYouWantToWipeAllData')}</Dialog.Title>
					<Dialog.Content>
						<Text>{t('form.thisActionCannotBeUndone')}</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => setIsDialogVisible(false)}>{t('form.cancel')}</Button>
						<Button onPress={handleWipeData} textColor={paperTheme.colors.error}>
							{t('form.confirm')}
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>

			<AnimatedFAB
				icon="check"
				label="Save"
				extended={false}
				onPress={handleSubmit}
				disabled={Boolean(error)}
				style={style.fabStyle}
			/>
		</SafeAreaView>
	);
}
