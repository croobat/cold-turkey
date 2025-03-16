import { SafeAreaView, ScrollView, View } from 'react-native';
import { Avatar, List, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { style } from '@/constants/Styles';

import { selectCompletedAchievements } from '@/store/achievementsSlice';
import { useAppSelector } from '@/store';

import ACHIEVEMENTS_DATA from '@/data/achievements.json';

export default function Achievements() {
	const achievements = ACHIEVEMENTS_DATA;
	const theme = useTheme();
	const { i18n } = useTranslation();
	const completedAchievements = useAppSelector(selectCompletedAchievements);
	const currentLanguage = i18n.language as 'en' | 'es';

	return (
		<SafeAreaView style={[style.container]}>
			<ScrollView contentContainerStyle={[style.paddingHorizontal, style.rowGap]}>
				<View style={[style.padding]}>
					{achievements &&
						achievements.length > 0 &&
						achievements.map((achievement, index) => {
							const isCompleted = completedAchievements.find(
								(completedAchievement) => completedAchievement.id === achievement.id,
							);

							return (
								<List.Item
									key={index}
									title={achievement[currentLanguage].title}
									description={achievement[currentLanguage].content}
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
							);
						})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
