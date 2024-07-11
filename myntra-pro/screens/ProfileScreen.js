import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfilePage = () => {
  // Dummy data (replace with actual data from your database or state)
  const profileData = {
    name: 'Kate Winslet',
    profilePicture: require('../assets/fashionDesignerImage.png'),
    qualifications: 'Fashion Designing Degree, XYZ Institute',
    experience: '5 years',
    expertise: 'Tailoring, Dress Designing',
  };

  return (
    <View style={styles.container}>
        <View style ={styles.header}>
      <View style={styles.logoImageContainer}>
        <Image 
        source={require('../assets/logo.png')}
        style ={styles.logo} />
      </View>
      <Text style ={styles.designerText} >Hello Kate,</Text>
      </View>
      
      <View style={styles.cardView} >
      <View style={styles.profileImageContainer}>
      <Image source={profileData.profilePicture} style={styles.profileImage} />
      </View>
      <Text style={styles.name}>{profileData.name}</Text>
      <Image source={require('../assets/dashIcon.png')} style={styles.dash}/>
      <Text style={styles.profession}>Fashion Designer</Text>
      <View style ={styles.IconContainer} backgroundColor='white'>
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
    profession:{
        marginTop:30,
        fontSize:24
    },
    logoImageContainer:{
        alignItems:"flex-start",
        paddingStart: 5
      },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
      },
    IconContainer:{
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        alignItems:'center',
        justifyContent:'space-evenly',
        paddingEnd:15,
        width:'100%',
        height:50,

        },
        profileImageContainer:{
            width:'100%',
            position:'absolute',
            top:30,
            alignItems:'center',
        },
    icon:{
        width: 25,
        height: 30,
        resizeMode: 'contain',
        marginStart:20,
        marginStart:10,
    },
    dash:{
        marginTop:0,
        width:100,
        height:3
    },
  container: {
    
    alignItems: 'center',
    backgroundColor: '#fff',

  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop:110,
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
    margin: 10,
    shadowColor:'#000080',
    position:'relative',
    height:'55%',
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
  },
  designerText:{
    fontSize:25,
    fontStyle:'normal',
    fontWeight:'bold',
    marginStart: 70,
    paddingTop:5,
    paddingEnd:1,
   
  },
  header:{
    flexDirection:'row',
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'visible',
    borderRadius: 14,
    padding: 2,
    alignSelf:'center',
    width:'90%'
    
    
  }
});

export default ProfilePage;
