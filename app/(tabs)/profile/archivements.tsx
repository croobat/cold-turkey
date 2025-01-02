import { style } from '@/constants/Styles';
import { selectArchivements } from '@/store/archivementsSlice';
import { SafeAreaView, View } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function Archivements() {
	const archivements = useSelector(selectArchivements);

	return (
		<SafeAreaView style={[style.container]}>
			<View style={[style.card]}>
				{archivements.map((achievement, index) => (
					<List.Item
						key={index}
						title={achievement.title}
						description={achievement.content}
						left={() => <Avatar.Icon icon={achievement.icon} size={42} />}
					/>
				))}
			</View>
		</SafeAreaView>
	);
}
