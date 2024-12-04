import React from 'react';
import { Appbar } from 'react-native-paper';

const Header = () => {
  const handleMorePress = () => console.log('More');
  const handleProfilePress = () => console.log('Profile');
  return (
    <Appbar.Header style={{ backgroundColor: 'transparent' }}>
      <Appbar.Action icon="format-list-bulleted" onPress={handleMorePress} color="white" />
      <Appbar.Content title="Map Journal" titleStyle={{ color: 'white' }} />
      <Appbar.Action icon="account-circle" onPress={handleProfilePress} color="white" />
    </Appbar.Header>
  );
};

export default Header;