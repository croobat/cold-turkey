import { SafeAreaView, ScrollView, View } from 'react-native';
import { Avatar, List, useTheme } from 'react-native-paper';

import { style } from '@/constants/Styles';
import achievementsData from '@/data/achievements.json';
import { selectCompletedAchievements } from '@/store/achievementsSlice';
import { useAppSelector } from '@/store';

export default function Achievements() {
	const achievements = achievementsData;
	const theme = useTheme();
	const completedAchievements = useAppSelector(selectCompletedAchievements);
	
	return (
		<SafeAreaView style={[style.container]}>
			<ScrollView contentContainerStyle={[style.paddingHorizontal, style.rowGap]}>
				<View style={[style.padding]}>
					{achievements &&
						achievements.length > 0 &&
						achievements.map((achievement, index) => {
							const isCompleted = completedAchievements.find((completedAchievement) => completedAchievement.id === achievement.id);
							return <List.Item
								key={index}
								title={achievement.title}
								description={achievement.content}
								left={() => (
									<Avatar.Icon
										icon={achievement.icon}
										size={42}
										style={{
											backgroundColor: isCompleted ? theme.colors.primary : theme.colors.surfaceDisabled,
										}}
									/>
								)}
							/>
						})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
