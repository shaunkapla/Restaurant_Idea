import React, { useState } from "react";
import { View, Text, Modal, ScrollView, StyleSheet, Pressable, TextInput } from "react-native";
import { Button } from "react-native-paper";

const AddJournalComponent = () => {
  const [visible, setVisible] = useState(false);
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

  const toggleModal = () => {
    setVisible(!visible);
  };

  const handleInputChange = (name, value) => {
    setJournalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Journal Data:", journalData);  // You can replace this with your actual submission logic
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
      website: '',
    });  // Reset journal data to initial empty values
    toggleModal(); // Close the modal after submission
  };

  return (
    <View>
      <Button icon="book-plus" onPress={toggleModal} style={styles.journalEntryButton}>Add Entry</Button>
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
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
              />

              <Text style={styles.text}>Latitude</Text>
              <TextInput
                style={styles.input}
                value={journalData.lat}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("lat", text)}
              />

              <Text style={styles.text}>Longitude</Text>
              <TextInput
                style={styles.input}
                value={journalData.lng}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("lng", text)}
              />

              <Text style={styles.text}>Rating</Text>
              <TextInput
                style={styles.input}
                value={journalData.rating}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("rating", text)}
              />

              <Text style={styles.text}>Food</Text>
              <TextInput
                style={styles.input}
                value={journalData.food}
                onChangeText={(text) => handleInputChange("food", text)}
              />

              <Text style={styles.text}>Drinks</Text>
              <TextInput
                style={styles.input}
                value={journalData.drinks}
                onChangeText={(text) => handleInputChange("drinks", text)}
              />

              <Text style={styles.text}>Cuisine</Text>
              <TextInput
                style={styles.input}
                value={journalData.cuisine}
                onChangeText={(text) => handleInputChange("cuisine", text)}
              />

              <Text style={styles.text}>Notes</Text>
              <TextInput
                style={styles.input}
                value={journalData.notes}
                onChangeText={(text) => handleInputChange("notes", text)}
              />

              <Text style={styles.text}>Website</Text>
              <TextInput
                style={styles.input}
                value={journalData.website}
                onChangeText={(text) => handleInputChange("website", text)}
              />

              <Pressable style={styles.closeButton} onPress={handleSubmit}>
                <Text style={styles.closeButtonText}>Submit</Text>
              </Pressable>

            </ScrollView>
            <Pressable style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
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
  journalEntryButton: {
    borderColor: 'light blue', 
    borderRadius: 15, 
    borderWidth: 2,
    marginBottom: 3,
  },
});

export default AddJournalComponent;
