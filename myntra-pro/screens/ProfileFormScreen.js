import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebaseConfig'; // Adjust the path according to your project structure

const ProfileFormScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [expertise, setExpertise] = useState('');
  const [user, setUser] = useState(null);
  const [profileExists, setProfileExists] = useState(false);
  const [imageUri, setImageUri] = useState(''); // State for selected image

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await checkProfileExists(user.uid);
      } else {
        Alert.alert('User not authenticated');
        navigation.navigate('Login');
      }
    });

    return () => unsubscribe();
  }, []);

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
        setImageUri(profileData.imageUri || ''); // Load imageUri from profile if available
        setProfileExists(true);
      } else {
        setProfileExists(false);
      }
    } catch (error) {
      console.error('Error checking profile existence:', error);
      Alert.alert('Error', 'Failed to check profile existence');
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('User not authenticated');
      return;
    }

    const db = getFirestore(app);
    const storage = getStorage(app);
    const userDocRef = doc(db, 'profiles', user.uid);

    try {
      // Upload image if selected
      let imageUrl = '';
      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const imageRef = ref(storage, `profiles/${user.uid}/profileImage`);
        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      }

      await setDoc(userDocRef, {
        name,
        dob,
        qualification,
        experience,
        expertise,
        imageUri: imageUrl, // Save the image URL
      });

      console.log('Profile details saved successfully');
      navigation.navigate('DesignerPage');
    } catch (error) {
      console.error('Error saving profile details: ', error);
      Alert.alert('Error', 'Failed to save profile details');
    }
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      Alert.alert('Image picker canceled');
      return;
    }

    if (!result.assets || !result.assets[0] || !result.assets[0].uri) {
      Alert.alert('Uri not found');
      return;
    }

    const uri = result.assets[0].uri;

    setImageUri(uri); 
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
        {imageUri ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
            <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePick}>
              <Text style={styles.imagePickerText}>Change Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePick}>
            <Text style={styles.imagePickerText}>Pick an Image</Text>
          </TouchableOpacity>
        )}
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerButton: {
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#ff4468',
    fontSize: 16,
  },
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
