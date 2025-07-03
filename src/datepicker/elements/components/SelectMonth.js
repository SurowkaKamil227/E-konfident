import React, { useEffect, useRef, useState, useContext } from 'react';
import {
	View,
	StyleSheet,
	Text,
	Animated,
	TouchableOpacity,
	Easing,
	Image,
	TextInput,
	I18nManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../../app/_layout';
import { useCalendar } from '../DatePicker';

const SelectMonth = () => {
	const {
		options,
		state,
		utils,
		isGregorian,
		selectorStartingYear,
		selectorEndingYear,
		mode,
		minimumDate,
		maximumDate,
		onMonthYearChange,
	} = useCalendar();
	const { colorScheme } = useContext(ThemeContext);
	const [mainState, setMainState] = state;
	const [show, setShow] = useState(false);
	const style = styles(options);
	const [year, setYear] = useState(
		utils.getMonthYearText(mainState.activeDate).split(' ')[1]
	);
	const openAnimation = useRef(new Animated.Value(0)).current;
	const currentMonth = Number(mainState.activeDate.split('/')[1]);
	const prevDisable =
		maximumDate && utils.checkYearDisabled(Number(utils.toEnglish(year)), true);
	const nextDisable =
		minimumDate &&
		utils.checkYearDisabled(Number(utils.toEnglish(year)), false);

	useEffect(() => {
		mainState.monthOpen && setShow(true);
		Animated.timing(openAnimation, {
			toValue: mainState.monthOpen ? 1 : 0,
			duration: 350,
			useNativeDriver: true,
			easing: Easing.bezier(0.17, 0.67, 0.46, 1),
		}).start(() => {
			!mainState.monthOpen && setShow(false);
		});
	}, [mainState.monthOpen, openAnimation]);

	useEffect(() => {
		show && setYear(utils.getMonthYearText(mainState.activeDate).split(' ')[1]);
	}, [mainState.activeDate, utils, show]);

	const onSelectMonth = (month) => {
		if (show) {
			let y = Number(utils.toEnglish(year));
			const date = utils.getDate(utils.validYear(mainState.activeDate, y));
			const activeDate =
				month !== null
					? isGregorian
						? date.month(month)
						: date.jMonth(month)
					: date;
			setMainState({
				type: 'set',
				activeDate: utils.getFormated(activeDate),
			});
			month !== null &&
				onMonthYearChange(utils.getFormated(activeDate, 'monthYearFormat'));
			month !== null &&
				mode !== 'monthYear' &&
				setMainState({
					type: 'toggleMonth',
				});
		}
	};

	useEffect(() => {
		onSelectMonth(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prevDisable, nextDisable]);

	const onChangeYear = (text) => {
		if (Number(utils.toEnglish(text))) {
			setYear(utils.toPersianNumber(text));
		}
	};

	const onSelectYear = (number) => {
		let y = Number(utils.toEnglish(year)) + number;
		if (y > selectorEndingYear) {
			y = selectorEndingYear;
		} else if (y < selectorStartingYear) {
			y = selectorStartingYear;
		}
		setYear(utils.toPersianNumber(y));
	};

	const containerStyle = [
		style.container,
		{
			opacity: openAnimation,
			transform: [
				{
					scale: openAnimation.interpolate({
						inputRange: [0, 1],
						outputRange: [1.1, 1],
					}),
				},
			],
		},
	];

	return show ? (
		<Animated.View
			style={[
				containerStyle,
				{ backgroundColor: colorScheme === 'light' ? '#F0EEF0' : '#171017' },
			]}
		>
			<View style={[style.header, I18nManager.isRTL && style.reverseHeader]}>
				<TouchableOpacity
					activeOpacity={0.7}
					style={style.arrowWrapper}
					onPress={() => !nextDisable && onSelectYear(-1)}
				>
					<View style={style.chevronWrapper}>
						<Ionicons
							name="chevron-back"
							size={24}
							color={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
						/>
					</View>
				</TouchableOpacity>
				<TextInput
					style={[
						style.yearInput,
						{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
					]}
					keyboardType="numeric"
					maxLength={4}
					value={year}
					onBlur={() => onSelectYear(0)}
					underlineColorAndroid={'rgba(0,0,0,0)'}
					returnKeyType="done"
					autoCorrect={false}
					blurOnSubmit
					selectionColor={options.mainColor}
					onChangeText={onChangeYear}
				/>
				<TouchableOpacity
					activeOpacity={0.7}
					style={style.arrowWrapper}
					onPress={() => !prevDisable && onSelectYear(+1)}
				>
					<View style={style.chevronWrapper}>
						<Ionicons
							name="chevron-forward"
							size={24}
							color={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
						/>
					</View>
				</TouchableOpacity>
			</View>

			<View style={[style.monthList, utils.flexDirection]}>
				{[...Array(12).keys()].map((item) => {
					const disabled = utils.checkSelectMonthDisabled(
						mainState.activeDate,
						item
					);
					return (
						<TouchableOpacity
							key={item}
							activeOpacity={0.8}
							style={[
								style.item,
								currentMonth === item + 1 && style.selectedItem,
							]}
							onPress={() => !disabled && onSelectMonth(item)}
						>
							<Text
								style={[
									style.itemText,
									currentMonth === item + 1 && style.selectedItemText,
									disabled && style.disabledItemText,
									{ color: colorScheme === 'light' ? '#594E59' : '#978E97' },
								]}
							>
								{utils.getMonthName(item)}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</Animated.View>
	) : null;
};

const styles = (theme) =>
	StyleSheet.create({
		container: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			top: 0,
			right: 0,
			backgroundColor: theme.backgroundColor,
			borderRadius: 10,
			flexDirection: 'column',
			zIndex: 999,
			justifyContent: 'center',
			alignItems: 'center',
		},
		header: {
			alignItems: 'center',
			paddingHorizontal: 15,
			justifyContent: 'space-between',
			width: '80%',
			flexDirection: 'row',
		},
		reverseHeader: {
			flexDirection: 'row-reverse',
		},
		monthList: {
			flexWrap: 'wrap',
			margin: 25,
		},
		item: {
			width: '30%',
			marginHorizontal: '1.5%',
			paddingVertical: 8,
			marginVertical: 7,
			alignItems: 'center',
		},
		selectedItem: {
			backgroundColor: theme.mainColor,
			borderRadius: 12,
		},
		itemText: {
			fontFamily: 'Roboto',
			fontSize: 16,
			fontWeight: '500',
		},
		selectedItemText: {
			color: theme.selectedTextColor,
		},
		disabledItemText: {
			opacity: 0.2,
		},
		arrowWrapper: {
			padding: 13,
			position: 'relative',
			zIndex: 1,
			opacity: 1,
		},
		disableArrow: {
			opacity: 0,
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
		arrowDisable: {
			opacity: 0,
		},
		yearInput: {
			fontSize: 24,
			paddingVertical: 2,
			paddingHorizontal: 4,
			fontFamily: 'Roboto',
			fontWeight: '500',
			textAlignVertical: 'center',
			minWidth: 100,
			textAlign: 'center',
		},
		chevronWrapper: {
			backgroundColor: '#BF1616',
			width: 34,
			height: 34,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 7.5,
		},
	});

export { SelectMonth };
