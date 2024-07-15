import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Image,Video} from 'react-native';
import { ScrollView } from 'react-native-web';

function CustomerHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.topbox}>
        <View style={{display:'flex',flexDirection:'row',flex:0.6}}>
          <View style={styles.myntrabox}>
            <Text style={{fontSize:11}}>Myntra</Text>
            <View style={{padding:5,paddingTop:8}}>
            <Image style={styles.pinkarrow} source={require('../assets/pinkdownarrow.png')}/>
            </View>
          </View>
          <View style={{padding:5}}>
          <Image style={{height:25,width:100}}source={require('../assets/insider.png')}/>
        </View>
        </View>
        
        <View style={styles.framebox}>
          <Image style={styles.toprightframe} source={require('../assets/toprightframe.png')} />
        </View>
      </View>


      <View style={{padding:10, margin:10 }}>
        <View style={styles.searchbox}>
          <View style={{paddingLeft:5,alignSelf:'center',display: 'flex', flexDirection: 'row',}}>
            <Image source={require('../assets/smallsearch.jpg')}/>
            <Text style={{paddingLeft:5}}>Search for brands ...</Text>
          </View>
          
          <View style={{display: 'flex', flexDirection: 'row',paddingRight:3, alignSelf:'center'}}>
            <Image style={{paddingRight:6}} source={require('../assets/smallcamera.jpg')}/>
            <Image style={{paddingHorizontal:5}} source={require('../assets/smallmic.jpg')}/>
          </View>
        </View>
      </View>
      
      
      <View style={{}} >
        <Image style={{width:'100%',height:300}} source={require('../assets/homeimg1.png')} />
        <View style={{ display: 'flex',flexDirection: 'row',backgroundColor:'black', margin:10, borderRadius:20,justifyContent:'center',alignItems:'center',padding:3}}>
          <Text style={{color:'white',paddingRight:3}}>Sign Up For Exciting Deals!</Text>
          <Image style={{}}  source={require('../assets/rightarrowbutton.png')} />
        </View>
      </View>
      
      <View>
        <View>
          <Text style={{color:'#FF0000'}}>Myntra Live</Text>
          <Text>Shop live with sellers!</Text>
        </View>
        <View style={styles.playlist}>
          <Video style={{marging:5,height:60,width:40}} source={require('../assets/liveshopvid1.mp4')}/>
          <Video style={{marging:5,height:60,width:40}} source={require('../assets/liveshopvid2.mp4')}/>

        </View>
        <View>
          <Image style={{width:'100%',height:200}} source={require('../assets/homeimg2.png')}/>
          <Image style={{width:'100%',height:600}} source={require('../assets/homeimg3.png')}/>

        </View>

      </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    backgroundColor:'#FFFFFF'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  topbox:{
    paddingTop:25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    margin:3
  },
  myntrabox:{
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FAF3EB', 
    padding:7, 
    borderRadius:10,
    borderWidth:2,
    borderColor:'#C8AA5E'

  },
  pinkarrow:{
    height:8,
    width:12,

  },
  framebox:{
    flex:0.3,
    paddingTop:5

  },
  toprightframe:{
    height: 22,
    width:100
  },
  searchbox:{
    display: 'flex',
    flexDirection: 'row',
    borderWidth:2,
    shadowColor:'black',
    borderRadius:25,
    shadowOffset:20,
    padding:5,
    justifyContent:'space-between',

  },
  playlist:{
    display: 'flex',
    flexDirection: 'row',

  }
});

export default CustomerHomeScreen;
