import { resetAllSlices } from '@/store';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export default function ProfileScreen() {
	const handleWipeData = () => {
		resetAllSlices();
	};
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Button icon="delete" onPress={handleWipeData} mode="contained">
				WIPE ALL DATA
			</Button>
		</View>
	);
}
