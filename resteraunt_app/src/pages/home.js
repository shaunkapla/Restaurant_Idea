import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../components/header';
import MapComponent from '../components/map';
import SearchDropdown from '../components/searchBar';
import ProfileDrawer from '../components/profileDrawer'; // Import the ProfileDrawer component
import MoreItems from '../components/moreItems';

const HomePage = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false); // State to toggle drawer visibility
  const [isMoreVisible, setMoreVisible] = useState(false); // State to toggle drawer visibility
  const [location, setLocation] = useState({
    // Default location: SF
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const cityOptions = [
    { name: 'New York, NY', latitude: 40.7128, longitude: -74.0060 },
    { name: 'Denver, CO', latitude: 39.7392, longitude: -104.9903 },
    { name: 'San Francisco, CA', latitude: 37.7749, longitude: -122.4194 },
    { name: 'Miami, FL', latitude: 25.7617, longitude: -80.1918 },
    { name: 'Boston, MA', latitude: 42.3601, longitude: -71.0589 },
  ];

  const handleCitySelected = (city) => {
    console.log('Selected city:', city.name);
    setLocation({
      latitude: city.latitude,
      longitude: city.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header onProfilePress={() => setDrawerVisible(true)} onMorePress={() => setMoreVisible(true)} />
        <SearchDropdown options={cityOptions} onOptionSelected={handleCitySelected} />
      </View>

      <View style={styles.mapContainer}>
        <MapComponent location={location} />
      </View>

      {isDrawerVisible && (
        <ProfileDrawer
          onClose={() => setDrawerVisible(false)}
        />
      )}
      {isMoreVisible && (
        <MoreItems
          onClose={() => setMoreVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'blue',
    paddingBottom: 10,
    paddingHorizontal: 15,
    zIndex: 1,
  },
  mapContainer: {
    flex: 1,
  },
});

export default HomePage;
