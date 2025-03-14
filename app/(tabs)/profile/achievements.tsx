import { style } from '@/constants/Styles';
import { SafeAreaView, View } from 'react-native';
import { Avatar, List, useTheme } from 'react-native-paper';
import { Achievement, selectAchievements } from '@/store/achievementsSlice';
import { useAppSelector } from '@/store';

export default function Achievements() {
	const achievements: Achievement[] = useAppSelector(selectAchievements);
	const theme = useTheme();

	return (
		<SafeAreaView style={[style.container]}>
			<View style={[style.padding]}>
				{achievements &&
					achievements.length > 0 &&
					achievements.map((achievement, index) => (
						<List.Item
							key={index}
							title={achievement.title}
							description={achievement.content}
							left={() => (
								<Avatar.Icon
									icon={achievement.icon}
									size={42}
									style={{
										backgroundColor: achievement.completedAt ? theme.colors.primary : theme.colors.surfaceDisabled,
									}}
								/>
							)}
						/>
					))}
			</View>
		</SafeAreaView>
	);
}
