import React, { useEffect, useState } from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView, View, ScrollView, Image } from 'react-native';
import { AnimatedFAB, TextInput, useTheme, Text, Button } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import { useAppDispatch, useAppSelector } from '@/store';
import { addMotivation, selectMotivationById, updateMotivation } from '@/store/motivationsSlice';
import { useTranslation } from 'react-i18next';

import { style } from '@/constants/Styles';
import { Motivation } from '@/index';

interface Form {
	title: string;
	content: string;
	image: string;
}

const INITIAL_FORM: Form = {
	title: '',
	content: '',
	image: '',
};

export default function MotivationAddScreen() {
	const dispatch = useAppDispatch();

	const theme = useTheme();
	const { t } = useTranslation();
	const [image, setImage] = useState<string | null>(null);
	const [form, setForm] = useState<Form>(INITIAL_FORM);
	const [status, requestPermission] = ImagePicker.useCameraPermissions();
	const [error, setError] = useState<string | null>(null);

	const { id } = useLocalSearchParams<{ id: string }>();
	const motivation = useAppSelector((state) => selectMotivationById(state, parseInt(id)));

	useEffect(() => {
		if (motivation) {
			setForm({ ...motivation });
			setImage(motivation.image);
		}
	}, [motivation]);

	const handleSubmit = () => {
		if (!form.title.trim()) {
			setError('Title is required.');
			return;
		}

		const motivation: Motivation = {
			title: form.title,
			content: form.content,
			image: form.image,
		};

		if (id) {
			dispatch(updateMotivation({ ...motivation, id: parseInt(id) }));
		} else {
			dispatch(addMotivation(motivation));
		}
		router.back();
	};

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images', 'videos'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setImage(result.assets[0].uri);
			setForm({ ...form, image: result.assets[0].uri });
		}
	};

	const takePhoto = async () => {
		await requestPermission();
		if (!status?.granted) {
			return;
		}
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ['images', 'videos'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setImage(result.assets[0].uri);
			setForm({ ...form, image: result.assets[0].uri });
		}
	};

	return (
		<SafeAreaView style={[style.container]}>
			<KeyboardAvoidingView
				style={style.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={100}
			>
				<ScrollView>
					<View style={[style.lgMargin, style.lgRowGap]}>
						<View style={style.smRowGap}>
							<TextInput
								label={t('form.title')}
								value={form.title}
								mode="outlined"
								onChangeText={(text) => {
									setForm({ ...form, title: text });
									if (error) setError(null);
								}}
								error={!!error}
							/>
							{error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
						</View>

						<TextInput
							label={t('form.content')}
							value={form.content}
							mode="outlined"
							onChangeText={(text) => setForm({ ...form, content: text })}
						/>
						<View style={[style.container, style.centered]}>
							<Button icon="image" onPress={pickImage}>
								{t('form.pickAnImageFromTheCameraRoll')}
							</Button>
							<Text>{t('common.or')}</Text>
							<Button icon="camera" onPress={takePhoto}>
								{t('form.takeAPicture')}
							</Button>
							{image && <Image source={{ uri: image }} style={[style.fullWidth, { aspectRatio: 1 }]} />}
						</View>
					</View>
				</ScrollView>

				<AnimatedFAB
					icon="check"
					label="Save"
					extended={false}
					onPress={handleSubmit}
					disabled={!!error}
					style={style.fabStyle}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
