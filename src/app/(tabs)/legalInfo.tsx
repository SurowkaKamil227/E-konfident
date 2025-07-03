import { useContext } from 'react';
import { ImageBackground, View } from 'react-native';
import { ThemeContext } from '../_layout';
import { PickTime } from '../../components';

const LegalInfo = () => {
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
			<View style={{ alignItems: 'center', justifyContent: 'center' }}></View>
		</ImageBackground>
	);
};

export default LegalInfo;
