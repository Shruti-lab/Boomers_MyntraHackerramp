import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import app from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';

function OrderScreen({ navigation }) {
  const [productName, setProductName] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [sleeveLength, setSleeveLength] = useState('');
  const [neck, setNeck] = useState('');
  const [inseam, setInseam] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [imageUri, setImageUri] = useState(null); // State for image URI
  const db = getFirestore(app);

  const handlePlaceOrder = async () => {
    try {
      // Validate inputs (optional)
      if (!chest || !waist || !hip || !sleeveLength || !neck || !inseam || !productName) {
        Alert.alert('Incomplete Order Details', 'Please enter all required details.');
        return;
      }

      // Add order to Firestore
      await addDoc(collection(db, 'orders'), {
        customerId: 'customer_id', // Replace with actual customer ID
        productName,
        measurements: {
          chest,
          waist,
          hip,
          sleeveLength,
          neck,
          inseam,
        },
        imageUri, // Include image URI in the order
      });

      // Show confirmation message
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order: ', error);
      Alert.alert('Error', 'There was an error placing your order.');
    }
  };

  const handleNewOrder = () => {
    // Reset form fields and hide confirmation message
    setProductName('');
    setChest('');
    setWaist('');
    setHip('');
    setSleeveLength('');
    setNeck('');
    setInseam('');
    setImageUri(null); // Reset image URI
    setOrderPlaced(false);
  };

  const handleImagePick = async () => {
    // Ask for permission to access the photo library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.myntraInsider}>
        <View style={styles.logoImage}>
          <Image source={require('../assets/myntraIcon.png')} style={styles.logo} />
        </View>
        <View style={styles.myntraTextContainer}>
          <Text style={styles.myntraText}>Enter Order Details</Text>
        </View>
      </View>

      {!orderPlaced && (
        <>
          <View style={styles.uploadImage}>
          <Button title="Upload Image" onPress={handleImagePick} color="#ff4468"  />
          </View>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
          
          <TextInput
            placeholder="Product Name"
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
          />
          <TextInput
            placeholder="Chest Measurement (inches)"
            style={styles.input}
            value={chest}
            onChangeText={setChest}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Waist Measurement (inches)"
            style={styles.input}
            value={waist}
            onChangeText={setWaist}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Hip Measurement (inches)"
            style={styles.input}
            value={hip}
            onChangeText={setHip}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Sleeve Length (inches)"
            style={styles.input}
            value={sleeveLength}
            onChangeText={setSleeveLength}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Neck Measurement (inches)"
            style={styles.input}
            value={neck}
            onChangeText={setNeck}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Inseam Measurement (inches)"
            style={styles.input}
            value={inseam}
            onChangeText={setInseam}
            keyboardType="numeric"
          />
          <Button title="Get Quotes" onPress={handlePlaceOrder} color="#ff4468" />
        </>
      )}

      {orderPlaced && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>Order Sent!</Text>
          <Button title="Place New Order" onPress={handleNewOrder} color="#ff4468" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    borderColor: '#7f7053',
    borderRadius: 4,
    marginBottom: 20,
    height: 45,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  confirmationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    resizeMode: 'contain', // Ensures the image aspect ratio is maintained
    alignSelf: 'center', // Center the image
  },
});

export default OrderScreen;
