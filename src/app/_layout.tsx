import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useState, useEffect, createContext } from 'react';
import { ImageBackground } from 'react-native';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
	initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
		RobotoBold: require('../../assets/fonts/Roboto-Bold.ttf'),
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

export const ThemeContext = createContext<any>('light');

function RootLayoutNav() {
	const [colorScheme, setColorScheme] = useState('light');

	return (
		<ThemeContext.Provider value={{ colorScheme, setColorScheme }}>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false,
						headerTitle: '',
						statusBarColor: colorScheme === 'light' ? '#8D0808' : '#E74333',
					}}
				/>
			</Stack>
		</ThemeContext.Provider>
	);
}
