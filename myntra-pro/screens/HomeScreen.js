import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <View style ={styles.images}>
        <View style={styles.imageContainer}>
            <Image
            source = {require('../assets/logo.png')}
            style ={styles.logo}
            />
        </View>
        <View style={styles.frontImageContainer}>
            <Image
            source={require('../assets/frontPage.png')}
                style={styles.frontImage}
                />
            
        </View>
        </View>
     
     
      <View style ={styles.customer}>
      <TouchableOpacity style={styles.buttonCustomer} onPress={() => console.log('Customer pressed')}>
      <Button color="#ff4468" title ="Customer" style={styles.buttonCustomer} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDesigner} onPress={() => console.log('Designer pressed')}>
        <Button color="#ff4468" title ="Designer" style={styles.buttonCustomer} />
        </TouchableOpacity> 
      </View>
    
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      <View style={styles.buttonContainer}>
        <Button color="#ff4468" title="Login" onPress={() => navigation.navigate('Design')} />
      </View>
      <Text style={styles.textSmall}>Don't have an account?</Text>
      <View style={styles.registerButton}>
      <Button color="#ff4468" title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    images: {
        position:'absolute',
        top: 20,
        left: 20,
        marginBottom: 30

    },

    customer:{
        flexDirection: 'row',
        marginBottom: 20,
        width: '170',
        marginTop: 100
    },

    buttonCustomer: {
        // Background color of Customer button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
         // Adjust spacing between buttons
      },
      buttonDesigner: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
    
    frontImage:{
        width: 400,
        height: 200,
        resizeMode: 'contain',
    },
    imageContainer: {
     
      },
      logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
      },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:"white"
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
  },
  registerButton:{
    marginTop: 10,
    width: '80%'
  }
});

export default HomeScreen;
