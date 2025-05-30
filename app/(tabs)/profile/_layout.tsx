import { router, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

export default function ProfileLayout() {
	const theme = useTheme();
	const { t } = useTranslation();
	const isIOS = Platform.OS === 'ios';

	return (
		<Stack screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: theme.colors.background } }}>
			<Stack.Screen
				name="index"
				options={{
					title: t('profile.title'),
					headerRight: () =>
						isIOS && (
							<IconButton
								icon="cog"
								onPress={() => router.push('/profile/settings')}
								style={{ margin: 0, padding: 0 }}
							/>
						),
				}}
			/>
			<Stack.Screen name="settings" options={{ title: t('settings.title') }} />
			<Stack.Screen name="motivations" options={{ title: t('profile.motivations') }} />
			<Stack.Screen name="achievements" options={{ title: t('achievements.title') }} />
			<Stack.Screen
				name="motivation-add"
				options={{ title: `${t('form.add')} ${t('common.motivation')}`, presentation: 'modal' }}
			/>
		</Stack>
	);
}
