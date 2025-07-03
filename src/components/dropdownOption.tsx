import { useState, useContext } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ThemeContext } from '../app/_layout';
import { Feather } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const DropdownOption = ({ mainText }: any) => {
	const [isChecked, setIsChecked] = useState(false);
	const { colorScheme } = useContext(ThemeContext);

	const handlePress = () => {
		if (isChecked) {
			setIsChecked(false);
		} else {
			setIsChecked(true);
			console.log(mainText);
		}
	};

	return (
		<View style={styles.container}>
			<View style={{ maxWidth: 260 }}>
				<Text
					style={[
						styles.mainText,
						{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
					]}
				>
					{mainText}
				</Text>
			</View>

			<Pressable onPress={handlePress}>
				<Feather
					name={isChecked ? 'check-square' : 'square'}
					size={15}
					color={colorScheme === 'light' ? '#BF1616' : '#E74333'}
				/>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		width: 320,
		borderRadius: 7.5,
	},
	container: {
		width: 320,
		paddingRight: 10,
		paddingLeft: 20,
		borderRadius: 7.5,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	mainText: {
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 20,
	},
});

export default DropdownOption;
