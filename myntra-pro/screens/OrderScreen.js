import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, ScrollView, Image, SafeAreaView } from 'react-native';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import app from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

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
      const docRef = await addDoc(collection(db, 'orders'), {
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
        imageUri: imageUri || null, // Include image URI in the order if available
        status: 'pending', // Include status field
        quotes: {}, // Initialize quotes field as an empty hashmap
      });

      // Show confirmation message
      setOrderPlaced(true);

      // Reset form fields and hide confirmation message
      setProductName('');
      setChest('');
      setWaist('');
      setHip('');
      setSleeveLength('');
      setNeck('');
      setInseam('');
      setImageUri(null);
    } catch (error) {
      console.error('Error placing order: ', error);
      Alert.alert('Error', 'There was an error placing your order.');
    }
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

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handleNewOrder = () => {
    // Reset form fields and state to allow creating a new order
    setProductName('');
    setChest('');
    setWaist('');
    setHip('');
    setSleeveLength('');
    setNeck('');
    setInseam('');
    setImageUri(null);
    setOrderPlaced(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
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
              {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
              
              <View style={styles.uploadImage}>
                <Button title="Upload Image" onPress={handleImagePick} color="#ff4468" />
              </View>

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
              <Button title="Place Order" onPress={handlePlaceOrder} color="#ff4468" />
            </>
          )}

          {orderPlaced && (
            <View style={styles.confirmationContainer}>
              <Text style={styles.confirmationText}>Order Placed Successfully!</Text>
              <Button title="New Order" onPress={handleNewOrder} color="#ff4468" />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  myntraText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 4,
    top: 0,
  },
  uploadImage: {
    marginBottom: 30,
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
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
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
    resizeMode: 'cover', // Ensures the image aspect ratio is maintained
    alignSelf: 'center', // Center the image
  },
});

export default OrderScreen;
