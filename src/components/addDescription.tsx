import { ThemeContext } from '../app/_layout';
import { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './button';
import Input from './input';

const AddDescription = () => {
	const [description, setDescription] = useState<any>('');
	const [showDescription, setShowDescription] = useState(false);
	const [descriptions, setDescriptions] = useState<any>([]);
	const { colorScheme } = useContext(ThemeContext);

	const handleDescriptionPress = () => {
		setShowDescription(true);
		setDescriptions([...descriptions, description]);
	};

	const handleDeleteDescription = () => {
		setDescriptions(descriptions.slice(0, -1));
		if (descriptions.length === 1) {
			setShowDescription(false);
		}
	};

	return (
		<View>
			<Button
				onPress={handleDescriptionPress}
				width={324}
				height={44}
				text="Dodaj krótki opis"
				backgroundColor={colorScheme === 'light' ? '#168DBF' : '#33B1E7'}
				borderColor={colorScheme === 'light' ? '#168DBF' : '#33B1E7'}
				btnTextColor={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
			/>
			{showDescription && (
				<View>
					{descriptions.map((description, index) => (
						<Input
							max_words={500}
							label={'Krótki opis zdarzenia #' + (index + 1)}
							inputText={description}
							setInputText={setDescription}
							secureTextEntry={false}
							key={index}
						/>
					))}

					<Button
						onPress={handleDeleteDescription}
						width={324}
						height={44}
						text="Usuń opis"
						backgroundColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
						borderColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
						btnTextColor={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	gradient: {
		paddingTop: 20,
		flex: 1,
	},
	background: {
		height: '100%',
		alignItems: 'center',
	},
	label: {
		fontFamily: 'Roboto',
		fontSize: 16,
		fontStyle: 'normal',
		fontWeight: '500',
		lineHeight: 24,
	},
	labelContainer: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	container: {
		gap: 13,
		marginBottom: 100,
		marginTop: 20,
	},
	mdText: {
		fontFamily: 'Roboto',
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: 20,
		color: '#594E59',
		alignSelf: 'center',
	},
	picker: {
		height: 150,
		width: 324,
		marginBottom: 10,
	},
});

export default AddDescription;
