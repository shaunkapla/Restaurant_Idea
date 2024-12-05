import React from 'react';
import { Appbar } from 'react-native-paper';

const Header = ({ onProfilePress, onMorePress }) => {
  return (
    <Appbar.Header style={{ backgroundColor: 'transparent' }}>
      <Appbar.Action icon="format-list-bulleted" onPress={onMorePress} color="white" />
      <Appbar.Content title="Map Journal" titleStyle={{ color: 'white' }} />
      <Appbar.Action icon="account-circle" onPress={onProfilePress} color="white" />
    </Appbar.Header>
  );
};

export default Header;