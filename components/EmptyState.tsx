import { View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { style } from '@/constants/Styles';
import { IconButton, Text } from 'react-native-paper';

export default function EmptyState({
	title,
	subtitle,
	onPress,
}: {
	title: string;
	subtitle: string;
	onPress: () => void;
}) {
	return (
		<SafeAreaView style={style.container}>
			<View style={[style.paddingHorizontal, style.centered, style.fullHeight, style.rowGap]}>
				<Text variant="titleLarge">{title}</Text>
				<Text variant="bodyLarge" style={{ textAlign: 'center' }}>
					{subtitle}
				</Text>
				<IconButton icon="plus" mode="contained" onPress={onPress} />
			</View>
		</SafeAreaView>
	);
}
