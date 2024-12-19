import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View, TouchableWithoutFeedback, Dimensions, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import AddPinModal from '../components/pinDown';

// Getting the screen dimensions that I need
const { width, height } = Dimensions.get('window'); 

const MoreItems = ({ onClose, onAddPin }) => {
  const [modalDisplayed, setModalDisplay] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    // Slide in animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 450,
      useNativeDriver: false,
    }).start();
  }, [slideAnim]);

  const closeDrawer = () => {
    // Slide out animation
    Animated.timing(slideAnim, {
      toValue: -width, 
      duration: 450,
      useNativeDriver: false,
    }).start(() => {
      onClose(); 
    });
  };

  const handleOutsideClick = () => {
    closeDrawer(); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.contentContainer}>
          <Button icon="book-plus" onPress={() => setModalDisplay(true)} style={styles.journalEntryButton}>Add Entry</Button>
          {modalDisplayed && (
            <AddPinModal 
              onAddPin={(newPin) => {
                onAddPin(newPin);
                setModalDisplay(false);
              }} 
              setModalDisplay={setModalDisplay}
            />
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000, 
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 900,
  },
  drawer: {
    position: 'absolute',
    top: 0, 
    left: 0,
    width: width / 2, 
    height: height, 
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
    zIndex: 1001,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  journalEntryButton: {
    borderColor: 'light blue', 
    borderRadius: 15, 
    borderWidth: 2,
    marginBottom: 3,
  },
});

export default MoreItems;
