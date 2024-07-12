import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ScrollView } from 'react-native';

const ProfilePage = () => {
  const profileData = {
    name: 'Kate Winslet',
    profilePicture: require('../assets/fashionDesignerImage.png'),
    qualifications: 'Fashion Designing Degree, XYZ Institute',
    experience: '5 years',
    expertise: 'Tailoring, Dress Designing',
  };

  return (
    <View style={styles.container}>
        <Text style={styles.designerText}>Profile</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.myntraInsider}>
        <View style={styles.logoImage}>
        <Image 
        source={require('../assets/logo.png')}
        style ={styles.logo} />
        </View>
            <Text source={require('../assets/myntraInsider.png')} style={styles.myntraText}>Hello Kate,</Text>
            <Image source={require('../assets/insiderCrown.png')} style={styles.myntraImage}/>
        </View>
      
      
        <View style={styles.cardView}>
          <View style={styles.profileImageContainer}>
            <Image source={profileData.profilePicture} style={styles.profileImage} />
          </View>
          <Text style={styles.name}>{profileData.name}</Text>
          <Image source={require('../assets/dashIcon.png')} style={styles.dash} />
          <Text style={styles.profession}>Fashion Designer</Text>
          <View style={styles.iconContainer}>
            <Image source={require('../assets/facebookIcon.png')} style={styles.icon} />
            <Image source={require('../assets/instagramIcon.png')} style={styles.icon} />
            <Image source={require('../assets/twitterIcon.png')} style={styles.icon} />
            <Image source={require('../assets/telegramIcon.png')} style={styles.icon} />
          </View>
        </View>

        <Text style ={styles.details} >Details</Text>
        <View style={styles.infoContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Qualifications</Text>
            <Text style={styles.value}>{profileData.qualifications}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Experience</Text>
            <Text style={styles.value}>{profileData.experience}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Expertise</Text>
            <Text style={styles.value}>{profileData.expertise}</Text>
          </View>
        </View>
    </ScrollView>
        <TouchableOpacity style={styles.editProfile}>
          <Button color='#ff4468' title="Edit Profile" />
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
    details:{
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 2,
        alignItems: 'center',
        color: '#636363',
        marginTop:0,
        borderWidth : 1,
        borderRadius:5,
        borderColor:'#D3D3D3',
        paddingStart:13,
        paddingEnd:10,
        marginBottom:20

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
        marginTop:20,
        flexDirection:'row',
        borderWidth:3,
        borderColor:'#7f7053',
        borderRadius:4,
        margin:10,
        height:40,
        alignItems:'center',
        width:'95%',

    },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20, // Added padding at the bottom for better scrolling experience
  },
  editProfile: {
    elevation: 10,
    justifyContent:'center',
    width: '80%',
    marginTop: 20,
    marginBottom:20,
    marginStart:40,
    alignContent:'center'
    
  },
  profession: {
    marginTop: 30,
    fontSize: 24,
  },
  logoImageContainer: {
    alignItems: "flex-start",
    paddingStart: 0
  },
  logo: {
    width: 35,
    height: 30,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop:20,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingEnd: 15,
    width: '100%',
    height: 50,
    backgroundColor: '#fff'
  },
  profileImageContainer: {
    width: '100%',
    
    top: 30,
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 30,
    resizeMode: 'contain',
    marginStart: 20,
  },
  dash: {
    marginTop: 0,
    width: 100,
    height: 3,
  },
  container: {
    flex: 1,
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
    marginTop:30,
    marginBottom: 10,
  },
  detailsContainer: {
   
   paddingStart:15,
    borderWidth:1,
    borderColor:'#D3d3d3',
    width:'100%',
    padding:10,
    height:70
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 120,
    marginBottom:5
  },
  value: {
    fontSize: 16,
    flex: 1,
    color:'gray'
  },
  cardView: {
  
    elevation: 5,
    shadowColor: '#000',
    top: 0,
    backgroundColor: '#FFFAF0',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
  },
  infoContainer: {
    width: '100%',
    padding: 0,
   
  },
  designerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 8,
    paddingTop: 5,
    paddingEnd: 1,
    alignItems: 'center',
    color: '#636363',
    marginTop:30
  },
  header: {
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'gray',
    overflow: 'visible',
    borderRadius: 14,
    padding: 2,
    alignSelf: 'center',
    width: '90%',
    height: 45
  },
});

export default ProfilePage;
