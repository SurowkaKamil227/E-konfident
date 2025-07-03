import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Platform } from 'react-native';
import { Input, Button, IOSButtons } from '../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';

const Register = ({ name, setName, password, setPassword }: any) => {
	const [date, setDate] = useState(new Date());
	const [dateString, setDateString] = useState('');
	const [showDatePicker, setShowDatePicker] = useState(false);

	const toggleDatePicker = () => {
		setShowDatePicker(!showDatePicker);
	};

	const onChangeDate = ({ type }: any, selectedDate: any) => {
		if (type === 'set') {
			const currentDate = selectedDate;
			setDate(currentDate);

			if (Platform.OS === 'android') {
				toggleDatePicker();
				setDate(currentDate);
				setDateString(formatDate(currentDate.toDateString()));
			}
		} else {
			toggleDatePicker();
		}
	};

	const confirmIOSDate = () => {
		setDate(date);
		setDateString(formatDate(date.toDateString()));
		toggleDatePicker();
	};

	const formatDate = (rawDate: string): string => {
		let formattedDate = new Date(rawDate);
		let year = formattedDate.getFullYear();
		let month = formattedDate.getMonth() + 1;
		let day = formattedDate.getDate();

		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;

		return `${day}-${month}-${year}`;
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
			<Input
				max_words={500}
				label="Imię / Imiona"
				inputText={name}
				setInputText={setName}
				secureTextEntry={false}
			/>
			<Input
				max_words={500}
				label="Nazwisko"
				inputText={name}
				setInputText={setName}
				secureTextEntry={false}
			/>
			<Input
				max_words={500}
				label="Pesel"
				inputText={password}
				setInputText={setPassword}
				secureTextEntry={true}
			/>
			<View>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Data urodzenia</Text>
					<Feather name="info" size={20} color="#168DBF" />
				</View>
				<Button
					onPress={toggleDatePicker}
					width={151}
					height={44}
					text={dateString !== '' ? dateString : 'dd-mm-rrrr'}
					backgroundColor="#BF1616"
					borderColor="#BF1616"
					btnTextColor="#F0EEF0"
				/>
			</View>
			<Input
				max_words={500}
				label="Miasto zamieszkania"
				inputText={name}
				setInputText={setName}
				secureTextEntry={false}
			/>
			<Input
				max_words={500}
				label="Ulica zamieszkania"
				inputText={name}
				setInputText={setName}
				secureTextEntry={false}
			/>
			<Input
				max_words={500}
				label="Kod pocztowy zamieszkania"
				inputText={name}
				setInputText={setName}
				secureTextEntry={false}
			/>
			<Input
				max_words={500}
				label="Numer telefonu"
				inputText={name}
				setInputText={setName}
				secureTextEntry={false}
			/>
			<Input
				max_words={500}
				label="Adres email"
				inputText={name}
				setInputText={setName}
				secureTextEntry={false}
			/>
			<Input
				max_words={500}
				label="Hasło"
				inputText={password}
				setInputText={setPassword}
				secureTextEntry={true}
			/>
			<Input
				max_words={500}
				label="Powtórz hasło"
				inputText={password}
				setInputText={setPassword}
				secureTextEntry={true}
			/>
			<Text style={styles.text}>Masz już konto?</Text>
			<Button
				width={320}
				height={34}
				text="Zaloguj się"
				backgroundColor="transparent"
				activeBackgroundColor="transparent"
				active={true}
				borderColor="#BF1616"
				btnTextColor="#BF1616"
			/>
			{showDatePicker && (
				<DateTimePicker
					mode="date"
					display="spinner"
					value={date}
					onChange={onChangeDate}
					style={styles.picker}
					textColor="black"
				/>
			)}

			{showDatePicker && Platform.OS === 'ios' && (
				<IOSButtons
					confirmIOS={confirmIOSDate}
					togglePicker={toggleDatePicker}
				/>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 13,
		marginBottom: 100,
	},
	text: {
		fontFamily: 'Roboto',
		fontSize: 14,
		fontWeight: '700',
		fontStyle: 'normal',
		lineHeight: 20,
		color: '#0877A6',
		alignSelf: 'flex-start',
		marginTop: 37,
	},
	label: {
		color: '#594E59',
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
	picker: {
		backgroundColor: '#D0E2EA',
		height: 150,
		marginTop: -180,
		width: 324,
	},
});

export default Register;
