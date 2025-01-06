import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Card, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '@/store';
import { setCigarettesPerDay, setPricePerCigarette } from '@/store/settingsSlice';
import { style } from '@/constants/Styles';
import { useFocusEffect } from 'expo-router';

export default function WelcomeModal({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const theme = useTheme();

	const [cigarettesPerDayInput, setCigarettesPerDayInput] = useState('');
	const [pricePerCigaretteInput, setPricePerCigaretteInput] = useState('');
	const [error, setError] = useState('');

	const handleSave = () => {
		const pricePerCigarette = pricePerCigaretteInput.trim();
		// Regular expression to match valid numbers (up to two decimal places)
		const pricePerCigaretteValid = /^(\d+(\.\d{1,2})?)$/.test(pricePerCigarette);

		if (!pricePerCigaretteValid || isNaN(parseFloat(pricePerCigarette)) || parseFloat(pricePerCigarette) <= 0) {
			setError(t('error.mustBeAnEntireNumberGreaterThanZero'));
			return;
		}

		setError('');
		dispatch(setCigarettesPerDay(parseInt(cigarettesPerDayInput) || 0));
		dispatch(setPricePerCigarette(parseFloat(pricePerCigarette) || 0));
		onDismiss();
	};

	useFocusEffect(
		useCallback(() => {
			setCigarettesPerDayInput('');
			setPricePerCigaretteInput('');
			setError('');
		}, []),
	);

	return (
		<Portal>
			<Modal visible={visible} dismissable={false} onDismiss={onDismiss} contentContainerStyle={style.lgMargin}>
				<Card style={[style.lgPadding, style.xxxlMarginBottom]}>
					<Text variant="titleLarge" style={[style.lgMarginBottom, { textAlign: 'center' }]}>
						{t('welcome.welcomeToColdTurkey')}
					</Text>
					<Text variant="bodyMedium" style={[style.lgMarginBottom, { textAlign: 'center' }]}>
						{t('welcome.beforeStartingYourJourneyTellUsAboutYourSmokingHabits')}
					</Text>

					<View style={style.lgMarginBottom}>
						<TextInput
							label={t('common.cigarettesPerDay')}
							value={cigarettesPerDayInput}
							onChangeText={setCigarettesPerDayInput}
							keyboardType="numeric"
							mode="outlined"
							style={style.xsMarginBottom}
						/>

						<View style={style.marginBottom}>
							<TextInput
								label={t('common.pricePerCigarette')}
								value={pricePerCigaretteInput}
								onChangeText={setPricePerCigaretteInput}
								keyboardType="numeric"
								mode="outlined"
								error={Boolean(error)}
							/>

							{error ? <Text style={[style.xsMarginBottom, { color: theme.colors.error }]}>{error}</Text> : null}
						</View>
					</View>

					<Button mode="contained" onPress={handleSave} disabled={!cigarettesPerDayInput || !pricePerCigaretteInput}>
						{t('form.save')}
					</Button>
				</Card>
			</Modal>
		</Portal>
	);
}
