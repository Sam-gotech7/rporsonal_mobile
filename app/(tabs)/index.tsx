import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from '../../components/CustomButton';
import useUrlStore from '@/store/urlStore';
import { useRouter } from 'expo-router';

const HomeScreen: React.FC = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const { url, setUrl } = useUrlStore();
  const router = useRouter();

  const fetchLocations = async () => {
    try {
      const res = await fetch(
        'https://redeetech.com/api/method/redeegym.api.get_gym_location_with_url'
      );
      const data = await res.json();
      const formattedLocations = data.message.map((location: any) => ({
        label: location.label,
        value: location.value,
        ...location,
      }));
      setLocations(formattedLocations);
      setFilteredLocations(formattedLocations);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = locations.filter((location:any) =>
      location.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
    setSearchQuery(location.label);
  };

  const handleLocationSubmit = () => {
    console.log('Selected Location:', selectedLocation);
    if (selectedLocation) {
      let nurl = selectedLocation?.config?.base_url || '';
      console.log(nurl);
      setUrl(nurl);
      router.push('/(tabs)/webview');
    }
    setModalVisible(false);
  };

  const handlePress = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Image
            source={require('@/assets/new-logo-white.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Image
            source={require('@/assets/cards.png')}
            style={styles.cardsImage}
            resizeMode="contain"
          />
          <View style={styles.titleView}>
            <Text style={styles.titleText}>
              Unleash Your {'\n'}Potential with{' '}
              <Text style={styles.titleTextSecondary}>R-Personal</Text>
            </Text>
            <Image
              source={require('@/assets/path.png')}
              style={styles.pathImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.subtitleText}>
            Where Strength Meets Transformation: Embark on a Journey of Unbounded Fitness with Move
            Application
          </Text>
          <CustomButton
            isLoading={false}
            title="Continue with Login"
            handlePress={handlePress}
            containerStyles={styles.getStartedButton}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Your Location</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a location..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <FlatList
            data={filteredLocations}
            keyExtractor={(item:any) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.locationItem,
                  selectedLocation?.value === item.value && styles.selectedLocationItem,
                ]}
                onPress={() => handleLocationSelect(item)}
              >
                <Text style={styles.locationText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.noResultsText}>No locations found.</Text>}
            style={styles.locationList}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleLocationSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#161622',
    height: '100%',
  },
  scrollViewContent: {
    height: '100%',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16,
  },
  logoImage: {
    width: 130,
    height: 84,
  },
  cardsImage: {
    maxWidth: 380,
    width: '100%',
    height: 298,
  },
  titleView: {
    marginTop: 20,
    position: 'relative',
  },
  titleText: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleTextSecondary: {
    color: '#4ECDC4',
  },
  pathImage: {
    width: 136,
    height: 15,
    position: 'absolute',
    bottom: -2,
    right: -8,
  },
  subtitleText: {
    fontSize: 14,
    color: '#f8f8f8',
    marginTop: 28,
    textAlign: 'center',
  },
  getStartedButton: {
    width: '100%',
    marginTop: 28,
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  locationList: {
    width: '100%',
    maxHeight: 200,
  },
  locationItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedLocationItem: {
    backgroundColor: '#E0F7F3',
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  noResultsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
