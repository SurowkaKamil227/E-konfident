import { useState, useContext } from 'react';
import {
	StyleSheet,
	View,
	ImageBackground,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { ThemeContext } from '../_layout';
import { Button, Input, AccountHeader } from '../../components';
import Animated, { FadeInDown } from 'react-native-reanimated';

const ModifyData = () => {
	const navigation = useNavigation();
	const { colorScheme } = useContext(ThemeContext);
	const [name, setName] = useState('Jan');
	const [password, setPassword] = useState('Siema');
	return (
		<ImageBackground
			style={{ paddingTop: 20, flex: 1 }}
			source={
				colorScheme === 'light'
					? require('../../../assets/images/whylight.png')
					: require('../../../assets/images/whydark.png')
			}
		>
			<ScrollView style={{ marginBottom: 50 }}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View style={styles.background}>
						<AccountHeader />
						<View style={{ gap: 10 }}>
							<Button
								width={324}
								height={44}
								text="Zmodyfikuj dane"
								backgroundColor={
									colorScheme === 'light' ? '#168DBF' : '#33B1E7'
								}
								borderColor={colorScheme === 'light' ? '#168DBF' : '#33B1E7'}
								btnTextColor={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
							/>
							<Animated.View entering={FadeInDown.duration(300)}>
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
									label="Podaj hasło"
									inputText={password}
									setInputText={setPassword}
									secureTextEntry={true}
								/>
								<Button
									onPress={() => navigation.navigate('myAcc')}
									width={324}
									height={44}
									text="Zapisz zmiany"
									backgroundColor={
										colorScheme === 'light' ? '#BF1616' : '#E74333'
									}
									borderColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
									btnTextColor={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
								/>
							</Animated.View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</ImageBackground>
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

export default ModifyData;
