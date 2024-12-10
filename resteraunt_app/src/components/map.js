import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = ({ location, pins }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={false}
        region={location}
      >

        {pins.map((pin, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
            title={pin.title}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;
