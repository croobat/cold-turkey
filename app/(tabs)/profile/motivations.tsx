import React from 'react';
import { style } from '@/constants/Styles';
import { deleteMotivation, selectMotivations } from '@/store/motivationsSlice';
import { useAppSelector } from '@/store';
import { useRouter } from 'expo-router';
import { RefreshControl, ScrollView, View } from 'react-native';
import { AnimatedFAB, Card, IconButton, useTheme } from 'react-native-paper';
import EmptyState from '@/components/EmptyState';
import { useState } from 'react';
import { useAppDispatch } from '@/store';
import { useTranslation } from 'react-i18next';
import { Motivation } from '@/types';
import DeleteAlertBanner from '@/components/DeleteAlertBanner';

export default function MotivationsScreen() {
	const { t } = useTranslation();
	const theme = useTheme();

	const router = useRouter();
	const motivations = useAppSelector(selectMotivations);

	const [selectedMotivation, setSelectedMotivation] = useState<Motivation | null>(null);

	const [refreshing, setRefreshing] = useState(false);

	const dispatch = useAppDispatch();

	const handleRefresh = () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 500);
	};

	const handleDeleteMotivation = () => {
		if (!selectedMotivation || !selectedMotivation.id) return;
		dispatch(deleteMotivation(selectedMotivation.id));
	};

	if (motivations.length === 0) {
		return (
			<EmptyState
				title={t('motivations.noMotivationsAdded')}
				subtitle={t('motivations.addATextOrImageToRemindYouWhyYouQuit')}
				onPress={() => router.navigate('/profile/motivation-add')}
			/>
		);
	}

	return (
		<>
			<DeleteAlertBanner
				title={t('motivations.areYouSureYouWantToDeleteThisMotivation')}
				onDelete={() => handleDeleteMotivation()}
				selectedItem={selectedMotivation}
				setSelectedItem={setSelectedMotivation}
			/>
			<ScrollView
				style={style.container}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={theme.colors.primary} />
				}
			>
				<View style={style.paddingHorizontal}>
					{motivations.map((motivation, index) => (
						<Card key={index} style={style.marginBottom}>
							{motivation.image && <Card.Cover source={{ uri: motivation.image }} style={style.cardCover} />}
							<Card.Title
								title={motivation.title}
								subtitle={motivation.content}
								right={() => (
									<View style={style.row}>
										<IconButton
											icon="pencil"
											onPress={() =>
												router.navigate({
													pathname: '/profile/motivation-add',
													params: { id: motivation.id },
												})
											}
										/>
										<IconButton icon="delete" onPress={() => setSelectedMotivation(motivation)} />
									</View>
								)}
							/>
						</Card>
					))}
				</View>
			</ScrollView>

			<AnimatedFAB
				icon="plus"
				label={t('form.add')}
				extended={false}
				onPress={() => router.navigate('/profile/motivation-add')}
				style={style.fabStyle}
			/>
		</>
	);
}
