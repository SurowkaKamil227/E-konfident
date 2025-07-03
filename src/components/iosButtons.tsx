import { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../app/_layout';

const IOSButtons = ({ confirmIOS, togglePicker }: any) => {
	const { colorScheme } = useContext(ThemeContext);
	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-around',
				width: 324,
			}}
		>
			<TouchableOpacity
				onPress={togglePicker}
				style={[styles.btn, { backgroundColor: '#BF1616' }]}
			>
				<Text
					style={[
						styles.mdText,
						{ color: colorScheme === 'light' ? '#F0EEF0' : '#171017' },
					]}
				>
					Anuluj
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={confirmIOS}
				style={[styles.btn, { backgroundColor: '#168DBF' }]}
			>
				<Text
					style={[
						styles.mdText,
						{ color: colorScheme === 'light' ? '#F0EEF0' : '#171017' },
					]}
				>
					Potwierdź
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	mdText: {
		fontFamily: 'Roboto',
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: 20,
		color: '#594E59',
		alignSelf: 'center',
	},
	btn: {
		width: 100,
		height: 30,
		borderRadius: 7.5,
		justifyContent: 'center',
	},
});

export default IOSButtons;
