import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions, SafeAreaView } from 'react-native';
import { Button, Icon } from 'react-native-paper';

// Getting the screen dimensions that I need
const { width, height } = Dimensions.get('window'); 

const ProfileDrawer = ({ onClose }) => {
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    // Slide in animation
    Animated.timing(slideAnim, {
      toValue: width / 2, // Stop halfway
      duration: 450,
      useNativeDriver: false,
    }).start();
  }, [slideAnim]);

  const closeDrawer = () => {
    // Slide out animation
    Animated.timing(slideAnim, {
      toValue: width,
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
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon source="face-man" size={90}></Icon>
            <Text>Your Name Here</Text>
          </View>
          <View style={styles.profileBody}>
            <View style={styles.profileContent}>
              <Text style={styles.title}>Username</Text>
              <Text>My Username</Text>
            </View>
            <View style={styles.profileContent}>
              <Text style={styles.title}>Friends</Text>
              <Text style={styles.numBox}>20</Text>
            </View>
            <View style={styles.profileContent}>
              <Text style={styles.title}>Email</Text>
              <Text>My Email</Text>
            </View>
            <View style={styles.profileContent}>
              <Text style={styles.title}>Number of Journal Entries</Text>
              <Text style={styles.numBox}>20</Text>
            </View>
          </View>
          <Button icon="account-edit-outline" onPress={()=> console.log("edit")} style={styles.logoutButton}>Edit Profile</Button>
          <Button icon="logout" onPress={()=> console.log("Log out")} style={styles.logoutButton}>Log Out</Button>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  logoutButton: {
    borderColor: 'light blue', 
    borderRadius: 15, 
    borderWidth: 2,
    marginBottom: 3,
  },
  profileBody: {
    flex: 1,
    justifyContent: 'center', // Collapse the items closer together
    alignItems: 'center',
  },
  profileContent: {
    paddingBottom: 30,
    alignItems: 'center',
    marginBottom: 5, // Adds space between profileContent views
  },
  numBox: {
    backgroundColor: '#ADD8E6',  // Light blue background
    borderRadius: 12,            // Slightly rounded corners for a soft feel
    borderWidth: 2,              // Thin border
    borderColor: '#87CEEB',      // Light blue border that matches the background
    fontFamily: 'Roboto',         // Crisp, modern font
    fontSize: 30,                // Large font size for prominence
    fontWeight: 'bold',          // Bold to make it stand out
    color: '#FFFFFF',            // White text for good contrast
    textAlign: 'center',         // Center text horizontally
    letterSpacing: 1,            // Slight spacing for a clean look
    paddingVertical: 12,         // Padding for height
    paddingHorizontal: 16,       // Padding for width
    shadowColor: 'rgba(0, 0, 0, 0.1)',  // Light shadow for a soft 3D effect
    shadowOffset: { width: 0, height: 4 }, // Subtle shadow effect
    shadowRadius: 6,             // Soft shadow edges
    shadowOpacity: 0.15,         // Subtle shadow opacity
    elevation: 4,                // Small elevation for Android devices
  },
});

export default ProfileDrawer;
