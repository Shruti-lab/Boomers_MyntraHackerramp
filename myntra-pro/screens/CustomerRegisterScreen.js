import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import app from '../firebaseConfig'; // Adjust the path according to your project structure

function CustomerRegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registration successful
        const user = userCredential.user;
        sendEmailVerification(user)
          .then(() => {
            Alert.alert(
              'Verification Email Sent',
              'Please check your email to verify your account before logging in.'
            );
            navigation.navigate('CustomerLogin');
          })
          .catch((error) => {
            Alert.alert(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
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
          <Button color="#ff4468" title="Customer Registration" />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Create Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <View style={styles.buttonContainer}>
        <Button color="#ff4468" title="Register" onPress={handleRegister} />
      </View>
      <Text style={styles.textSmall}>Already have an account?</Text>
      <View style={styles.registerButton}>
        <Button color="#ff4468" title="Login" onPress={() => navigation.navigate('CustomerLogin')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frontImageContainer: {
    marginTop: 40,
  },
  customer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '170',
    marginTop: 10,
  },
  buttonCustomer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
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
  imageContainer: {
    position: 'absolute',
    left: 20,
    top: 10,
    marginBottom: 0,
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
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 30,
    color: 'blue',
    textShadowColor: 'blue',
    textShadowRadius: 15,
    elevation: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textSmall: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
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
  registerButton: {
    marginTop: 10,
    width: '80%',
  },
});

export default CustomerRegisterScreen;
