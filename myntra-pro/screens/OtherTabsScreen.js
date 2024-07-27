import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

function OtherTabsScreen({ navigation }) {
 
  return (
    <View style={styles.container}>
      <Text>Other tabs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: "white",
    justifyContent: 'center', // Center the content vertically
  },
 
});

export default OtherTabsScreen;
