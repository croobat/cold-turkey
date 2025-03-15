import { format, compareDesc, parseISO } from 'date-fns';
import { FlatList, SafeAreaView, View } from 'react-native';
import { List, Text, useTheme, AnimatedFAB } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

import { useAppSelector } from '@/store';
import { selectJournalEntries } from '@/store/journalSlice';
import { selectRelapses } from '@/store/logsSlice';

import { style } from '@/constants/Styles';
import EmptyState from '@/components/EmptyState';

type CombinedEntry = {
	type: 'journal' | 'relapse';
	datetime: string;
	title: string;
	content: string;
};

export default function JournalScreen() {
	const theme = useTheme();
	const { t } = useTranslation();

	const journalEntries = useAppSelector(selectJournalEntries);
	const relapses = useAppSelector(selectRelapses);

	// Combine and sort both types of entries using date-fns
	const combinedEntries: CombinedEntry[] = [
		...journalEntries.map((entry) => ({ ...entry, type: 'journal' as const })),
		...relapses.map((entry) => ({ ...entry, type: 'relapse' as const })),
	].sort((a, b) => compareDesc(parseISO(a.datetime), parseISO(b.datetime)));

	if (combinedEntries.length === 0) {
		return (
			<EmptyState
				title={t('journal.noEntriesFound')}
				subtitle={t('journal.pleaseAddAnEntryToStartTrackingYourProgress')}
				onPress={() => router.push('/journal/journal-entry-add')}
			/>
		);
	}

	const getEntryIcon = (type: 'journal' | 'relapse') => (type === 'journal' ? 'book' : 'smoking');
	const getEntryColor = (type: 'journal' | 'relapse') =>
		type === 'journal' ? theme.colors.primary : theme.colors.error;

	return (
		<SafeAreaView style={[style.container]}>
			<FlatList
				data={combinedEntries}
				keyExtractor={(item) => `${item.type}-${item.datetime}`}
				renderItem={({ item }) => {
					const datetimeFormatted = format(parseISO(item.datetime), 'Pp');

					return (
						<List.Item
							title={item.title}
							description={() => (
								<View style={[style.smMarginTop, style.smRowGap]}>
									<Text style={{ color: theme.colors.onSurfaceVariant }}>{item.content}</Text>

									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<List.Icon icon={getEntryIcon(item.type)} color={getEntryColor(item.type)} />
										<Text style={{ color: theme.colors.onSurfaceVariant, marginLeft: 8 }}>{datetimeFormatted}</Text>
									</View>
								</View>
							)}
							descriptionNumberOfLines={2}
							titleStyle={{ fontWeight: 'bold' }}
							descriptionStyle={{ color: 'gray' }}
						/>
					);
				}}
			/>

			<AnimatedFAB
				icon="plus"
				label={t('journal.add')}
				extended={false}
				onPress={() => router.push('/journal/journal-entry-add')}
				style={style.fabStyle}
			/>
		</SafeAreaView>
	);
}
