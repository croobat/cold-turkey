import { Stack } from 'expo-router';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import merge from 'deepmerge';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/utils/useColorScheme';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme,
});

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export default function RootLayout() {
	const colorScheme = useColorScheme();

	const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

	return (
		<PaperProvider theme={theme}>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
			</Stack>
		</PaperProvider>
	);
}
