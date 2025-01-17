import { style } from '@/constants/Styles';
import { selectMotivations } from '@/store/motivationsSlice';
import { useAppSelector } from '@/store';
import { useRouter } from 'expo-router';
import { FlatList, SafeAreaView, View } from 'react-native';
import { AnimatedFAB, Card, IconButton } from 'react-native-paper';
import NoDataView from '@/components/EmptyState';
import { useState } from 'react';
import AlertDialog from '@/components/AlertDialog';
import { useAppDispatch } from '@/store';
import { deleteMotivation } from '@/store/motivationsSlice';
import { useTranslation } from 'react-i18next';

export default function MotivationsScreen() {
	const router = useRouter();
	const motivations = useAppSelector(selectMotivations);
	console.log(motivations);
	const { t } = useTranslation();
	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [selectedMotivationId, setSelectedMotivationId] = useState<number | null>(null);
	const dispatch = useAppDispatch();

	const handleDeleteMotivation = (id: number | null) => {
		if (!id) return;
		dispatch(deleteMotivation(id));
		setSelectedMotivationId(null);
		setIsDialogVisible(false);
	};

	const handleClickDelete = (id: number | null) => {
		if (!id) return;
		setSelectedMotivationId(id);
		setIsDialogVisible(true);
	};

	if (motivations.length === 0) {
		return (
			<NoDataView
				title="No data found"
				subtitle="You have not added any motivations yet."
				onPress={() => router.navigate('/profile/motivation-form')}
			/>
		);
	}

	return (
		<SafeAreaView style={[style.container]}>
			<View style={[style.padding, style.fullHeight]}>
				<FlatList
					data={motivations}
					renderItem={({ item, index }) => (
						<Card key={index} style={style.marginBottom}>
							{item.image && <Card.Cover source={{ uri: item.image }} />}
							<Card.Title
								title={item.title}
								subtitle={item.content}
								right={() => (
									<View style={style.row}>
										<IconButton
											icon="pencil"
											onPress={() =>
												router.navigate({
													pathname: '/profile/motivation-form',
													params: { id: item.id },
												})
											}
										/>
										<IconButton icon="delete" onPress={() => handleClickDelete(item.id ?? null)} />
									</View>
								)}
							/>
						</Card>
					)}
				/>
			</View>

			<AnimatedFAB
				icon="plus"
				label={t('form.add')}
				extended={false}
				onPress={() => router.navigate('/profile/motivation-form')}
				style={style.fabStyle}
			/>
			<AlertDialog
				show={isDialogVisible}
				setShow={setIsDialogVisible}
				title={t('profile.areYouSureYouWantToDeleteThisMotivation')}
				message={t('form.thisActionCannotBeUndone')}
				onConfirm={() => handleDeleteMotivation(selectedMotivationId)}
				confirmText={t('form.delete')}
				cancelText={t('form.cancel')}
			/>
		</SafeAreaView>
	);
}
