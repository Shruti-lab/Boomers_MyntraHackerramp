// screens/DesignerProfileFormScreen.js
import React, { useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet ,Image, TouchableOpacity} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ProfileFormScreen = () => {
  const [value, setValue] = useState(0);
  return (
    <View style ={styles.container}>
      <View style={styles.myntraInsider}>
        <View style={styles.logoImage}>
        <Image 
        source={require('../assets/myntraIcon.png')}
        style ={styles.logo} />
        </View>
        <View style={styles.myntraTextContainer}>
        <Text source={require('../assets/myntraInsider.png')} style={styles.myntraText}>Login Form</Text>
        </View>

        </View>
      
      <View style={styles.inputContainer}>
        <TextInput placeholder="Enter Name" style={styles.textInput}/>
        <TextInput
          placeholder="Enter DOB"
          style={styles.textInput}
        />
        <TextInput
          placeholder="Enter Qualification in designing(if any)"
          style={styles.textInput}
        />
        <TextInput
          placeholder="Enter designing experience (in years)"
          style={styles.textInput}
        />
        <TextInput
          placeholder="Enter Field of Expertise"
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('DesignerPage')}>
          <Button title="Submit" color="#ff4468" width ="150"  />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton:{
    width:120,
    marginBottom:20,
    marginTop:7
  },
  myntraTextContainer:{
    alignItems:'center',
    width:'80%',
    

  },

  logo: {
    width: 35,
    height: 30,
    resizeMode: 'contain',
  },
  myntraImage:{
    paddingTop:10,
    width:60,
    height:60,
    resizeMode:'contain',
    
},
myntraText:{
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 4,
    color: '',
    top:0

},
myntraInsider:{
    marginTop:30,
    flexDirection:'row',
    borderWidth:2,
    borderColor:'#ff5868',
    borderRadius:4,
    marginBottom:20,
    height:45,
    alignItems:'center',
    width:'100%',
    backgroundColor:'white'
    

},
  headingContainer:{
    alignItems:'center',
    width:'100%',
  },

  heading:{
    fontSize:30,
    fontStyle:'normal',
    fontWeight:'bold',
    color:'#ff4468',
    alignContent:'center',
   
    alignItems:'center',
    marginTop:20,
    marginBottom:30
  },
  inputContainer:{
    alignItems:'center',
    elevation:10,
    shadowColor:'#838383',
    paddingTop:15,
    padding:10,
    width:'100%',
    backgroundColor:'white',
  },
  textInput:{
    fontSize:15,
    borderWidth:2,
    borderColor:'#d3d3d3',
    padding:5,
    marginTop:10,
    borderRadius:8,
    marginBottom:20,
    width:'95%',
    height:50,
    backgroundColor:'white',
    color:'white'
    


  },
  container: {
    padding: 20,
    backgroundColor:'#fff4f2',
    height:'100%'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
});

export default ProfileFormScreen;