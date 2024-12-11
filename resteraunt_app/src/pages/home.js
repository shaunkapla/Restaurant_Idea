import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapComponent from '../components/map';
import ProfileDrawer from '../components/profileDrawer';
import MoreItems from '../components/moreItemsDrawer';
import cityOptions from '../data/cities';
import { getLocationFromCity } from '../utils/locationUtils';
import HeaderWithSearch from '../components/headerWithSearch';

const HomePage = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [isMoreVisible, setMoreVisible] = useState(false);
  const [location, setLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [pins, setPins] = useState([]);

  const handleCitySelected = (city) => {
    console.log("Selected Location", city.name)
    setLocation(getLocationFromCity(city))
  }

  const handleAddPin = (newPin) => {
    setPins((prevPins) => [...prevPins, newPin]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderWithSearch
          onProfilePress={() => setDrawerVisible(true)}
          onMorePress={() => setMoreVisible(true)}
          searchOptions={cityOptions}
          onSearchOptionSelected={handleCitySelected}
        />
      </View>

      <View style={styles.mapContainer}>
        <MapComponent location={location} pins={pins} />
      </View>

      {isDrawerVisible && (
        <ProfileDrawer onClose={() => setDrawerVisible(false)} />
      )}

      {isMoreVisible && (
        <MoreItems onClose={() => setMoreVisible(false)} onAddPin={handleAddPin}/>
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
