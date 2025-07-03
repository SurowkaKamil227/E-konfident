import { useState, useContext } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ThemeContext } from '../app/_layout';
import { Feather } from '@expo/vector-icons';
import DropdownOption from './dropdownOption';

const SingleDropdown = ({ mainText, values }: any) => {
	const [open, setOpen] = useState(false);
	const { colorScheme } = useContext(ThemeContext);

	return (
		<View>
			<Pressable
				onPress={() => setOpen(!open)}
				style={[
					styles.container,
					open && {
						borderBottomColor: 'rgba(220, 30, 13, 0.2)',
						borderBottomWidth: 1,
					},
				]}
			>
				<View style={{ maxWidth: 280 }}>
					<Text
						style={[
							styles.mainText,
							{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
						]}
					>
						{mainText}
					</Text>
				</View>

				<Feather
					name={open ? 'chevrons-up' : 'chevrons-down'}
					size={15}
					color={colorScheme === 'light' ? '#BF1616' : '#E74333'}
				/>
			</Pressable>
			{open && (
				<View style={[styles.wrapper]}>
					{values.map((value, index) => (
						<DropdownOption key={index} mainText={value} />
					))}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		width: 320,
		borderRadius: 7.5,
		gap: 10,
	},
	container: {
		width: 320,
		paddingHorizontal: 10,
		borderRadius: 7.5,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	mainText: {
		fontFamily: 'Roboto',
		fontStyle: 'normal',
		fontWeight: '700',
		fontSize: 14,
		lineHeight: 20,
	},
});

export default SingleDropdown;
