import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function HealthLayout() {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Stack screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: theme.colors.background } }}>
			<Stack.Screen name="index" options={{ title: t('health.title') }} />
		</Stack>
	);
}
