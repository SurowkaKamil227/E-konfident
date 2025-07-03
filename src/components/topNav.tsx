import { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	StyleSheet,
	View,
	Text,
	Pressable,
	Dimensions,
	StatusBar,
	Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { ThemeContext } from '../app/_layout';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const NavButton = ({
	iconName,
	color,
	text,
	textColor,
	onPress,
	enterDelay,
}: any) => {
	const [isHovered, setIsHovered] = useState(false);
	const { colorScheme } = useContext(ThemeContext);

	const bgColor =
		isHovered && colorScheme === 'light'
			? '#FFD0CC'
			: colorScheme == 'light'
			? '#F0EEF0'
			: isHovered && colorScheme === 'dark'
			? '#3D0606'
			: '#171017';

	return (
		<Animated.View entering={FadeInUp.duration(50).delay(enterDelay)}>
			<Pressable
				onPress={onPress}
				style={[
					styles.btnWrapper,
					{
						backgroundColor: bgColor,
					},
				]}
				onPressIn={() => setIsHovered(true)}
				onPressOut={() => setIsHovered(false)}
			>
				<Feather name={iconName} size={15} color={color} />
				<Text style={[styles.btnText, { color: textColor }]}>{text}</Text>
			</Pressable>
		</Animated.View>
	);
};
const TopNav = () => {
	const { colorScheme, setColorScheme } = useContext(ThemeContext);
	const navigation = useNavigation();

	const topOffset =
		Platform.OS === 'ios'
			? StatusBar.currentHeight + 92
			: StatusBar.currentHeight + 30;

	const handleThemeChange = () => {
		if (colorScheme === 'dark') {
			setColorScheme('light');
		} else {
			setColorScheme('dark');
		}
	};

	return (
		<View style={[styles.container, { top: topOffset }]}>
			<NavButton
				onPress={handleThemeChange}
				iconName={colorScheme === 'dark' ? 'moon' : 'sun'}
				color={colorScheme === 'light' ? '#BF1616' : '#E74333'}
				text="Zmień motyw"
				textColor={colorScheme === 'light' ? '#594E59' : '#978E97'}
				enterDelay={0}
			/>
			<NavButton
				onPress={() => navigation.navigate('legalInfo')}
				iconName="book"
				color={colorScheme === 'light' ? '#BF1616' : '#E74333'}
				text="Informacje prawne"
				textColor={colorScheme === 'light' ? '#594E59' : '#978E97'}
				enterDelay={50}
			/>
			<NavButton
				onPress={() => navigation.navigate('administration')}
				iconName="database"
				color={colorScheme === 'light' ? '#BF1616' : '#E74333'}
				text="Administracja"
				textColor={colorScheme === 'light' ? '#594E59' : '#978E97'}
				enterDelay={100}
			/>
			<NavButton
				onPress={() => navigation.navigate('faq')}
				iconName="users"
				color={colorScheme === 'light' ? '#BF1616' : '#E74333'}
				text="O nas"
				textColor={colorScheme === 'light' ? '#594E59' : '#978E97'}
				enterDelay={150}
			/>
			<NavButton
				iconName="log-out"
				color={colorScheme === 'light' ? '#BF1616' : '#E74333'}
				text="Wyloguj"
				textColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
				enterDelay={200}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: deviceWidth,
		borderBottomStyle: 'solid',
		borderBottomWidth: 2,
		borderBottomColor: '#BF1616',
		position: 'absolute',
	},
	btnWrapper: {
		flexDirection: 'row',
		padding: 10,
		gap: 10,
		alignItems: 'center',
		paddingLeft: 25,
	},
	btnText: {
		fontFamily: 'Roboto',
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 20,
	},
});

export default TopNav;
