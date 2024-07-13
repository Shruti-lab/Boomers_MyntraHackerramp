import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function DesignerHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.Maincontainer}>
       
      <View style={styles.myntraInsider}>
        <View style={styles.logoImage}>
        <Image 
        source={require('../assets/logo.png')}
        style ={styles.logo} />
        </View>
            <Text source={require('../assets/myntraInsider.png')} style={styles.myntraText}>Welcome,</Text>
            <Image source={require('../assets/insiderCrown.png')} style={styles.myntraImage}/>
        </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.frontImageContainer2}>
      <View style={styles.frontImageContainer}>
        <Image 
        source={require('../assets/designerFrontImage.png')}
        style ={styles.imageView} />
      </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/notificationIcon.png')} style={styles.icon} />
          <Text style={styles.boxText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('PendingOrders')}>
          <Image source={require('../assets/communityIcon.png')} style={styles.icon} />
          <Text style={styles.boxText}>Community Page</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('NewOrders')}>
          <Image source={require('../assets/wardrobe.png')} style={styles.icon} />
          <Text style={styles.boxText}>Wardrobe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Settings')}>
          <Image source={require('../assets/settingsIcon.png')} style={styles.icon} />
          <Text style={styles.boxText}>Settings</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  frontImageContainer2:{
    justifyContent:'center',
    alignItems:'center'
  },
  scrollContainer:{
    width:'100%',
    backgroundColor:'#fff4f2',
    height:'100%',
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
    justifyContent:'flex-start',
    paddingBottom:10,
   
    backgroundColor: 'white',
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    marginVertical: 30,
    marginHorizontal:30
  },
  logo: {
    width: 35,
    height: 30,
    resizeMode: 'contain',
  },
  myntraImage:{
    paddingTop:10,
    width:40,
    height:40,
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
   
    flexDirection:'row',
    borderWidth:2,
    borderColor:'#7f7053',
    borderRadius:4,
    margin:10,
    height:40,
    alignItems:'center',
    width:'95%',
    marginTop:30

},
  box: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 40,
    borderRadius: 10,
    shadowColor:'black',
    elevation: 5,
    padding: 2,
    
  },
  boxText: {
    color: '#ff4866',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    width: 40,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 0, 
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
    alignItems:'center',
    margin:10,
    
  
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
