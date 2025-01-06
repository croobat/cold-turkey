import { ReactNode } from 'react';
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { style } from '@/constants/Styles';
import { router } from 'expo-router';

export default function EmptyRelapsesState({
	children,
	isRefreshing,
	onRefresh,
}: {
	children?: ReactNode;
	isRefreshing?: boolean;
	onRefresh?: () => void;
}) {
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<SafeAreaView style={style.container}>
			{/* welcome screen if no settings data found */}
			<ScrollView
				contentContainerStyle={[style.paddingHorizontal, style.centered, style.fullHeight, style.rowGap]}
				refreshControl={
					<RefreshControl refreshing={Boolean(isRefreshing)} onRefresh={onRefresh} tintColor={theme.colors.primary} />
				}
			>
				<Text variant="titleLarge">{t('common.noRelapsesFound')}</Text>
				<Text variant="bodyLarge" style={{ textAlign: 'center' }}>
					{t('common.pleaseAddARelapseToStartTrackingYourProgress')}
				</Text>
				<IconButton icon="plus" mode="contained" onPress={() => router.navigate('/(tabs)/home/relapse-add')} />
			</ScrollView>
			{children}
		</SafeAreaView>
	);
}
