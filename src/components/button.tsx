import { StyleSheet, View, Text, Pressable } from 'react-native';

const Button = ({
	width,
	text,
	backgroundColor,
	borderColor,
	btnTextColor,
	height,
	active,
	activeBackgroundColor,
	onPress,
}: any) => {
	return (
		<Pressable
			onPress={onPress}
			style={[
				styles.btn,
				{
					width: width,
					height: height,
					backgroundColor: active ? activeBackgroundColor : backgroundColor,
					borderColor: borderColor,
				},
			]}
		>
			<Text style={[styles.text, { color: btnTextColor }]}>{text}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	btn: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 7.5,
		borderWidth: 2,
		borderStyle: 'solid',
		marginTop: 10,
		marginBottom: 10,
	},
	text: {
		fontFamily: 'Roboto',
		fontSize: 14,
		fontWeight: '700',
		fontStyle: 'normal',
		lineHeight: 20,
	},
});
export default Button;
