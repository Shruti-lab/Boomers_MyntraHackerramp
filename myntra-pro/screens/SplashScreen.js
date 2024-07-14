import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

function SplashScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request or some async task
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('InputPage'); // Navigate to the Login screen after the delay
    }, 1500); // 3 seconds delay
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ff4468" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
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
  imageContainer: {
    position: 'absolute',
    top: 10,
    left: 20,
    marginBottom: 0,
    marginTop:20
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  
  loaderContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  }
});

export default SplashScreen;
