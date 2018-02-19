import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    height: 1,
    width: '100%',
    backgroundColor: '#C1C9D3',
    marginVertical: 2,
  },
});

export default function Divider() {
  return <View style={styles.root} />;
}
