import { useState } from 'react';
import { Text, Button, SegmentedButtons, TextInput, Card, useTheme } from 'react-native-paper';
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

interface SettingsForm {
	cigarettesPerDay: number;
	pricePerCigarette: string;
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
	const [isDialogVisible, setIsDialogVisible] = useState(false);

	const [form, setForm] = useState<SettingsForm>({
		cigarettesPerDay: cigarettesPerDay,
		pricePerCigarette: pricePerCigarette.toString(),
	});

	const disableButton =
		!form.cigarettesPerDay ||
		!form.pricePerCigarette ||
		form.cigarettesPerDay === 0 ||
		form.pricePerCigarette === '0' ||
		(form.cigarettesPerDay === cigarettesPerDay && form.pricePerCigarette === pricePerCigarette.toString());

	const handleChangeCigarettesPerDay = (text: string) =>
		setForm((prev) => ({ ...prev, cigarettesPerDay: parseInt(text) || 0 }));

	const handleChangePricePerCigarette = (text: string) => {
		setForm((prev) => ({ ...prev, pricePerCigarette: text }));
	};

	const handleThemeChange = (theme: any) => dispatch(setTheme(theme));

	const handleLanguageChange = (language: any) => {
		dispatch(setLanguage(language));
		i18n.changeLanguage(language);
	};

	const handleCurrencyChange = (currency: any) => dispatch(setCurrency(currency));

	const handleWipeData = () => {
		resetAllSlices();
		router.replace('/');
		setIsDialogVisible(false);
	};

	const handleConfirmWipeData = () => {
		setIsDialogVisible(true);
	};

	const handleSubmit = () => {
		dispatch(setCigarettesPerDay(form.cigarettesPerDay));
		dispatch(setPricePerCigarette(parseFloat(form.pricePerCigarette)));
		setForm((prev) => ({
			...prev,
			cigarettesPerDay: form.cigarettesPerDay,
			pricePerCigarette: parseFloat(form.pricePerCigarette).toString(),
		}));
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
								value={form.cigarettesPerDay.toString()}
								onChangeText={handleChangeCigarettesPerDay}
								keyboardType="numeric"
								mode="outlined"
								error={form.cigarettesPerDay === 0}
							/>

							<TextInput
								label={t('common.pricePerCigarette')}
								value={form.pricePerCigarette.toString()}
								onChangeText={handleChangePricePerCigarette}
								keyboardType="decimal-pad"
								mode="outlined"
								error={parseFloat(form.pricePerCigarette) === 0}
								right={<TextInput.Affix text={currency.toUpperCase()} />}
							/>
							<Button disabled={disableButton} icon="content-save" mode="contained" onPress={handleSubmit}>
								{t('common.save')}
							</Button>
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
