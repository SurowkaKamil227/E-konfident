import { useState, useContext } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ImageBackground,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { ThemeContext } from '../_layout';
import { Input, Button, AccountHeader } from '../../components';
import Animated, { FadeInDown } from 'react-native-reanimated';

const ChangePassword = () => {
	const navigation = useNavigation();
	const { colorScheme } = useContext(ThemeContext);
	const [password, setPassword] = useState('');
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<ImageBackground
				style={{ paddingTop: 20, flex: 1 }}
				source={
					colorScheme === 'light'
						? require('../../../assets/images/whylight.png')
						: require('../../../assets/images/whydark.png')
				}
			>
				<View style={styles.background}>
					<AccountHeader />
					<Animated.View
						entering={FadeInDown.duration(300)}
						style={{ gap: 10 }}
					>
						<Input
							max_words={500}
							label="Podaj stare hasło"
							inputText={password}
							setInputText={setPassword}
							secureTextEntry={true}
						/>
						<Input
							max_words={500}
							label="Podaj nowe hasło"
							inputText={password}
							setInputText={setPassword}
							secureTextEntry={true}
						/>
						<Input
							max_words={500}
							label="Powtórz nowe hasło"
							inputText={password}
							setInputText={setPassword}
							secureTextEntry={true}
						/>
						<Button
							onPress={() => navigation.navigate('myAcc')}
							width={324}
							height={44}
							text="Zmień hasło"
							backgroundColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
							borderColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
							btnTextColor={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
						/>
					</Animated.View>
				</View>
			</ImageBackground>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	gradient: {
		paddingTop: 20,
		flex: 1,
		padding: 20,
	},
	background: {
		height: '100%',
		alignItems: 'center',
	},
});

export default ChangePassword;
