import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import SearchDropdown from './searchBar';

const HeaderWithSearch = ({ 
  onProfilePress, 
  onMorePress, 
  searchOptions, 
  onSearchOptionSelected 
}) => {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="format-list-bulleted" onPress={onMorePress} color="white" />
        <Appbar.Content title="Map Journal" titleStyle={styles.title} />
        <Appbar.Action 
          icon={searchVisible ? "close" : "magnify"} 
          onPress={toggleSearch} 
          color="white" 
        />
        <Appbar.Action icon="account-circle" onPress={onProfilePress} color="white" />
      </Appbar.Header>
      {searchVisible && (
        <View style={styles.searchContainer}>
          <SearchDropdown 
            options={searchOptions} 
            onOptionSelected={onSearchOptionSelected} 
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  header: {
    backgroundColor: 'blue',
  },
  title: {
    color: 'white',
  },
  searchContainer: {
    backgroundColor: 'blue',
    padding: 10,
  },
});

export default HeaderWithSearch;
