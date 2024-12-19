export const getLocationFromCity = (city) => ({
    latitude: city.latitude,
    longitude: city.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });