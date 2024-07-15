import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebaseConfig'; // Adjust the path according to your project structure

function CustomerLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigation.navigate('CustomerPage');
    } catch (error) {
      setLoading(false);
      console.error('Login Error: ', error);
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.frontImageContainer}>
        <Image source={require('../assets/frontPage.png')} style={styles.frontImage} />
      </View>
      <View style={styles.customer}>
        <TouchableOpacity style={styles.buttonDesigner} onPress={() => console.log('Designer pressed')}>
          <Button color="#ff4468" title="Customer Login" />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#ff4468" />
        ) : (
          <Button color="#ff4468" title="Login" onPress={handleLogin} />
        )}
      </View>
      <Text style={styles.textSmall}>Don't have an account?</Text>
      <View style={styles.registerButton}>
        <Button color="#ff4468" title="Register" onPress={() => navigation.navigate('CustomerRegister')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registerButton: {
    marginTop: 10,
    width: '80%',
  },
  buttonDesigner: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  frontImage: {
    width: 350,
    height: 210,
    resizeMode: 'stretch',
  },
  frontImageContainer: {
    marginBottom: 20,
    borderRadius: 20,
    marginTop: 50,
    borderWidth: 4,
    borderColor: '#C9C4AA',
    overflow: 'hidden',
    borderRadius: 14,
    elevation: 8,
    shadowOpacity: 0.3,
    shadowColor: 'black',
    shadowRadius: 12,
    width: 350,
    height: 210,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    left: 20,
    top: 10,
    marginBottom: 0,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});

export default CustomerLoginScreen;
