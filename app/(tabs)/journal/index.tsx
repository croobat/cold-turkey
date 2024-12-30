import { style } from '@/constants/Styles';
import { selectRelapses } from '@/store/logsSlice';
import { format } from 'date-fns';
import { FlatList, SafeAreaView, View } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

// relapse: {content, datetime, title}
export default function JournalScreen() {
	const theme = useTheme();

	const relapses = useSelector(selectRelapses);

	return (
		<SafeAreaView style={[style.container]}>
			<FlatList
				data={relapses}
				keyExtractor={(item) => item.datetime}
				renderItem={({ item }) => {
					const datetimeFormatted = format(new Date(item.datetime), 'Pp');

					return (
						<List.Item
							title={item.title}
							description={() => (
								<View style={[style.smMarginTop, style.xsRowGap]}>
									<Text style={{ color: theme.colors.onSurfaceVariant }}>{item.content}</Text>
									<Text style={{ color: theme.colors.onSurfaceVariant }}>{datetimeFormatted}</Text>
								</View>
							)}
							descriptionNumberOfLines={2}
							titleStyle={{ fontWeight: 'bold' }}
							descriptionStyle={{ color: 'gray' }}
							right={() => <List.Icon icon="chevron-right" />}
						/>
					);
				}}
			/>
		</SafeAreaView>
	);
}
