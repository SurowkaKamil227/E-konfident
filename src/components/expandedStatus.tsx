import { useContext } from 'react';
import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { ThemeContext } from '../app/_layout';

const ExpandedStatus = ({
	statusText,
	textColor,
	notify,
	setNotify,
	expanded,
	setExpanded,
}: any) => {
	const { colorScheme } = useContext(ThemeContext);

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: colorScheme === 'light' ? '#F0EEF0' : '#171017',
				},
			]}
		>
			<Animated.View
				entering={FadeInRight.duration(500)}
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Text
					style={[
						styles.title,
						{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
					]}
				>
					Title
				</Text>
				<Pressable onPress={() => setExpanded(false)}>
					<Feather name="x" size={20} color={textColor} />
				</Pressable>
			</Animated.View>

			<Animated.View
				entering={FadeInRight.duration(500)}
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Text
					style={[
						styles.subtitle,
						{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
					]}
				>
					Status:{' '}
					<Text style={[styles.paragraph, { color: textColor }]}>
						{statusText}
					</Text>
				</Text>
				<Pressable onPress={() => setNotify(!notify)}>
					<Feather
						name={notify ? 'bell' : 'bell-off'}
						size={20}
						color={colorScheme === 'light' ? '#594E59' : '#978E97'}
					/>
				</Pressable>
			</Animated.View>
			<Animated.View
				entering={FadeInRight.duration(500)}
				style={styles.contentContainer}
			>
				<View>
					<Text
						style={[
							styles.subtitle,
							{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
						]}
					>
						Name of the unit:
					</Text>
					<Text style={[styles.paragraph, { color: '#6D646D' }]}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</Text>
				</View>
				<View>
					<Text
						style={[
							styles.subtitle,
							{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
						]}
					>
						Name of the receiver:
					</Text>
					<Text style={[styles.paragraph, { color: '#6D646D' }]}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</Text>
				</View>
				<View>
					<Text
						style={[
							styles.subtitle,
							{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
						]}
					>
						Other informations:
					</Text>
					<Text style={[styles.paragraph, { color: '#6D646D' }]}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</Text>
				</View>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 320,
		padding: 10,
		justifyContent: 'center',
		borderRadius: 22,
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
		zIndex: 100,
	},
	contentContainer: {
		marginTop: 10,
		gap: 10,
	},
	title: {
		fontFamily: 'Roboto',
		fontSize: 20,
		fontWeight: '500',
		fontStyle: 'normal',
		lineHeight: 26,
	},
	subtitle: {
		fontFamily: 'Roboto',
		fontSize: 16,
		fontWeight: '500',
		fontStyle: 'normal',
		lineHeight: 24,
	},
	paragraph: {
		fontFamily: 'Roboto',
		fontSize: 14,
		fontWeight: '400',
		fontStyle: 'normal',
		lineHeight: 20,
	},
});

export default ExpandedStatus;
