import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const InputPage = ({ navigation }) => {
  const handleLogin = (role) => {
    if (role === 'designer') {
      navigation.navigate('Login');
    } else if (role === 'customer') {
      navigation.navigate('CustomerLogin');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Want to Join in as...</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionCard} onPress={() => handleLogin('designer')}>
          <Text style={styles.optionText}>Designer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionCard} onPress={() => handleLogin('customer')}>
          <Text style={styles.optionText}>Customer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  optionCard: {
    backgroundColor: '#fff',
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
  },
});

export default InputPage;
