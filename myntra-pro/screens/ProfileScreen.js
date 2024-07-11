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
        <View style={styles.myntraInsider}>
        <View style={styles.logoImage}>
        <Image 
        source={require('../assets/logo.png')}
        style ={styles.logo} />
        </View>
            <Text source={require('../assets/myntraInsider.png')} style={styles.myntraText}>Hello Kate,</Text>
            <Image source={require('../assets/insiderCrown.png')} style={styles.myntraImage}/>
        </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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

        <View style={styles.infoContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Qualifications:</Text>
            <Text style={styles.value}>{profileData.qualifications}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Experience:</Text>
            <Text style={styles.value}>{profileData.experience}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Expertise:</Text>
            <Text style={styles.value}>{profileData.expertise}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editProfile}>
          <Button color='#ff4468' title="Edit Profile" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    myntraImage:{
        paddingTop:10,
        width:50,
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
        borderColor:'gray',
        borderRadius:4,
        margin:10,
        height:50,
        alignItems:'center'

    },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20, // Added padding at the bottom for better scrolling experience
  },
  editProfile: {
    elevation: 10,
    shadowColor: '#0000ee',
    width: '80%',
    marginTop: 20,
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
    marginTop: 5,
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 120,
  },
  value: {
    fontSize: 16,
    flex: 1,
  },
  cardView: {
    marginTop: 0,
    elevation: 5,
    shadowColor: '#000',
    top: 30,
    backgroundColor: '#FFFAF0',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
  },
  infoContainer: {
    width: '100%',
    marginTop:15,
    padding: 20,
   
  },
  designerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 8,
    paddingTop: 5,
    paddingEnd: 1,
    alignItems: 'center',
    color: '#636363',
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
