import { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import Button from './button';
import { Feather } from '@expo/vector-icons';
import * as Loc from 'expo-location';
import { ThemeContext } from '../app/_layout';

const Location = () => {
	const [location, setLocation] = useState<any>();
	const { colorScheme } = useContext(ThemeContext);

	const getLocation = () => {
		const getPermissions = async () => {
			let { status } = await Loc.requestForegroundPermissionsAsync();

			if (status !== 'granted') {
				console.log('Permission to access location was denied');
				return;
			}

			let currentLocation = await Loc.getCurrentPositionAsync({});
			setLocation(currentLocation);
			console.log('Location:');
			console.log(currentLocation);
		};
		getPermissions();
	};

	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Button
				onPress={getLocation}
				width={279}
				height={40}
				text="Pobierz lokalizację"
				backgroundColor={colorScheme === 'light' ? '#168DBF' : '#33B1E7'}
				borderColor={colorScheme === 'light' ? '#168DBF' : '#33B1E7'}
				btnTextColor={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
			/>
			<Feather
				name="map-pin"
				size={20}
				color={colorScheme === 'light' ? '#BF1616' : '#E74333'}
			/>
		</View>
	);
};

export default Location;
