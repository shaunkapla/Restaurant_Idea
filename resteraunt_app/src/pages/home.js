import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapComponent from '../components/map';
import ProfileDrawer from '../components/profileDrawer';
import MoreItems from '../components/moreItemsDrawer';
import cityOptions from '../data/cities';
import { getLocationFromCity } from '../utils/locationUtils';
import HeaderWithSearch from '../components/headerWithSearch';
import handlePins from '../hooks/handlePins';

const HomePage = () => {
  const [isProfileDrawerVisible, setProfileDrawerVisible] = useState(false);
  const [isMoreDrawerVisible, setMoreDrawerVisible] = useState(false);
  const [location, setLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const { pins, addPin } = handlePins();

  const handleCitySelected = (city) => {
    console.log("Selected Location", city.name)
    setLocation(getLocationFromCity(city))
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderWithSearch
          onProfilePress={() => setProfileDrawerVisible(true)}
          onMorePress={() => setMoreDrawerVisible(true)}
          searchOptions={cityOptions}
          onSearchOptionSelected={handleCitySelected}
        />
      </View>

      <View style={styles.mapContainer}>
        <MapComponent location={location} pins={pins} />
      </View>

      {isProfileDrawerVisible && (
        <ProfileDrawer onClose={() => setProfileDrawerVisible(false)} />
      )}

      {isMoreDrawerVisible && (
        <MoreItems onClose={() => setMoreDrawerVisible(false)} onAddPin={addPin}/>
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
