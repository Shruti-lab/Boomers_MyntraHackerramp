import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, ScrollView, Image, SafeAreaView } from 'react-native';
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
  const [showImagePreview, setShowImagePreview] = useState(false); // State to toggle image preview
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
        status: 'pending', // Include status field
        quotes: {}, // Initialize quotes field as an empty hashmap
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
    setShowImagePreview(false); // Hide image preview
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
      allowsEditing: true, // This allows the user to crop the image
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setShowImagePreview(true); // Show image preview
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('../assets/myntraIcon.png')} style={styles.logo} />
            <Text style={styles.headerText}>Enter Order Details</Text>
          </View>

          {!orderPlaced && (
            <>
              {showImagePreview && (
                <View style={styles.imagePreviewContainer}>
                  <Image 
                    source={ require('../assets/dressImage.png') } 
                    style={styles.imagePreview} 
                  />
                </View>
              )}
              <View style={styles.uploadButtonContainer}>
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
              <View style={styles.buttonContainer}>
                <Button title="Get Quotes" onPress={handlePlaceOrder} color="#ff4468" />
              </View>
            </>
          )}

          {orderPlaced && (
            <View style={styles.confirmationContainer}>
              <Text style={styles.confirmationText}>Order Sent!</Text>
              <Button title="Place New Order" onPress={handleNewOrder} color="#ff4468" />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff4468',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  uploadButtonContainer: {
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
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
    color: '#ff4468',
  },
});

export default OrderScreen;
