import { style } from '@/constants/Styles';
import { SafeAreaView, View } from 'react-native';
import { Avatar, List, useTheme } from 'react-native-paper';
import achievements from '@/data/achievements.json';

export default function Achievements() {
	// const achievements = useSelector(selectAchievements);
	const theme = useTheme();

	return (
		<SafeAreaView style={[style.container]}>
			<View style={[style.padding]}>
				{Object.keys(achievements).map((achievement, index) => (
					<List.Item
						key={index}
						title={achievements[achievement].title}
						description={achievements[achievement].content}
						left={() => (
							<Avatar.Icon
								icon={achievements[achievement].icon}
								size={42}
								style={{
									backgroundColor: !achievements[achievement].date
										? theme.colors.surfaceDisabled
										: theme.colors.primary,
								}}
							/>
						)}
					/>
				))}
			</View>
		</SafeAreaView>
	);
}
