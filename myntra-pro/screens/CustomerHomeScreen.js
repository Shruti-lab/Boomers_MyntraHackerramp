import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function CustomerHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Tailor App</Text>
      <Button
        title="Customer Home"
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default CustomerHomeScreen;
