import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { style } from '@/constants/Styles';
import { router } from 'expo-router';

export default function EmptyRelapsesState() {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<View style={[style.container, style.centered, style.paddingHorizontal]}>
			<View style={[style.centered, style.smRowGap]}>
				<IconButton icon="clipboard-text" size={48} />
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					{t('common.noRelapsesFound')}
				</Text>
				<Text variant="bodyMedium" style={{ textAlign: 'center', color: theme.colors.onSurfaceVariant }}>
					{t('common.pleaseAddARelapseToStartTrackingYourProgress')}
				</Text>
				<IconButton icon="plus" mode="contained" onPress={() => router.navigate('/(tabs)/home/relapse-add')} />
			</View>
		</View>
	);
}
