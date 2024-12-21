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
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function HomeScreen() {
	const count = useAppSelector(selectCount);
	const dispatch = useAppDispatch();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text>{count}</Text>
			<Button onPress={(): IncrementAction => dispatch(increment())}>Increment</Button>
			<Button onPress={(): DecrementAction => dispatch(decrement())}>Decrement</Button>
			<Button onPress={(): IncrementByAmountAction => dispatch(incrementByAmount(5))}>Increment by 5</Button>
			<Button onPress={(): ResetAction => dispatch(reset())}>Reset</Button>
		</View>
	);
}
