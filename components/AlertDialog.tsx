import { Portal, Dialog, Button, Text, useTheme } from 'react-native-paper';

export default function AlertDialog({
	show,
	setShow,
	title,
	message,
	confirmText,
	cancelText,
	onConfirm,
}: {
	show: boolean;
	setShow: (value: boolean) => void;
	title: string;
	message: string;
	onConfirm: () => void;
	confirmText: string;
	cancelText: string;
}) {
	const paperTheme = useTheme();

	return (
		<Portal>
			<Dialog visible={show} onDismiss={() => setShow(false)}>
				<Dialog.Icon icon="alert" />
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Content>
					<Text>{message}</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => setShow(false)}>{cancelText}</Button>
					<Button onPress={onConfirm} textColor={paperTheme.colors.error}>
						{confirmText}
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
