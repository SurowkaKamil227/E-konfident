import { useState, useContext } from 'react';
import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ExpandedStatus from './expandedStatus';
import { ThemeContext } from '../app/_layout';

const Circle = ({ iconName, bgColor }: any) => {
	const { colorScheme } = useContext(ThemeContext);
	return (
		<View style={[styles.circle, { backgroundColor: bgColor }]}>
			<Feather
				name={iconName}
				size={20}
				color={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
			/>
		</View>
	);
};

const Status = ({ iconName, bgColor, textColor, statusText }: any) => {
	const [notify, setNotify] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const { colorScheme } = useContext(ThemeContext);

	return (
		<View>
			{!expanded ? (
				<Pressable
					onPress={() => setExpanded(true)}
					style={[
						styles.container,
						{
							backgroundColor: colorScheme === 'light' ? '#F0EEF0' : '#171017',
						},
					]}
				>
					<Circle iconName={iconName} bgColor={bgColor} />
					<View>
						<Text
							style={[
								styles.title,
								{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
							]}
						>
							Title
						</Text>
						<Text
							style={[
								styles.subtitle,
								{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
							]}
						>
							Status:{' '}
							<Text style={[styles.status, { color: textColor }]}>
								{statusText}
							</Text>
						</Text>
					</View>
					<Pressable style={styles.icon} onPress={() => setNotify(!notify)}>
						<Feather
							name={notify ? 'bell' : 'bell-off'}
							size={20}
							color={colorScheme === 'light' ? '#594E59' : '#978E97'}
						/>
					</Pressable>
				</Pressable>
			) : (
				<ExpandedStatus
					statusText={statusText}
					textColor={textColor}
					notify={notify}
					setNotify={setNotify}
					expanded={expanded}
					setExpanded={setExpanded}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 320,
		height: 90,
		padding: 20,
		gap: 18,
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
		alignItems: 'center',
		flexDirection: 'row',
	},
	title: {
		fontFamily: 'Roboto',
		fontSize: 20,
		fontStyle: 'normal',
		fontWeight: '500',
		lineHeight: 26,
		color: '#594E59',
	},
	subtitle: {
		fontFamily: 'Roboto',
		fontSize: 16,
		fontStyle: 'normal',
		fontWeight: '500',
		lineHeight: 24,
		color: '#594E59',
	},
	status: {
		fontFamily: 'Roboto',
		fontSize: 14,
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 20,
		marginLeft: 10,
	},
	circle: {
		width: 40,
		height: 40,
		borderRadius: 50,
		padding: 10,
	},
	icon: {
		position: 'absolute',
		top: 10,
		right: 10,
	},
});

export default Status;
