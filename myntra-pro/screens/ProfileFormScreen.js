import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../firebaseConfig'; // Adjust the path according to your project structure

const ProfileFormScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [expertise, setExpertise] = useState('');
  const [user, setUser] = useState(null);
  const [profileExists, setProfileExists] = useState(false); // State to track if profile exists

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await checkProfileExists(user.uid); // Check if profile exists for the user
      } else {
        Alert.alert('User not authenticated');
        navigation.navigate('Login'); // Redirect to login if user is not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Function to check if profile exists for the current user
  const checkProfileExists = async (userId) => {
    const db = getFirestore(app);
    const profileRef = doc(db, 'profiles', userId);

    try {
      const profileSnapshot = await getDoc(profileRef);
      if (profileSnapshot.exists()) {
        const profileData = profileSnapshot.data();
        setName(profileData.name || '');
        setDob(profileData.dob || '');
        setQualification(profileData.qualification || '');
        setExperience(profileData.experience || '');
        setExpertise(profileData.expertise || '');
        setProfileExists(true);
      } else {
        setProfileExists(false);
      }
    } catch (error) {
      console.error('Error checking profile existence:', error);
      Alert.alert('Error', 'Failed to check profile existence');
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('User not authenticated');
      return;
    }

    const db = getFirestore(app);
    const userDocRef = doc(db, 'profiles', user.uid);

    try {
      await setDoc(userDocRef, {
        name,
        dob,
        qualification,
        experience,
        expertise,
      });

      console.log('Profile details saved successfully');
      navigation.navigate('DesignerPage'); // Navigate to the desired screen after saving profile details
    } catch (error) {
      console.error('Error saving profile details: ', error);
      Alert.alert('Error', 'Failed to save profile details');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.myntraInsider}>
        <View style={styles.logoImage}>
          <Image source={require('../assets/myntraIcon.png')} style={styles.logo} />
        </View>
        <View style={styles.myntraTextContainer}>
          <Text style={styles.myntraText}>Enter Profile Details</Text>
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Name"
          style={styles.textInput}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Enter DOB"
          style={styles.textInput}
          value={dob}
          onChangeText={(text) => setDob(text)}
        />
        <TextInput
          placeholder="Enter Qualification in designing (if any)"
          style={styles.textInput}
          value={qualification}
          onChangeText={(text) => setQualification(text)}
        />
        <TextInput
          placeholder="Enter designing experience (in years)"
          style={styles.textInput}
          value={experience}
          onChangeText={(text) => setExperience(text)}
        />
        <TextInput
          placeholder="Enter Field of Expertise"
          style={styles.textInput}
          value={expertise}
          onChangeText={(text) => setExpertise(text)}
        />
        <TouchableOpacity style={styles.submitButton}>
          <Button title="Submit" color="#ff4468" onPress={handleSubmit} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    width: 120,
    marginBottom: 20,
    marginTop: 7,
  },
  myntraTextContainer: {
    alignItems: 'center',
    width: '80%',
  },
  logo: {
    width: 35,
    height: 30,
    resizeMode: 'contain',
  },
  myntraImage: {
    paddingTop: 10,
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  myntraText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 4,
    top: 0,
  },
  myntraInsider: {
    marginTop: 30,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#ff5868',
    borderRadius: 4,
    marginBottom: 20,
    height: 45,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  headingContainer: {
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#ff4468',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  inputContainer: {
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#838383',
    paddingTop: 15,
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
  },
  textInput: {
    fontSize: 15,
    borderWidth: 2,
    borderColor: '#d3d3d3',
    padding: 5,
    marginTop: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: '95%',
    height: 50,
    backgroundColor: 'white',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff4f2',
    height: '100%',
  },
});

export default ProfileFormScreen;
