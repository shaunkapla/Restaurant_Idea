import React, { useState } from "react";
import { View, Text, Modal, ScrollView, StyleSheet, Pressable, TextInput, Alert, FlatList } from "react-native";

const AddPinModal = ({ onAddPin, setModalDisplay }) => {
  const [journalData, setJournalData] = useState({
    placeName: '',
    address: '',
    lat: '',
    lng: '',
    rating: '',
    food: '',
    drinks: '',
    cuisine: '',
    notes: '',
    website: '',
  });
  const [addressOptions, setAddressOptions] = useState([]);
  const [addressSelectionVisible, setAddressSelectionVisible] = useState(false);

  const handleInputChange = (name, value) => {
    setJournalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressSelect = (selectedAddress) => {
    const selectedOption = addressOptions.find(
      (option) => option.display_name === selectedAddress
    );
    if (selectedOption) {
      const { lat, lon, display_name } = selectedOption;
      setJournalData((prevData) => ({
        ...prevData,
        address: display_name,
        lat,
        lng: lon,
      }));
      setAddressSelectionVisible(false);
    }
  };  

  const fetchLatLng = async (address = journalData.address) => {
    if (!address) {
      Alert.alert("Error", "Please enter an address.");
      return;
    }
  
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
      );
  
      const data = await response.json();
      if (data.length === 1) {
        const { lat, lon, display_name } = data[0];
        setJournalData((prevData) => ({
          ...prevData,
          address: display_name,
          lat,
          lng: lon,
        }));
        Alert.alert("Success", "Latitude and Longitude retrieved successfully.");
      } else if (data.length > 1) {
          setAddressOptions(data);
          setAddressSelectionVisible(true);
      } else {
          Alert.alert("No Results", "No coordinates found for the entered address.");
      }
    } catch (error) {
        Alert.alert("Error", "Failed to fetch coordinates. Please try again later.");
        console.error(error);
    }
  };  

  const handleSubmit = () => {
    if (onAddPin && typeof onAddPin === 'function') {
      const newPin = {
        latitude: parseFloat(journalData.lat),
        longitude: parseFloat(journalData.lng),
        title: journalData.placeName,
        address: journalData.address,
        cuisine: journalData.cuisine,
        rating: journalData.rating,
        notes: journalData.notes,
      };
      console.log("Journal Data:", journalData);
      onAddPin(newPin);
      setJournalData({
        placeName: '',
        address: '',
        lat: '',
        lng: '',
        rating: '',
        food: '',
        drinks: '',
        cuisine: '',
        notes: '',
      });
    } else {
      console.error('onAddPin is not a function');
    }
  };

  const handleClose = () => {
    setModalDisplay(false);
  };

  return (
    <View>
      <Modal
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.title}>Add Pin Details</Text>

              <Text style={styles.text}>Place Name</Text>
              <TextInput
                style={styles.input}
                value={journalData.placeName}
                onChangeText={(text) => handleInputChange("placeName", text)}
              />

              <Text style={styles.text}>Address</Text>
              <TextInput
                style={styles.input}
                value={journalData.address}
                onChangeText={(text) => handleInputChange("address", text)}
                onBlur={() => fetchLatLng()}
              />

              <Text style={styles.text}>Latitude</Text>
              <TextInput
                style={styles.input}
                value={journalData.lat}
                editable={false}
              />

              <Text style={styles.text}>Longitude</Text>
              <TextInput
                style={styles.input}
                value={journalData.lng}
                editable={false}
              />

              <Text style={styles.text}>Cuisine</Text>
              <TextInput
                style={styles.input}
                value={journalData.cuisine}
                onChangeText={(text) => handleInputChange("cuisine", text)}
              />

              <Text style={styles.text}>Rating</Text>
              <TextInput
                style={styles.input}
                value={journalData.rating}
                onChangeText={(text) => handleInputChange("rating", text)}
                keyboardType="numeric"
              />

              <Text style={styles.text}>Notes</Text>
              <TextInput
                style={styles.input}
                value={journalData.notes}
                onChangeText={(text) => handleInputChange("notes", text)}
                multiline
              />

              <Pressable style={styles.closeButton} onPress={handleSubmit}>
                <Text style={styles.closeButtonText}>Submit</Text>
              </Pressable>
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={addressSelectionVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAddressSelectionVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Select Address</Text>
            <FlatList
              data={addressOptions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleAddressSelect(item.display_name)}
                  style={styles.addressOption}
                >
                  <Text>{item.display_name}</Text>
                </Pressable>
              )}
            />
            <Pressable style={styles.closeButton} onPress={() => setAddressSelectionVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  addressOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AddPinModal;
