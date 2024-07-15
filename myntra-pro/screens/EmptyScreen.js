import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';


function EmptyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>emptyyyyyyyy</Text>
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

export default EmptyScreen;
