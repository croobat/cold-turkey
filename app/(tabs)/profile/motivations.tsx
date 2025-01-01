import { style } from '@/constants/Styles';
import { selectMotivations } from '@/store/motivationsSlice';
import { useAppSelector } from '@/store';
import { useRouter } from 'expo-router';
import { FlatList, SafeAreaView, View } from 'react-native';
import { AnimatedFAB, Card } from 'react-native-paper';
import NoDataView from '@/components/noDataView';

export default function MotivationsScreen() {
	const router = useRouter();
	const motivations = useAppSelector(selectMotivations);

	if (motivations.length === 0) {
		return (
			<NoDataView
				title="No data found"
				subtitle="You have not added any motivations yet."
				onPress={() => router.navigate('/(tabs)/profile/motivation_add')}
			/>
		);
	}

	return (
		<SafeAreaView style={[style.container]}>
			<View style={[style.card]}>
				<FlatList
					data={motivations}
					renderItem={({ item, index }) => (
						<Card key={index} style={[style.card]}>
							<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
							<Card.Title title={item.title} subtitle={item.content} />
						</Card>
					)}
				/>
			</View>

			<AnimatedFAB
				icon="plus"
				label="Add"
				extended={false}
				onPress={() => router.navigate('/profile/motivation_add')}
				style={style.fabStyle}
			/>
		</SafeAreaView>
	);
}
