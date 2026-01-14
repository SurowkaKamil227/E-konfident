import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Animated, Pressable } from 'react-native';

import { Header } from './Header';
import { Days } from './Days';
import { useCalendar } from "../CalendarContext";
import { ThemeContext } from '../../../app/_layout';

const Calendar = () => {
	const { colorScheme } = useContext(ThemeContext);
	const { options, state, utils, onSelectedChange } = useCalendar();
	const [mainState] = state;
	const style = styles(options);
	const [{ shownAnimation }, changeMonthAnimation] = utils.useMonthAnimation(
		mainState.activeDate,
		options.daysAnimationDistance
	);

	useEffect(() => {
		mainState.selectedDate && onSelectedChange(mainState.selectedDate);
	}, [mainState.selectedDate, onSelectedChange]);

	return (
		<View style={[style.container]}>
			<Header changeMonth={changeMonthAnimation} />
			<View
				style={[
					style.daysName,
					utils.flexDirection,
					{ borderTopColor: colorScheme === 'light' ? '#EF7165' : '#8D0808' },
				]}
			>
				{utils.config.dayNamesShort.map((item) => (
					<Text
						key={item}
						style={[
							style.daysNameText,
							{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
						]}
					>
						{item}
					</Text>
				))}
			</View>
			<View style={style.daysContainer}>
				<Animated.View style={[style.days, shownAnimation]}>
					<Days />
				</Animated.View>
			</View>
		</View>
	);
};

const styles = (theme) =>
	StyleSheet.create({
		container: {
			flexDirection: 'column',
			flex: 1,
			width: 320,
			borderRadius: 22,
		},
		daysName: {
			paddingVertical: 10,
			marginBottom: 0,
			alignItems: 'center',
			justifyContent: 'space-around',
			borderBottomColor: theme.borderColor,
			borderBottomWidth: 1,
			marginHorizontal: 15,
			borderTopWidth: 1,
		},
		daysNameText: {
			fontFamily: 'Roboto',
			fontSize: 14,
			fontWeight: '500',
		},
		daysContainer: {
			flex: 1,
			position: 'relative',
			margin: 15,
			marginTop: 5,
			marginBottom: 0,
		},
		days: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			top: 0,
			right: 0,
		},
		button: {
			width: 86,
			height: 40,
			backgroundColor: 'red',
			borderRadius: 7.5,
		},
	});

export { Calendar };
