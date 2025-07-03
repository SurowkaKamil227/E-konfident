import { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ThemeContext } from '../app/_layout';
import * as DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const FilePicker = () => {
	const { colorScheme } = useContext(ThemeContext);
	const [files, setFiles] = useState<any>([]);
	const [fileNames, setFileNames] = useState<any>([]);

	const textColor =
		fileNames.length === 0 && colorScheme === 'light'
			? '#B8B2B8'
			: colorScheme === 'light'
			? '#594E59'
			: fileNames.length === 0 && colorScheme === 'dark'
			? '#453845'
			: '#978E97';
	const selectFile = async () => {
		try {
			const file = await DocumentPicker.getDocumentAsync({
				type: '*/*',
				multiple: true,
				copyToCacheDirectory: true,
			});
			setFiles([...files, file]);
		} catch (error) {
			console.log("Couldn't select file: ", error);
		}
	};

	useEffect(() => {
		for (let i = 0; i < files.length; i++) {
			setFileNames([...fileNames, files[i].assets[0].name]);
		}
	}, [files]);

	return (
		<ScrollView>
			<Pressable
				onPress={selectFile}
				style={[
					styles.input,
					{
						borderColor: colorScheme === 'light' ? '#B8B2B8' : '#453845',
						backgroundColor: colorScheme === 'light' ? '#F0EEF0' : '#171017',
					},
				]}
			>
				<Text
					style={[
						styles.text,
						{
							color: textColor,
						},
					]}
				>
					{fileNames.length === 0
						? 'Dodaj załącznik'
						: 'Załączników: ' + fileNames.length}
				</Text>
				<Feather
					name={'paperclip'}
					size={20}
					color={colorScheme === 'light' ? '#BF1616' : '#E74333'}
					style={styles.icon}
				/>
			</Pressable>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		marginBottom: 13,
	},
	input: {
		borderRadius: 7.5,
		borderWidth: 2,
		borderStyle: 'solid',
		height: 44,
		width: 322,
		padding: 10,
	},
	icon: {
		position: 'absolute',
		right: 10,
		top: 10,
		bottom: 10,
	},
	text: {
		fontFamily: 'Roboto',
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 20,
	},
});

export default FilePicker;
