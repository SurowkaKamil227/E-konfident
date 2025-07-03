import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from '../app/_layout';

const Input = ({
	max_words,
	label,
	inputText,
	setInputText,
	secureTextEntry,
}: any) => {
	const MAX_WORDS = max_words;
	const [words, setWords] = useState(MAX_WORDS);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [focused, setFocused] = useState(false);
	const { colorScheme } = useContext(ThemeContext);

	useEffect(() => {
		const remaining = Math.max(0, MAX_WORDS - inputText.length);
		setWords(remaining);
		if (words === 0) {
			setInputText(inputText.slice(0, MAX_WORDS));
		}
	}, [inputText]);

	return (
		<View style={styles.container}>
			<View style={styles.labelContainer}>
				<Text
					style={[
						styles.label,
						{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
					]}
				>
					{label}
				</Text>
				<Feather
					name="info"
					size={20}
					color={colorScheme === 'light' ? '#168DBF' : '#33B1E7'}
				/>
			</View>

			<View>
				<TextInput
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					secureTextEntry={passwordVisible ? false : secureTextEntry}
					value={inputText}
					onChangeText={(text) => setInputText(text)}
					placeholder="Wpisz..."
					placeholderTextColor={colorScheme === 'light' ? '#B8B2B8' : '#453845'}
					style={[
						styles.input,
						{
							borderColor:
								focused && colorScheme === 'light'
									? '#BF1616'
									: colorScheme === 'light'
									? '#B8B2B8'
									: focused && colorScheme === 'dark'
									? '#E74333'
									: '#453845',
							backgroundColor: colorScheme === 'light' ? '#F0EEF0' : '#171017',
							color: colorScheme === 'light' ? '#594E59' : '#978E97',
						},
					]}
				/>
				{secureTextEntry && (
					<Pressable
						style={styles.button}
						onPress={() => setPasswordVisible(!passwordVisible)}
					>
						<Feather
							name={passwordVisible ? 'eye' : 'eye-off'}
							size={20}
							color={colorScheme === 'light' ? '#BF1616' : '#E74333'}
							style={styles.eyeIcon}
						/>
					</Pressable>
				)}
			</View>

			<Text style={styles.wordsIndicator}>
				Pozostało <Text style={words > 0 ? {} : styles.notEnough}>{words}</Text>{' '}
				znaków
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		marginBottom: 13,
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
		marginBottom: 5,
	},
	input: {
		borderRadius: 7.5,
		borderWidth: 2,
		borderStyle: 'solid',
		height: 44,
		width: 324,
		padding: 10,
	},
	eyeIcon: {
		position: 'absolute',
		right: 10,
		top: 10,
		bottom: 10,
	},
	button: {
		position: 'absolute',
		right: 0,
		top: 0,
		bottom: 0,
		width: 44,
		height: 44,
	},
	wordsIndicator: {
		alignSelf: 'flex-end',
		color: '#A67E08',
		textAlign: 'right',
		fontSize: 10,
		fontFamily: 'Roboto',
		lineHeight: 20,
	},
	notEnough: {
		color: 'red',
	},
});

export default Input;
