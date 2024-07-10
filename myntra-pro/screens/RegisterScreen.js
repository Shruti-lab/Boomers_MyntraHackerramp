import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register</Text>
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} />
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={() => navigation.navigate('Home')} />
      </View>
      <Text style={styles.textSmall}>Already have an account?</Text>
      <Button title="Login" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text: {
    fontSize: 30,
    color: "blue",
    textShadowColor: "blue",
    textShadowRadius: 15,
    elevation: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  textSmall: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center'
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%'
  }
});

export default RegisterScreen;
