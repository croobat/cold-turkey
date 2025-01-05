import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import merge from 'deepmerge';
import { Provider } from 'react-redux';

import { store } from '@/store';

import { useTheme } from '@/utils/useTheme';

import { Colors } from '@/constants/Colors';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme,
});

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export default function RootLayoutWrapper() {
	return (
		<Provider store={store}>
			<RootLayout />
		</Provider>
	);
}

export function RootLayout() {
	const colorScheme = useTheme();

	const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

	return (
		<PaperProvider theme={theme}>
			{/* @ts-ignore */}
			<ThemeProvider value={theme}>
				<StatusBar
					backgroundColor={theme.colors.background}
					barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
				/>

				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" options={{ headerShown: false }} />
				</Stack>
			</ThemeProvider>
		</PaperProvider>
	);
}
