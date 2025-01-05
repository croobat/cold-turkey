import React from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function NotFoundScreen() {
	const { t } = useTranslation();

	return (
		<>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<View style={styles.container}>
				<Text>{t('error.screenNotFound')}</Text>
				<Link href="/">
					<Text style={{ color: 'blue', textDecorationLine: 'underline' }}>{t('common.backToHome')}</Text>
				</Link>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
		gap: 8,
	},
});
