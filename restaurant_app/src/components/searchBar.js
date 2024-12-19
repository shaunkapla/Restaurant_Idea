import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchDropdown = ({ options, onOptionSelected }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);

  const filterOptions = (text) => {
    setSearchText(text);

    const filteredCities = options.filter((option) =>
      option.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOptions(filteredCities);

    setShowOptions(text.length > 0 && filteredCities.length > 0);
  };

  const onOptionPress = (option) => {
    setSearchText(''); 
    onOptionSelected(option); 
    setShowOptions(false); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={searchText}
        onChangeText={filterOptions}
        placeholder="Search"
        style={styles.searchInput}
      />
      {showOptions && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={filteredOptions}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onOptionPress(item)}
                style={styles.option}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.name}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  searchInput: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 200,
    marginTop: 10,
    position: 'absolute',
    top: 40, 
    left: 0,
    right: 0,
    zIndex: 10,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SearchDropdown;
