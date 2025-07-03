import { useState, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedStyle,
	withTiming,
	useSharedValue,
} from 'react-native-reanimated';
import { ThemeContext } from '../app/_layout';

const SearchBar = () => {
	const [value, setValue] = useState(0);
	const animation = useSharedValue(0);
	const { colorScheme } = useContext(ThemeContext);
	const animatedStyle = useAnimatedStyle(() => {
		return {
			width:
				animation.value === 1
					? withTiming(320, { duration: 500 })
					: withTiming(40, { duration: 500 }),
			borderRadius:
				animation.value === 1
					? withTiming(7.5, { duration: 500 })
					: withTiming(50, { duration: 500 }),
		};
	});

	const handlePress = () => {
		if (animation.value === 1) {
			animation.value = 0;
			setValue(0);
		} else {
			animation.value = 1;
			setValue(1);
		}
	};

	return (
		<Animated.View
			style={[
				styles.container,
				animatedStyle,
				{ backgroundColor: colorScheme === 'light' ? '#F0EEF0' : '#171017' },
			]}
		>
			<TouchableOpacity onPress={handlePress}>
				<Feather
					name="search"
					size={20}
					color={colorScheme === 'light' ? '#BF1616' : '#E74333'}
				/>
			</TouchableOpacity>
			{value == 1 && (
				<TextInput
					style={styles.input}
					placeholder={'Szukaj...'}
					placeholderTextColor={colorScheme === 'light' ? '#B8B2B8' : '#978E97'}
				/>
			)}
			{value == 1 && (
				<TouchableOpacity onPress={handlePress}>
					<Feather
						name="x"
						size={20}
						color={colorScheme === 'light' ? '#BF1616' : '#E74333'}
					/>
				</TouchableOpacity>
			)}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 320,
		height: 40,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 10,
		borderRadius: 7.5,
		...Platform.select({
			ios: {
				shadowColor: 'rgba(0, 0, 0, 0.25)',
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 1,
				shadowRadius: 8,
			},
			android: {
				elevation: 4,
			},
		}),
	},
	input: {
		width: 240,
	},
});

export default SearchBar;
