import { ThemeContext } from '../_layout';
import { useState, useContext } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	ScrollView,
	ImageBackground,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
	Button,
	Input,
	Location,
	AddPlace,
	AddWitness,
	AddCulprit,
	IOSButtons,
	Dropdown,
	FilePicker,
	AddDescription,
	PickDate,
} from '../../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function TabOneScreen() {
	const [password, setPassword] = useState('');
	const [date, setDate] = useState('');
	const [dateString, setDateString] = useState('');
	const [time, setTime] = useState(new Date());
	const [timeString, setTimeString] = useState('');
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);

	const { colorScheme } = useContext(ThemeContext);

	const toggleDatePicker = () => {
		setShowDatePicker(!showDatePicker);
	};

	const toggleTimePicker = () => {
		setShowTimePicker(!showTimePicker);
	};

	const onChangeTime = ({ type }: any, selectedTime: any) => {
		if (type === 'set' && selectedTime) {
			const currentTime = selectedTime;
			setTime(currentTime);

			if (Platform.OS === 'android') {
				toggleTimePicker();
				setTime(currentTime);
				setTimeString(formatTime(currentTime));
			}
		} else {
			toggleTimePicker();
		}
	};

	const confirmIOSTime = () => {
		setTime(time);
		setTimeString(formatTime(time));
		toggleTimePicker();
	};

	const formatTime = (rawTime: string): string => {
		let formattedTime = new Date(rawTime);
		let hours = formattedTime.getHours();
		let minutes = formattedTime.getMinutes();

		const formattedHours = hours < 10 ? `0${hours}` : hours;
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

		return `${formattedHours}:${formattedMinutes}`;
	};

	return (
		<ImageBackground
			style={{ paddingTop: 20, flex: 1 }}
			source={
				colorScheme === 'light'
					? require('../../../assets/images/whylight.png')
					: require('../../../assets/images/whydark.png')
			}
		>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Animated.View
						entering={FadeInDown.duration(500)}
						style={styles.background}
					>
						<View style={styles.container}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<View>
									<View style={styles.labelContainer}>
										<Text
											style={[
												styles.label,
												{
													color:
														colorScheme === 'light' ? '#594E59' : '#978E97',
												},
											]}
										>
											Data zdarzenia
										</Text>
										<Feather
											name="info"
											size={20}
											color={colorScheme === 'light' ? '#168DBF' : '#33B1E7'}
										/>
									</View>
									<Button
										onPress={toggleDatePicker}
										width={151}
										height={44}
										text={date !== '' ? date : 'dd-mm-rrrr'}
										backgroundColor={
											colorScheme === 'light' ? '#BF1616' : '#E74333'
										}
										borderColor={
											colorScheme === 'light' ? '#BF1616' : '#E74333'
										}
										btnTextColor={
											colorScheme === 'light' ? '#F0EEF0' : '#171017'
										}
									/>
								</View>
								<View>
									<View style={styles.labelContainer}>
										<Text
											style={[
												styles.label,
												{
													color:
														colorScheme === 'light' ? '#594E59' : '#978E97',
												},
											]}
										>
											Godzina zdarzenia
										</Text>
										<Feather
											name="info"
											size={20}
											color={colorScheme === 'light' ? '#168DBF' : '#33B1E7'}
										/>
									</View>
									<View style={{ alignSelf: 'flex-end' }}>
										<Button
											onPress={toggleTimePicker}
											width={151}
											height={44}
											text={timeString !== '' ? timeString : 'hh:mm'}
											backgroundColor={
												colorScheme === 'light' ? '#BF1616' : '#E74333'
											}
											borderColor={
												colorScheme === 'light' ? '#BF1616' : '#E74333'
											}
											btnTextColor={
												colorScheme === 'light' ? '#F0EEF0' : '#171017'
											}
										/>
									</View>
								</View>
							</View>

							{showDatePicker && (
								<PickDate
									openDatePicker={showDatePicker}
									setOpenDatePicker={setShowDatePicker}
									selectedDate={date}
									setSelectedDate={setDate}
								/>
							)}

							{showTimePicker && (
								<View
									style={{
										width: 334,
										backgroundColor:
											colorScheme === 'light' ? '#F0EEF0' : '#171017',
										borderRadius: 7.5,
										padding: 10,
									}}
								>
									<DateTimePicker
										mode="time"
										display="spinner"
										value={time}
										onChange={onChangeTime}
										style={styles.picker}
										textColor={colorScheme === 'light' ? 'black' : 'white'}
										is24Hour={true}
									/>
									{Platform.OS === 'ios' && (
										<IOSButtons
											confirmIOS={confirmIOSTime}
											togglePicker={toggleTimePicker}
										/>
									)}
								</View>
							)}

							<Location />
							<Text
								style={[
									styles.mdText,
									{
										color: colorScheme === 'light' ? '#594E59' : '#978E97',
									},
								]}
							>
								lub
							</Text>
							<AddPlace />
							<AddWitness />
							<AddCulprit />
							<Dropdown mainText="Wybierz typ przestępstwa" type="crime" />
							<Dropdown mainText="Wybierz typ wykroczenia" type="offense" />
							<Text
								style={[
									styles.mdText,
									{
										color: colorScheme === 'light' ? '#594E59' : '#978E97',
									},
								]}
							>
								lub
							</Text>
							<AddDescription />
							<FilePicker />
							<Input
								max_words={500}
								label="Hasło"
								inputText={password}
								setInputText={setPassword}
								secureTextEntry={true}
							/>
							<Button
								onPress={() => console.log('wysłano')}
								width={324}
								height={44}
								text="Wyślij sprawę"
								backgroundColor={
									colorScheme === 'light' && password.length >= 8
										? '#BF1616'
										: colorScheme === 'dark' && password.length >= 8
										? '#E74333'
										: 'transparent'
								}
								borderColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
								btnTextColor={
									colorScheme === 'light' && password.length >= 8
										? '#F0EEF0'
										: colorScheme === 'light'
										? '#BF1616'
										: colorScheme === 'dark' && password.length >= 8
										? '#171017'
										: '#E74333'
								}
							/>
						</View>
					</Animated.View>
				</ScrollView>
			</TouchableWithoutFeedback>
		</ImageBackground>
	);
}

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
		marginTop: 20,
		marginBottom: 180,
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
