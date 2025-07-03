import { useState, useContext } from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { TouchableOpacity, View, Pressable, Text } from 'react-native';
import TopNav from '../../components/topNav';
import { ThemeContext } from '../_layout';

const CustomTabBarButton = ({ children, onPress }: any) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={1}
			style={{
				top: -20,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<View
				style={{
					width: 100,
					height: 100,
					borderRadius: 50,
				}}
			>
				{children}
			</View>
		</TouchableOpacity>
	);
};
const InvisibleTabBarButton = ({ children, onPress }: any) => {
	return <View style={{ display: 'none' }}></View>;
};

export default function TabLayout() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { colorScheme } = useContext(ThemeContext);

	return (
		<View style={{ flex: 1 }}>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					headerShown: true,
					headerStyle: {
						backgroundColor: colorScheme === 'light' ? '#8D0808' : '#E74333',
					},
					headerTitleAlign: 'center',
					headerTitleStyle: {
						color: colorScheme === 'light' ? '#CCF0FF' : '#062D3D',
						fontSize: 20,
						fontFamily: 'RobotoBold',
						fontWeight: '800',
					},
					headerLeft: () => {
						return (
							<View
								style={{
									marginLeft: 10,
									alignItems: 'center',
									flexDirection: 'row',
									gap: 5,
								}}
							>
								<Text
									style={{
										color: colorScheme === 'light' ? '#CCF0FF' : '#171017',
										fontFamily: 'Roboto',
										fontSize: 20,
										fontStyle: 'normal',
										fontWeight: '800',
										lineHeight: 26,
										textAlign: 'center',
									}}
								>
									E-Konfident
								</Text>
								<FontAwesome
									name="search"
									color={colorScheme === 'light' ? '#CCF0FF' : '#171017'}
									size={20}
								/>
							</View>
						);
					},
					headerRight: () => {
						return (
							<Pressable onPress={() => setIsModalOpen(!isModalOpen)}>
								<Feather
									name={isModalOpen ? 'x' : 'more-vertical'}
									size={32}
									color={colorScheme === 'light' ? '#CCF0FF' : '#171017'}
									style={{ marginRight: 10 }}
								/>
							</Pressable>
						);
					},
					tabBarStyle: {
						backgroundColor: colorScheme === 'light' ? '#F0EEF0' : '#171017',
						borderColor: colorScheme === 'light' ? '#F0EEF0' : '#171017',
					},
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: '',
						tabBarIcon: ({ focused }) => (
							<Feather
								name="file-text"
								size={32}
								color={
									focused && colorScheme === 'light'
										? '#8D0808'
										: colorScheme === 'light'
										? '#0877A6'
										: focused && colorScheme === 'dark'
										? '#E74333'
										: '#33B1E7'
								}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="add"
					options={{
						title: 'NOWA SPRAWA',
						tabBarIcon: ({ focused }) => (
							<Feather
								name="plus-circle"
								size={70}
								color={
									focused && colorScheme === 'light'
										? '#8D0808'
										: colorScheme === 'light'
										? '#0877A6'
										: focused && colorScheme === 'dark'
										? '#E74333'
										: '#33B1E7'
								}
							/>
						),
						tabBarIconStyle: {
							backgroundColor: colorScheme === 'light' ? '#F0EEF0' : '#171017',
							borderRadius: 50,
						},
						tabBarButton: (props) => <CustomTabBarButton {...props} />,
					}}
				/>
				<Tabs.Screen
					name="account"
					options={{
						title: 'REJESTRACJA',
						tabBarIcon: ({ focused }) => (
							<Feather
								name="user"
								size={32}
								color={
									focused && colorScheme === 'light'
										? '#8D0808'
										: colorScheme === 'light'
										? '#0877A6'
										: focused && colorScheme === 'dark'
										? '#E74333'
										: '#33B1E7'
								}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="myAcc"
					options={{
						title: 'MOJE KONTO',
						tabBarButton: (props) => <InvisibleTabBarButton {...props} />,
					}}
				/>
				<Tabs.Screen
					name="faq"
					options={{
						title: 'FAQ',
						tabBarButton: (props) => <InvisibleTabBarButton {...props} />,
					}}
				/>
				<Tabs.Screen
					name="legalInfo"
					options={{
						title: 'INFORMACJE PRAWNE',
						tabBarButton: (props) => <InvisibleTabBarButton {...props} />,
					}}
				/>
				<Tabs.Screen
					name="administration"
					options={{
						title: 'ADMINISTRACJA',
						tabBarButton: (props) => <InvisibleTabBarButton {...props} />,
					}}
				/>
				<Tabs.Screen
					name="changePassword"
					options={{
						title: 'ZMIEŃ HASŁO',
						tabBarButton: (props) => <InvisibleTabBarButton {...props} />,
					}}
				/>
				<Tabs.Screen
					name="modifyData"
					options={{
						title: 'ZMODYFIKUJ DANE',
						tabBarButton: (props) => <InvisibleTabBarButton {...props} />,
					}}
				/>
				<Tabs.Screen
					name="showData"
					options={{
						title: 'POKAŻ DANE',
						tabBarButton: (props) => <InvisibleTabBarButton {...props} />,
					}}
				/>
			</Tabs>
			{isModalOpen && <TopNav />}
		</View>
	);
}
