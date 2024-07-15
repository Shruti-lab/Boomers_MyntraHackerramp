import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';

const InputPage = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleAnim]);

  const handleLogin = (role) => {
    if (role === 'designer') {
      navigation.navigate('Login');
    } else if (role === 'customer') {
      navigation.navigate('CustomerLogin');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoImage}>
        <Animated.Image 
          source={require('../assets/logo.png')}
          style={[styles.logo, { transform: [{ scale: scaleAnim }] }]} 
        />
      </View>
      <Text style={styles.title}>Welcome to Myntra!</Text>
      <View style={styles.frontImageContainer2}>
        <View style={styles.frontImageContainer}>
          <Image 
            source={require('../assets/MyntraAdd.png')}
            style={styles.imageView} 
          />
        </View>
      </View>
      <Text style={styles.subtitle}>Are you a Customer or a Designer?</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionCard} onPress={() => handleLogin('customer')}>
          <Text style={styles.optionText}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionCard} onPress={() => handleLogin('designer')}>
          <Text style={styles.optionText}>Designer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frontImageContainer2: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageView: {
    width: 320,
    height: 210,
    resizeMode: 'stretch',
    borderColor: 'black'
  },
  frontImageContainer: {
    marginBottom: 40,
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 4,
    borderColor: '#996515',
    overflow: 'hidden',
    borderRadius: 14,
    shadowOpacity: 50,
    shadowOffset: 50,
    elevation: 10,
    shadowColor: '#000000',
    shadowRadius: 12,
    width: 320,
    height: 210,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,

  },
  logo: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  optionCard: {
    backgroundColor: '#ff4468',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: '40%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default InputPage;
