import { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../app/_layout';
import AddToForm from './addToForm';

const AddCulprit = () => {
	const [showOptions, setShowOptions] = useState(false);
	const [culprit, setCulprit] = useState('');
	const [culprits, setCulprits] = useState([]);

	const handlePress = () => {
		setShowOptions(true);
		setCulprits([...culprits, culprit]);
	};

	const handleDelete = () => {
		setCulprits(culprits.slice(0, -1));
		if (culprits.length === 1) {
			setShowOptions(false);
		}
	};

	return (
		<View>
			<AddToForm
				showOptions={showOptions}
				setShowOptions={setShowOptions}
				option={culprit}
				setOption={setCulprits}
				options={culprits}
				setOptions={setCulprits}
				firstButtonText="Dodaj sprawcę"
				secondButtonText="Usuń sprawcę"
				firstLabel="Imię / Imiona sprawcy"
				secondLabel="Nazwisko sprawcy"
				thirdLabel="Numer telefonu sprawcy"
			/>
		</View>
	);
};

export default AddCulprit;
