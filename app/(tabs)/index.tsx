import {
	decrement,
	increment,
	reset,
	incrementByAmount,
	selectCount,
	IncrementAction,
	DecrementAction,
	IncrementByAmountAction,
	ResetAction,
} from '@/store/exampleSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
	const count = useAppSelector(selectCount);
	const dispatch = useAppDispatch();

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<SafeAreaView
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: StatusBar.currentHeight || 0 + 50,
				}}
			>
				<Text>{count}</Text>
				<Button onPress={(): IncrementAction => dispatch(increment())}>Increment</Button>
				<Button onPress={(): DecrementAction => dispatch(decrement())}>Decrement</Button>
				<Button onPress={(): IncrementByAmountAction => dispatch(incrementByAmount(5))}>Increment by 5</Button>
				<Button onPress={(): ResetAction => dispatch(reset())}>Reset</Button>
			</SafeAreaView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
