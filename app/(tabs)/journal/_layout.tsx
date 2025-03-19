import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper';

export default function JournalLayout() {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Stack screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: theme.colors.background } }}>
			<Stack.Screen name="index" options={{ title: t('journal.title') }} />
			<Stack.Screen
				name="journal-entry-add"
				options={{ title: `${t('form.add')} ${t('common.journalEntry')}`, presentation: 'modal' }}
			/>
		</Stack>
	);
}
