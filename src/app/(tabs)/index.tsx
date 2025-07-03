import { useContext } from 'react';
import { StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { ThemeContext } from '../_layout';
import { Status, SearchBar } from '../../components';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function Cases() {
	const { colorScheme } = useContext(ThemeContext);

	return (
		<ImageBackground
			source={
				colorScheme === 'light'
					? require('../../../assets/images/whylight.png')
					: require('../../../assets/images/whydark.png')
			}
			style={{ flex: 1 }}
		>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.background}
			>
				<Animated.View
					entering={FadeInDown.duration(300)}
					style={styles.container}
				>
					<SearchBar />
					<Status
						iconName="more-horizontal"
						bgColor="#16AAEA"
						textColor="#16AAEA"
						statusText="w toku"
					/>
					<Status
						iconName="alert-triangle"
						bgColor="#DC1F0D"
						textColor="#DC1F0D"
						statusText="umorzona"
					/>
					<Status
						iconName="x"
						bgColor="#F0B812"
						textColor="#F0B812"
						statusText="nieprzyjęta"
					/>
					<Status
						iconName="check"
						bgColor="#00CC1D"
						textColor="#00CC1D"
						statusText="zrealizowany"
					/>
				</Animated.View>
			</ScrollView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		paddingTop: 20,
		flex: 1,
	},
	container: {
		alignItems: 'center',
		marginTop: 20,
		gap: 13,
		marginBottom: 100,
	},
});
