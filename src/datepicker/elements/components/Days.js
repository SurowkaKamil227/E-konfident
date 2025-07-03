import React, { useState, useContext, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../app/_layout';
import { useCalendar } from '../DatePicker';

const Days = () => {
	const { options, state, utils, onDateChange } = useCalendar();
	const [mainState, setMainState] = state;
	const [itemSize, setItemSize] = useState(0);
	const style = styles(options);
	const days = useMemo(() => utils.getMonthDays(mainState.activeDate));
	const { colorScheme } = useContext(ThemeContext);

	const onSelectDay = (date) => {
		setMainState({
			type: 'set',
			selectedDate: date,
		});
		onDateChange(utils.getFormated(utils.getDate(date), 'dateFormat'));
	};

	const changeItemHeight = ({ nativeEvent }) => {
		const { width } = nativeEvent.layout;
		!itemSize && setItemSize((width / 7).toFixed(2) * 1 - 0.5);
	};

	return (
		<View
			style={[style.container, utils.flexDirection]}
			onLayout={changeItemHeight}
		>
			{days.map((day, n) => (
				<View
					key={n}
					style={{
						width: 34,
						height: 34,
						borderRadius: 7.5,
						borderWidth: 1,
						borderColor:
							colorScheme === 'light' && day
								? '#EF7165'
								: colorScheme === 'light'
								? 'transparent'
								: colorScheme === 'dark' && day
								? '#8D0808'
								: 'transparent',
						margin: 2,
					}}
				>
					{day && (
						<TouchableOpacity
							style={[
								style.dayItem,
								mainState.selectedDate === day.date && {
									backgroundColor:
										colorScheme === 'light' ? '#BF1616' : '#DC1F0D',
								},
							]}
							onPress={() => !day.disabled && onSelectDay(day.date)}
							activeOpacity={0.8}
						>
							<Text
								style={[
									style.dayText,
									{ color: colorScheme === 'light' ? '#EF7165' : '#8D0808' },
									mainState.selectedDate === day.date && {
										color: colorScheme === 'light' ? '#F0EEF0' : '#171017',
									},
									day.disabled && style.dayTextDisabled,
								]}
							>
								{day.dayString}
							</Text>
						</TouchableOpacity>
					)}
				</View>
			))}
		</View>
	);
};

const styles = (theme) =>
	StyleSheet.create({
		container: {
			width: '100%',
			flexWrap: 'wrap',
			gap: 4,
			flex: 1,
		},
		dayItem: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 7.5,
		},
		dayText: {
			fontFamily: 'Roboto',
			fontSize: 16,
			textAlign: 'center',
			width: '100%',
		},
		dayTextDisabled: {
			opacity: 0.2,
		},
	});

export { Days };
