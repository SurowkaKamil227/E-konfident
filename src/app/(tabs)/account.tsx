import { ThemeContext } from '../_layout';
import { useState, useEffect, useContext } from 'react';
import { useNavigation } from 'expo-router';
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	ImageBackground,
} from 'react-native';
import Login from '../login';
import Register from '../register';

export default function TabTwoScreen() {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const navigation = useNavigation();
	const isLoggedIn = true;
	const { colorScheme } = useContext(ThemeContext);

	useEffect(() => {
		navigation.setOptions({
			headerTitle: isLoggedIn ? 'LOGOWANIE' : 'REJESTRACJA',
		});
	}, []);

	return (
		<ImageBackground
			source={
				colorScheme === 'light'
					? require('../../../assets/images/whylight.png')
					: require('../../../assets/images/whydark.png')
			}
			style={styles.bg}
		>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.background}>
					{isLoggedIn ? (
						<Login
							name={name}
							setName={setName}
							password={password}
							setPassword={setPassword}
						/>
					) : (
						<Register
							name={name}
							setName={setName}
							password={password}
							setPassword={setPassword}
						/>
					)}
				</View>
			</TouchableWithoutFeedback>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	bg: {
		paddingTop: 20,
		flex: 1,
	},
	background: {
		height: '100%',
		alignItems: 'center',
	},
});
