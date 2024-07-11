import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfilePage = () => {
  // Dummy data (replace with actual data from your database or state)
  const profileData = {
    name: 'John Doe',
    profilePicture: require('../assets/profileIcon.png'),
    qualifications: 'Fashion Designing Degree, XYZ Institute',
    experience: '5 years',
    expertise: 'Tailoring, Dress Designing',
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.cardView} >
      <Image source={profileData.profilePicture} style={styles.profileImage} />
      <Text style={styles.name}>{profileData.name}</Text>
      <View style ={styles.logoContainer}>
      <Image source={require('../assets/facebookIcon.png')} style={styles.icon}/>
      <Image source={require('../assets/instagramIcon.png')} style={styles.icon}/>
      <Image source={require('../assets/twitterIcon.png')} style={styles.icon}/>
      <Image source={require('../assets/telegramIcon.png')} style={styles.icon}/>
      </View>
      </View>

      <View style={styles.container1}>
      <View style={styles.InfoContainer}>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Qualifications:</Text>
        <Text style={styles.value}>{profileData.qualifications}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Experience:</Text>
        <Text style={styles.value}>{profileData.experience} years</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Expertise:</Text>
        <Text style={styles.value}>{profileData.expertise}</Text>
      </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    logoContainer:{
        flexDirection:'row',
        marginHorizontal:10,
        },
    icon:{
        width: 25,
        height: 30,
        resizeMode: 'contain',
        marginStart:10,
        marginStart:10,
    },
  container: {
    
    alignItems: 'center',
    backgroundColor: '#fff',

  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsContainer: {
    marginTop:5
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    width: 120,
  },
  value: {
    fontSize: 16,
  },
  cardView:{
    elevation: 20,
    padding: 10,
    margin: 10,
    shadowColor:'#000080',
    position:'relative',
    flex:0,
    height:'50%',
    borderRadius:0,
    top:50,
    backgroundColor:'#FFFAF0',
    width:'80%',
    justifyContent:'center',
    alignItems:'center',
  },
  InfoContainer:{
    marginTop:60,
    borderWidth:1,
    padding:10,
    flex:0,
    
    width:'90%'
    
  },
  container1:{
    flexDirection:'column',
    marginVertical:10
  }
});

export default ProfilePage;
