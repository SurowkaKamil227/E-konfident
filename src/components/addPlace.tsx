import { useState } from 'react';
import { View } from 'react-native';
import AddToForm from './addToForm';

const AddPlace = () => {
	const [showOptions, setShowOptions] = useState(false);
	const [place, setPlace] = useState('');
	const [places, setPlaces] = useState([]);

	const handlePress = () => {
		setShowOptions(true);
		setPlaces([...places, place]);
	};

	const handleDelete = () => {
		setPlaces(places.slice(0, -1));
		if (places.length === 1) {
			setShowOptions(false);
		}
	};

	return (
		<View>
			<AddToForm
				showOptions={showOptions}
				setShowOptions={setShowOptions}
				option={place}
				setOption={setPlace}
				options={places}
				setOptions={setPlaces}
				firstButtonText="Dodaj miejsce zdarzenia"
				secondButtonText="Usuń miejsce zdarzenia"
				firstLabel="Krótki opis miejsca zdarzenia"
				secondLabel="Miasto miejsca zdarzenia"
				thirdLabel="Ulica miejsca zdarzenia"
				fourthLabel="Kod pocztowy miejsca zdarzenia"
				type="place"
			/>
		</View>
	);
};

export default AddPlace;
