import { decrement, increment, reset } from '@/store/exampleSlice';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen() {
	const count = useSelector((state) => state.example.count);
	const dispatch = useDispatch();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text>{count}</Text>
			<Button onPress={() => dispatch(increment())}>Increment</Button>
			<Button onPress={() => dispatch(decrement())}>Decrement</Button>
			<Button onPress={() => dispatch(reset())}>Reset</Button>
		</View>
	);
}
