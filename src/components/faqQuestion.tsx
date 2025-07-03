import { useContext } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { ThemeContext } from '../app/_layout';

const FaqQuestion = ({ question, answer }: any) => {
	const { colorScheme } = useContext(ThemeContext);
	return (
		<View>
			<View style={{ paddingHorizontal: 10 }}>
				<Text
					style={[
						styles.text,
						{
							fontWeight: '700',
							color: colorScheme === 'light' ? '#BF1616' : '#E74333',
						},
					]}
				>
					{question}
				</Text>
			</View>

			<View
				style={[
					styles.answerContainer,
					{ backgroundColor: colorScheme === 'light' ? '#F0EEF0' : '#171017' },
				]}
			>
				<Text
					style={[
						styles.text,
						{
							fontWeight: '400',
							color: colorScheme === 'light' ? '#594E59' : '#978E97',
						},
					]}
				>
					{answer}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	answerContainer: {
		marginTop: 10,
		width: 332,
		padding: 10,
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
	text: {
		fontFamily: 'Roboto',
		fontSize: 14,
		lineHeight: 20,
	},
});

export default FaqQuestion;
