import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

import { style } from '@/constants/Styles';

export default function EmptyState({ title, subtitle, onPress }: { title: string; subtitle: string; onPress: () => void }) {
	const theme = useTheme();

	return (
		<View style={[style.container, style.centered, style.paddingHorizontal]}>
			<View style={[style.centered, style.smRowGap]}>
				<IconButton icon="clipboard-text" size={48} />
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					{title}
				</Text>
				<Text variant="bodyMedium" style={{ textAlign: 'center', color: theme.colors.onSurfaceVariant }}>
					{subtitle}
				</Text>
				<IconButton icon="plus" mode="contained" onPress={onPress} />
			</View>
		</View>
	);
}
