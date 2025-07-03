import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	TouchableOpacity,
	Text,
	Image,
	StyleSheet,
	Animated,
	I18nManager,
} from 'react-native';

import { useCalendar } from '../DatePicker';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../../app/_layout';

const Header = ({ changeMonth }) => {
	const {
		options,
		disableDateChange,
		state,
		utils,
		minimumDate,
		maximumDate,
		isGregorian,
		mode,
	} = useCalendar();
	const [mainState, setMainState] = state;
	const style = styles(options);
	const [disableChange, setDisableChange] = useState(false);
	const { colorScheme } = useContext(ThemeContext);
	const [{ lastDate, shownAnimation, hiddenAnimation }, changeMonthAnimation] =
		utils.useMonthAnimation(
			mainState.activeDate,
			options.headerAnimationDistance,
			() => setDisableChange(false)
		);
	const prevDisable =
		disableDateChange ||
		(minimumDate && utils.checkArrowMonthDisabled(mainState.activeDate, true));
	const nextDisable =
		disableDateChange ||
		(maximumDate && utils.checkArrowMonthDisabled(mainState.activeDate, false));

	const onChangeMonth = (type) => {
		if (disableChange) return;
		setDisableChange(true);
		changeMonthAnimation(type);
		const modificationNumber = type === 'NEXT' ? 1 : -1;
		const newDate = utils
			.getDate(mainState.activeDate)
			.add(modificationNumber, 'month');
		setMainState({
			type: 'set',
			activeDate: utils.getFormated(newDate),
		});
		changeMonth(type);
	};

	return (
		<View
			style={[style.container, I18nManager.isRTL && style.reverseContainer]}
		>
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => !nextDisable && onChangeMonth('NEXT')}
				style={style.arrowWrapper}
			>
				<View
					style={[
						style.chevronWrapper,
						{
							backgroundColor: colorScheme === 'light' ? '#BF1616' : '#E74333',
						},
					]}
				>
					<Ionicons
						name="chevron-forward"
						size={24}
						color={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
					/>
				</View>
			</TouchableOpacity>
			<View style={style.monthYearContainer}>
				<Animated.View
					style={[
						style.monthYear,
						shownAnimation,
						style.activeMonthYear,
						I18nManager.isRTL && style.reverseMonthYear,
					]}
				>
					<TouchableOpacity
						activeOpacity={0.7}
						style={[
							style.centerWrapper,
							style.monthYearWrapper,
							utils.flexDirection,
						]}
						onPress={() =>
							!disableDateChange &&
							setMainState({
								type: 'toggleMonth',
							})
						}
					>
						<Text
							style={[
								style.headerText,
								style.monthText,
								{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
							]}
						>
							{utils.getMonthYearText(mainState.activeDate).split(' ')[0]}
						</Text>
						<Text
							style={[
								style.headerText,
								style.monthText,
								{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
							]}
						>
							{utils.getMonthYearText(mainState.activeDate).split(' ')[1]}
						</Text>
					</TouchableOpacity>
				</Animated.View>
				<Animated.View
					style={[
						style.monthYear,
						hiddenAnimation,
						utils.flexDirection,
						I18nManager.isRTL && style.reverseMonthYear,
					]}
				>
					<Text
						style={[
							style.headerText,
							{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
						]}
					>
						{utils.getMonthYearText(lastDate).split(' ')[0]}
					</Text>
					<Text
						style={[
							style.headerText,
							{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
						]}
					>
						{utils.getMonthYearText(lastDate).split(' ')[1]}
					</Text>
				</Animated.View>
			</View>
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => !prevDisable && onChangeMonth('PREVIOUS')}
				style={style.arrowWrapper}
			>
				<View
					style={[
						style.chevronWrapper,
						{
							backgroundColor: colorScheme === 'light' ? '#BF1616' : '#E74333',
						},
					]}
				>
					<Ionicons
						name="chevron-back"
						size={24}
						color={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
					/>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = (theme) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			flexDirection: 'row-reverse',
		},
		reverseContainer: {
			flexDirection: 'row',
		},
		arrowWrapper: {
			padding: 20,
			position: 'relative',
			zIndex: 1,
			opacity: 1,
		},
		arrow: {
			width: 18,
			height: 18,
			opacity: 0.9,
			tintColor: theme.mainColor,
			margin: 2,
		},
		leftArrow: {
			transform: [
				{
					rotate: '180deg',
				},
			],
		},
		disableArrow: {
			opacity: 0,
		},
		monthYearContainer: {
			flex: 1,
			position: 'relative',
			alignItems: 'center',
			justifyContent: 'center',
		},
		monthYear: {
			position: 'absolute',
			alignItems: 'center',
			flexDirection: 'row-reverse',
		},
		reverseMonthYear: {
			flexDirection: 'row',
		},
		activeMonthYear: {
			zIndex: 999,
		},
		monthYearWrapper: {
			alignItems: 'center',
		},
		headerText: {
			fontSize: 20,
			padding: 2,
			fontFamily: 'Roboto',
			fontWeight: '500',
			textAlignVertical: 'center',
		},
		monthText: {
			fontFamily: 'Roboto',
		},
		centerWrapper: {
			paddingVertical: 4,
			paddingHorizontal: 8,
			alignItems: 'center',
		},
		time: {
			marginRight: 5,
		},
		chevronWrapper: {
			width: 34,
			height: 34,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 7.5,
		},
	});

Header.defaultProps = {
	changeMonth: () => null,
};

Header.propTypes = {
	changeMonth: PropTypes.func,
};

export { Header };
