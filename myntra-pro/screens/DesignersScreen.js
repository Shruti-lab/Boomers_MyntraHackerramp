import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function DesignersScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Designers Screen</Text>
      <Text>Here designers will receive notifications about new orders.</Text>
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

export default DesignersScreen;
