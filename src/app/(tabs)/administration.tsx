import { useState, useContext } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ImageBackground,
	Platform,
	Modal,
	TouchableWithoutFeedback,
} from 'react-native';
import { ThemeContext } from '../_layout';
import { WebView } from 'react-native-webview';
import { governmentLinks, ourLinks } from '../../constants/constants';

const Webview = ({ linkName, uri }: any) => {
	const [visible, setVisible] = useState(false);
	const { colorScheme } = useContext(ThemeContext);

	return (
		<View>
			<TouchableWithoutFeedback onPress={() => setVisible(true)}>
				<Text
					style={[
						styles.mdText,
						{
							fontWeight: '600',
							color: colorScheme === 'light' ? '#BF1616' : '#E74333',
							textDecorationLine: 'underline',
						},
					]}
				>
					{linkName}
				</Text>
			</TouchableWithoutFeedback>
			<Modal
				visible={visible}
				presentationStyle="pageSheet"
				animationType="slide"
				onRequestClose={() => setVisible(false)}
			>
				<WebView source={{ uri: uri }} />
			</Modal>
		</View>
	);
};

const Administration = () => {
	const { colorScheme } = useContext(ThemeContext);
	return (
		<ImageBackground
			source={
				colorScheme === 'light'
					? require('../../../assets/images/whylight.png')
					: require('../../../assets/images/whydark.png')
			}
			style={styles.background}
		>
			<View style={styles.container}>
				<View style={{ gap: 30 }}>
					<View style={{ gap: 10 }}>
						<Text
							style={[
								styles.mdText,
								{
									fontWeight: '700',
									color: colorScheme === 'light' ? '#594E59' : '#978E97',
								},
							]}
						>
							Lorem ipsum
						</Text>
						<View
							style={[
								styles.box,
								{
									backgroundColor:
										colorScheme === 'light' ? '#F0EEF0' : '#171017',
								},
							]}
						>
							<Text
								style={[
									styles.mdText,
									{
										fontWeight: '400',
										color: colorScheme === 'light' ? '#594E59' : '#978E97',
									},
								]}
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
								Luctus accumsan tortor posuere ac ut consequat semper viverra
								nam. Vel risus commodo viverra maecenas accumsan lacus vel.
								Laoreet suspendisse interdum consectetur libero id faucibus
								nisl.
							</Text>
						</View>
					</View>

					<View style={{ gap: 10 }}>
						<Text
							style={[
								styles.mdText,
								{
									fontWeight: '700',
									color: colorScheme === 'light' ? '#594E59' : '#978E97',
								},
							]}
						>
							Linki z rządowymi informacjami prawnymi:
						</Text>
						<View
							style={[
								styles.box,
								{
									backgroundColor:
										colorScheme === 'light' ? '#F0EEF0' : '#171017',
								},
							]}
						>
							{governmentLinks.map((link, index) => (
								<Webview key={index} linkName={link.name} uri={link.link} />
							))}
						</View>
					</View>
					<View style={{ gap: 10 }}>
						<Text
							style={[
								styles.mdText,
								{
									fontWeight: '700',
									color: colorScheme === 'light' ? '#594E59' : '#978E97',
								},
							]}
						>
							Linki z naszymi informacjami prawnymi:
						</Text>
						<View
							style={[
								styles.box,
								{
									backgroundColor:
										colorScheme === 'light' ? '#F0EEF0' : '#171017',
								},
							]}
						>
							{ourLinks.map((link, index) => (
								<Webview key={index} linkName={link.name} uri={link.link} />
							))}
						</View>
					</View>
				</View>
			</View>
		</ImageBackground>
	);
};
const styles = StyleSheet.create({
	background: {
		paddingTop: 20,
		flex: 1,
	},
	container: {
		padding: 20,
		alignItems: 'center',
	},
	mdText: {
		fontFamily: 'Roboto',
		fontSize: 14,
		fontStyle: 'normal',
		lineHeight: 20,
	},
	box: {
		width: 340,
		borderRadius: 7.5,
		padding: 10,
		gap: 10,
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
});

export default Administration;
