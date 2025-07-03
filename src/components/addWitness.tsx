import { useState } from 'react';
import { View } from 'react-native';
import AddToForm from './addToForm';

const AddWitness = () => {
	const [showOptions, setShowOptions] = useState(false);
	const [witness, setWitness] = useState('');
	const [witnesses, setWitnesses] = useState([]);

	return (
		<View>
			<AddToForm
				showOptions={showOptions}
				setShowOptions={setShowOptions}
				option={witness}
				setOption={setWitness}
				options={witnesses}
				setOptions={setWitnesses}
				firstButtonText="Dodaj świadka"
				secondButtonText="Usuń świadka"
				firstLabel="Imię / Imiona świadka"
				secondLabel="Nazwisko świadka"
				thirdLabel="Numer telefonu świadka"
			/>
		</View>
	);
};

export default AddWitness;
