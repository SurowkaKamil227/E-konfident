import { useContext } from 'react';
import { StyleSheet, View, ImageBackground, ScrollView } from 'react-native';
import { ThemeContext } from '../_layout';
import FaqQuestion from '../../components/faqQuestion';
import { faqQuestions } from '../../constants/constants';

const AboutUs = () => {
	const { colorScheme } = useContext(ThemeContext);
	return (
		<ImageBackground
			style={{ paddingTop: 20, flex: 1 }}
			source={
				colorScheme === 'light'
					? require('../../../assets/images/whylight.png')
					: require('../../../assets/images/whydark.png')
			}
		>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.background}
			>
				<View style={styles.container}>
					{faqQuestions.map((question, index) => (
						<FaqQuestion
							key={index}
							question={question.question}
							answer={question.answer}
						/>
					))}
				</View>
			</ScrollView>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	background: {
		paddingTop: 20,
		flex: 1,
	},
	container: {
		gap: 15,
		justifyContent: 'center',
		paddingLeft: 40,
		paddingRight: 20,
	},
});

export default AboutUs;
