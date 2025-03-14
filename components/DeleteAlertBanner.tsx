import { style } from "@/constants/Styles";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated } from "react-native";
import { Banner, Text } from "react-native-paper";

export default function DeleteAlertBanner({ 
	title, 
	onDelete, 
	selectedItem, 
	setSelectedItem 
}: { 
	title: string, 
	onDelete: () => void, 
	selectedItem: any | null, 
	setSelectedItem: (item: any | null) => void 
}) {

	const fadeAnim = useRef(new Animated.Value(0)).current;

	const { t } = useTranslation();


	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: selectedItem ? 1 : 0,
			duration: 200,
			useNativeDriver: true,
		}).start();
	}, [selectedItem]);

	const goalResetConfirmActions = [
		{ label: t('form.cancel'), onPress: () => setSelectedItem(null) },
		{
			label: t('form.confirm'),
			onPress: () => {
				if (!selectedItem) return;

				onDelete();
				setSelectedItem(null);
			},
		},
	];

	return (
		<Animated.View style={{ opacity: fadeAnim }}>
			<Banner
				visible={Boolean(selectedItem)}
				icon="alert"
				actions={goalResetConfirmActions}
				style={[style.marginBottom, { elevation: 4 }]}
			>
				<Text>{title}</Text>
			</Banner>
		</Animated.View>
	);
}
