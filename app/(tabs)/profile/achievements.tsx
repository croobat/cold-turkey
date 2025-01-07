import { style } from '@/constants/Styles';
import { selectAchievements } from '@/store/achievementsSlice';
import { SafeAreaView, View } from 'react-native';
import { Avatar, List, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function Achievements() {
	const achievements = useSelector(selectAchievements);
	const theme = useTheme();

	return (
		<SafeAreaView style={[style.container]}>
			<View style={[style.padding]}>
				{achievements.map((achievement, index) => (
					<List.Item
						key={index}
						title={achievement.title}
						description={achievement.content}
						left={() => (
							<Avatar.Icon
								icon={achievement.icon}
								size={42}
								style={{
									backgroundColor: !achievement.date ? theme.colors.surfaceDisabled : theme.colors.primary,
								}}
							/>
						)}
					/>
				))}
			</View>
		</SafeAreaView>
	);
}
