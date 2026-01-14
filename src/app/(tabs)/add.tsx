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
	const API_URL = "http://localhost:3001/reports";

	const onChangeTime = ({ type }: any, selectedTime: any) => {
  if (type === 'set' && selectedTime) {
    const currentTime = selectedTime;
    setTime(currentTime);

    // na Androidzie zamykamy picker i zapisujemy string
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
      setTimeString(formatTime(currentTime));
    }
  } else {
    // anulowanie
    setShowTimePicker(false);
  }
};


const sendReport = async () => {
    try {

		if (password.length < 8) {
  alert("Hasło musi mieć min. 8 znaków.");
  return;
}

if (!date || date.trim() === "") {
  alert("Wybierz datę zdarzenia.");
  return;
}

if (!timeString || timeString.trim() === "") {
  alert("Wybierz godzinę zdarzenia.");
  return;
}

      const payload = {
  createdAt: new Date().toISOString(),
  status: "przyjęte",
  eventDate: date,
  eventTime: timeString,
};



      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API error");
      const saved = await res.json();

      alert(`Zapisano zgłoszenie. ID: ${saved.id}`);
    } catch (e) {
      alert("Błąd zapisu. Sprawdź czy działa npm run api.");
    }
  };


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
  if (Platform.OS === 'web') {
    const input = window.prompt('Podaj godzinę (HH:MM)', timeString || '12:00');
    if (!input) return;

    const ok = /^([01]\d|2[0-3]):([0-5]\d)$/.test(input);
    if (!ok) {
      alert('Zły format. Wpisz np. 21:49');
      return;
    }
    setTimeString(input);
    return;
  }

  setShowTimePicker(!showTimePicker);
};


	const confirmIOSTime = () => {
		setTime(time);
		setTimeString(formatTime(time));
		toggleTimePicker();
	};

	const formatTime = (rawTime: Date | string): string => {
  const d = rawTime instanceof Date ? rawTime : new Date(rawTime);

  const hours = d.getHours();
  const minutes = d.getMinutes();

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

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
								onPress={sendReport}
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
