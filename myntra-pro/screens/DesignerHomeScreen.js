import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image} from 'react-native';

function DesignerHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoImage}>
        <Image 
        source={require('../assets/logo.png')}
        style ={styles.logo} />
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
    position:'absolute',
    top:10,
    left:20

  },


  imageView:{
    width: 400,
    height: 200,
    resizeMode: 'contain',

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
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
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
    marginBottom:30,
    borderRadius: 20,
    elevation:5
    
  }
});

export default DesignerHomeScreen;
