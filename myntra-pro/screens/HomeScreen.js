import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Myntra Extension</Text>
      <View style ={styles.login}><Button   title="Login" onPress={() => navigation.navigate('Login')} /></View>
      <View style ={styles.register}><Button  title="Register" onPress={() => navigation.navigate('Register')} /></View>
      <Button title="Design" onPress={() => navigation.navigate('Design')} />
    </View>
  );
}

const styles = StyleSheet.create({
    text:{
        fontSize: 30,
        color: "blue",
        textShadowColor: "blue",
        textShadowRadius: 15,
        elevation: 10,
        textAlign: "center"
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  login: {
    marginTop:20,
    marginBottom:20
  },
  register :{
    marginBottom:20
  }
});

export default HomeScreen;
