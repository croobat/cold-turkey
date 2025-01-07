import { style } from '@/constants/Styles';
import { selectMotivations } from '@/store/motivationsSlice';
import { useAppSelector } from '@/store';
import { useRouter } from 'expo-router';
import { FlatList, SafeAreaView, View } from 'react-native';
import { AnimatedFAB, Card } from 'react-native-paper';
import NoDataView from '@/components/EmptyState';

export default function MotivationsScreen() {
	const router = useRouter();
	const motivations = useAppSelector(selectMotivations);

	if (motivations.length === 0) {
		return (
			<NoDataView
				title="No data found"
				subtitle="You have not added any motivations yet."
				onPress={() => router.navigate('/(tabs)/profile/motivation-add')}
			/>
		);
	}

	return (
		<SafeAreaView style={[style.container]}>
			<View style={[style.padding, style.fullHeight]}>
				<FlatList
					data={motivations}
					renderItem={({ item, index }) => (
						<Card key={index}>
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
				onPress={() => router.navigate('/profile/motivation-add')}
				style={style.fabStyle}
			/>
		</SafeAreaView>
	);
}
