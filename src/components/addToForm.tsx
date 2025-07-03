import { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import Button from './button';
import Input from './input';
import { ThemeContext } from '../app/_layout';

const AddToForm = ({
	showOptions,
	setShowOptions,
	option,
	setOption,
	options,
	setOptions,
	firstButtonText,
	secondButtonText,
	firstLabel,
	secondLabel,
	thirdLabel,
	fourthLabel,
	type,
}: any) => {
	const { colorScheme } = useContext(ThemeContext);

	const handlePress = () => {
		setShowOptions(true);
		setOptions([...options, option]);
	};

	const handleDelete = () => {
		setOptions(options.slice(0, -1));
		if (options.length === 1) {
			setShowOptions(false);
		}
	};

	return (
		<View>
			{type === 'place' ? (
				<Button
					onPress={handlePress}
					width={324}
					height={44}
					text={firstButtonText}
					backgroundColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
					borderColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
					btnTextColor={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
				/>
			) : (
				<Button
					onPress={handlePress}
					width={324}
					height={44}
					text={firstButtonText}
					backgroundColor={colorScheme === 'light' ? '#168DBF' : '#33B1E7'}
					borderColor={colorScheme === 'light' ? '#168DBF' : '#33B1E7'}
					btnTextColor={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
				/>
			)}
			{showOptions && (
				<View>
					{options.map((option, index) => (
						<View key={index}>
							<Input
								max_words={500}
								label={firstLabel + ' #' + (index + 1)}
								inputText={option}
								setInputText={setOption}
								secureTextEntry={false}
							/>
							<Input
								max_words={500}
								label={secondLabel + ' #' + (index + 1)}
								inputText={option}
								setInputText={setOption}
								secureTextEntry={false}
							/>
							<Input
								max_words={500}
								label={thirdLabel + ' #' + (index + 1)}
								inputText={option}
								setInputText={setOption}
								secureTextEntry={false}
							/>
							{type === 'place' && (
								<Input
									max_words={500}
									label={fourthLabel + ' #' + (index + 1)}
									inputText={option}
									setInputText={setOption}
									secureTextEntry={false}
								/>
							)}
						</View>
					))}

					<Button
						onPress={handleDelete}
						width={324}
						height={44}
						text={secondButtonText}
						backgroundColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
						borderColor={colorScheme === 'light' ? '#BF1616' : '#E74333'}
						btnTextColor={colorScheme === 'light' ? '#F0EEF0' : '#171017'}
					/>
				</View>
			)}
		</View>
	);
};

export default AddToForm;
