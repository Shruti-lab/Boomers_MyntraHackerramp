import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image} from 'react-native';

function DesignerHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style ={styles.header}>
      <View style={styles.logoImage}>
        <Image 
        source={require('../assets/logo.png')}
        style ={styles.logo} />
      </View>
      <Text style ={styles.designerText} >Welcome,</Text>
      </View>
      <View style={styles.frontImageContainer}>
        <Image 
        source={require('../assets/designerFrontImage.png')}
        style ={styles.imageView} />
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/profileIcon.png')} style={styles.icon} />
          <Text style={styles.boxText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('PendingOrders')}>
          <Image source={require('../assets/pendingOrdersIcon.png')} style={styles.icon} />
          <Text style={styles.boxText}>Pending Orders</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('NewOrders')}>
          <Image source={require('../assets/newOrderIcon.png')} style={styles.icon} />
          <Text style={styles.boxText}>New Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Settings')}>
          <Image source={require('../assets/settingsIcon.png')} style={styles.icon} />
          <Text style={styles.boxText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({

  icon:{

  },

  logoImage:{
    alignItems:"flex-start",
    paddingStart: 5
  },

  imageView:{
    width: 345,
    height: 240,
    resizeMode: 'stretch',
   borderColor:'black'

  },
  container: {
    flex: 1,
    justifyContent:'flex-end',
    paddingBottom:100,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  box: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor:'black',
    elevation: 5,
    padding: 2,
    
  },
  boxText: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10, 
    borderRadius:20,
    elevation: 5
    // Adjust this to control the spacing between icon and text
  },

  frontImageContainer:{
    marginBottom:20,
    borderRadius: 20,
    marginTop:20,
    borderWidth: 4,
    borderColor: '#D3D3D3',
    overflow: 'hidden',
    borderRadius: 14,
    shadowOpacity:50,
    shadowOffset:50,
    elevation: 8,
    shadowColor:'#000000',
    shadowRadius:12,
    width: 350,
    height:240,
    justifyContent: 'center',
    alignItems:'center'
  },
  designerText:{
    fontSize:25,
    fontStyle:'normal',
    fontWeight:'bold',
    marginStart: 70,
    paddingTop:5,
    paddingEnd:12,
    width:'60%',
   
  },
  header:{
    flexDirection:'row',
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'visible',
    borderRadius: 14,
    padding: 2,
    alignSelf:'center'
    
    
  }
});

export default DesignerHomeScreen;
