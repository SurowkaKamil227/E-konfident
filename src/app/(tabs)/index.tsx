import { useContext, useEffect, useState, useCallback } from 'react';
import { StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { ThemeContext } from '../_layout';
import { Status, SearchBar } from '../../components';
import { useFocusEffect } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { db, auth } from "../../lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";


export default function Cases() {
	const { colorScheme } = useContext(ThemeContext);

	const [reports, setReports] = useState<any[]>([]);
const [loading, setLoading] = useState(false);

const loadReports = async () => {
  try {
    setLoading(true);

    const uid = auth.currentUser?.uid;
    if (!uid) {
      setReports([]);
      return;
    }

    const q = query(
      collection(db, "reports"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );

    const snap = await getDocs(q);

    const data = snap.docs.map((d) => ({
      id: d.id, // Firestore ID dokumentu
      ...d.data(),
    }));

    setReports(data);
  } catch (e) {
    console.log("Błąd pobierania reports", e);
    setReports([]);
  } finally {
    setLoading(false);
  }
};


useFocusEffect(
  useCallback(() => {
    loadReports();
  }, [])
);




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
					<Animated.Text>
  {loading ? "Ładowanie..." : `Zgłoszeń: ${reports.length}`}
</Animated.Text>

					{reports.map((r) => (
  <Status
    key={r.id}
    iconName="more-horizontal"
    bgColor="#16AAEA"
    textColor="#16AAEA"
    statusText={`${r.status ?? "przyjęte"} • ID: ${r.id}`}
  />
))}

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
