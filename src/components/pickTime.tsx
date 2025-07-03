import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ThemeContext } from '../app/_layout';
import { Feather } from '@expo/vector-icons';
import { hours, minutes } from '../constants/constants';
import { FlatList } from 'react-native-gesture-handler';

const TimeFraction = ({ value }: any) => {
	const { colorScheme } = useContext(ThemeContext);

	return (
		<View style={[styles.timeContainer]}>
			<Text
				style={[
					styles.timeText,
					{ color: colorScheme === 'light' ? '#DC1F0D' : '#E74333' },
				]}
			>
				{value}
			</Text>
		</View>
	);
};

const PickTime = ({
	onPress,
	hour,
	setHour,
	minute,
	setMinute,
	time,
	setTime,
}: any) => {
	const { colorScheme } = useContext(ThemeContext);

	const handleHourSelect = (index: number) => {
		setHour(hours[index]);
	};

	const handleMinuteSelect = (index: number) => {
		setMinute(minutes[index]);
	};

	const handlePress = () => {
		setTime(`${hour}:${minute}`);
	};

	const handleScroll = (data: any, type: string) => {
		const index = Math.round(data.nativeEvent.contentOffset.y / 40);

		if (type === 'hour') {
			handleHourSelect(index);
		} else {
			handleMinuteSelect(index);
		}
	};

	useEffect(() => {
		console.log(time);
	}, [time]);

	return (
		<View style={[styles.container]}>
			<View
				style={[
					styles.timeWrapper,
					{ borderColor: colorScheme === 'light' ? '#DC1F0D' : '#E74333' },
					{ backgroundColor: colorScheme === 'light' ? '#F0EEF0' : '#171017' },
				]}
			>
				<FlatList
					data={hours}
					keyExtractor={(item) => item}
					showsVerticalScrollIndicator={false}
					bounces={false}
					snapToAlignment="center"
					decelerationRate="fast"
					snapToInterval={40}
					contentContainerStyle={{ alignItems: 'center' }}
					renderItem={({ item }) => <TimeFraction value={item} />}
					onScroll={(data) => handleScroll(data, 'hour')}
				/>
			</View>
			<Text
				style={[
					styles.colon,
					{ color: colorScheme === 'light' ? '#6D646D' : '#6D646D' },
				]}
			>
				:
			</Text>
			<View
				style={[
					styles.timeWrapper,
					{ borderColor: colorScheme === 'light' ? '#DC1F0D' : '#E74333' },
					{ backgroundColor: colorScheme === 'light' ? '#F0EEF0' : '#171017' },
				]}
			>
				<FlatList
					data={minutes}
					keyExtractor={(item) => item}
					showsVerticalScrollIndicator={false}
					bounces={false}
					snapToAlignment="center"
					decelerationRate="fast"
					snapToInterval={40}
					contentContainerStyle={{ alignItems: 'center' }}
					renderItem={({ item }) => <TimeFraction value={item} />}
					onScroll={(data) => handleScroll(data, 'minute')}
				/>
			</View>
			<Pressable
				onPress={onPress}
				style={[
					styles.btn,
					{ backgroundColor: colorScheme === 'light' ? '#DC1F0D' : '#E74333' },
				]}
			>
				<Feather
					name="check"
					size={24}
					color={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
				/>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 5,
	},
	timeWrapper: {
		width: 37,
		height: 40,
		borderRadius: 7.5,
		borderWidth: 2,
	},
	colon: {
		fontSize: 30,
		fontFamily: 'Roboto',
		fontWeight: '800',
	},
	btn: {
		width: 37,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 7.5,
		padding: 5,
		marginLeft: 15,
	},
	timeContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 37,
		height: 40,
	},
	timeText: {
		fontSize: 20,
		fontFamily: 'Roboto',
		fontWeight: '800',
	},
});

export default PickTime;
