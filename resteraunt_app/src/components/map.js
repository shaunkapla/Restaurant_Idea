import React from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const screenWidth = Dimensions.get('window').width;

const MapComponent = ({ location, pins }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={false}
        region={location}
      >
        {pins.map((pin, index) => {
          return (
            <Marker
              key={index}
              coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <ScrollView style={styles.calloutContent}>
                    <Text style={styles.calloutTitle}>{pin.title}</Text>
                    {pin.address && (
                      <Text style={styles.calloutRow}>
                        <Text style={styles.calloutLabel}>Address: </Text>
                        <Text style={styles.calloutValue}>{pin.address}</Text>
                      </Text>
                    )}
                    {pin.rating && (
                      <Text style={styles.calloutRow}>
                        <Text style={styles.calloutLabel}>Rating: </Text>
                        <Text style={styles.calloutValue}>{pin.rating} / 10</Text>
                      </Text>
                    )}
                    {pin.food && (
                      <Text style={styles.calloutRow}>
                        <Text style={styles.calloutLabel}>Food: </Text>
                        <Text style={styles.calloutValue}>{pin.food}</Text>
                      </Text>
                    )}
                    {pin.drinks && (
                      <Text style={styles.calloutRow}>
                        <Text style={styles.calloutLabel}>Drinks: </Text>
                        <Text style={styles.calloutValue}>{pin.drinks}</Text>
                      </Text>
                    )}
                    {pin.cuisine && (
                      <Text style={styles.calloutRow}>
                        <Text style={styles.calloutLabel}>Cuisine: </Text>
                        <Text style={styles.calloutValue}>{pin.cuisine}</Text>
                      </Text>
                    )}
                    {pin.notes && (
                      <Text style={styles.calloutRow}>
                        <Text style={styles.calloutLabel}>Notes: </Text>
                        <Text style={styles.calloutValue}>{pin.notes}</Text>
                      </Text>
                    )}
                  </ScrollView>
                </View>
              </Callout>
            </Marker>
          );
        })}
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
  calloutContainer: {
    width: screenWidth * 0.9,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  calloutContent: {
    padding: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
  },
  calloutRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  calloutLabel: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginRight: 5,
  },
  calloutValue: {
    fontSize: 14,
    color: '#555',
  },
});

export default MapComponent;
