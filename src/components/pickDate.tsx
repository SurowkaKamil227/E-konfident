import { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../app/_layout';
import Button from './button';
import { DatePicker } from '../datepicker/elements/DatePicker';

const PickDate = ({
	openDatePicker,
	setOpenDatePicker,
	selectedDate,
	setSelectedDate,
}: any) => {
	const [clickedDate, setClickedDate] = useState('');

	const { colorScheme } = useContext(ThemeContext);

	const handleApplyBtn = () => {
		setSelectedDate(clickedDate);
		setOpenDatePicker(false);
	};
	const handleCancelBtn = () => {
		setOpenDatePicker(false);
	};

	return (
		<Modal animationType="slide" transparent={true} visible={true}>
			<View style={styles.centeredView}>
				<View
					style={[
						styles.modalView,
						{
							backgroundColor: colorScheme === 'light' ? '#F0EEF0' : '#171017',
						},
					]}
				>
					<DatePicker
						onSelectedChange={(date) => setClickedDate(date.split(' ')[0])}
					/>
					<View style={styles.btnContainer}>
						<Button
							onPress={handleApplyBtn}
							width={86}
							text="Dalej"
							backgroundColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
							borderColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
							btnTextColor={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
							height={40}
						/>
						<Button
							onPress={handleCancelBtn}
							width={86}
							text="Usuń"
							backgroundColor="transparent"
							borderColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
							btnTextColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
							height={40}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalView: {
		borderRadius: 22,
		width: 330,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	btnContainer: {
		flexDirection: 'row',
		alignSelf: 'flex-end',
		gap: 20,
		marginRight: 20,
	},
});

export default PickDate;
