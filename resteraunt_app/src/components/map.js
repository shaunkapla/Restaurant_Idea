import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = ({ location }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={false}
        region={location}
      >
        <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="Location" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;
