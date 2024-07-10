import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function TailorResponseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Tailor Response Screen</Text>
      <Text>Users will receive notifications about fees from different tailors here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TailorResponseScreen;
