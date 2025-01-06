import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function GoalScreen() {
	const { t } = useTranslation();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text>{t('goal.title')}</Text>
		</View>
	);
}
