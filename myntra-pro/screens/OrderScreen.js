import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView, Image, SafeAreaView, TextInput } from 'react-native';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import app from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';

function OrderScreen({ navigation }) {
  const [productName, setProductName] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [sleeveLength, setSleeveLength] = useState('');
  const [neck, setNeck] = useState('');
  const [inseam, setInseam] = useState('');
  const [color, setColor] = useState(''); // State for color
  const [material, setMaterial] = useState(''); // State for material
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [imageUri, setImageUri] = useState(null); // State to hold image URI
  const db = getFirestore(app);

  const handlePlaceOrder = async () => {
    try {
      if (!chest || !waist || !hip || !sleeveLength || !neck || !inseam || !productName || !color || !material) {
        Alert.alert('Incomplete Order Details', 'Please enter all required details.');
        return;
      }

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
        color,
        material,
        status: 'pending',
        quotes: {},
        imageUri, // Include the image URI in the order
      });

      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order: ', error);
      Alert.alert('Error', 'There was an error placing your order.');
    }
  };

  const handleNewOrder = () => {
    setProductName('');
    setChest('');
    setWaist('');
    setHip('');
    setSleeveLength('');
    setNeck('');
    setInseam('');
    setColor(''); // Reset color
    setMaterial(''); // Reset material
    setImageUri(null); // Reset image URI
    setOrderPlaced(false);
  };

  const handleImagePick = async () => {
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

    if (result.canceled) {
      Alert.alert('Image picker canceled');
      return;
    }

    if (!result.assets || !result.assets[0] || !result.assets[0].uri) {
      Alert.alert('Uri not found');
      return;
    }

    const uri = result.assets[0].uri;
    setImageUri(uri); // Set the image URI to display the preview
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
              {imageUri && (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                </View>
              )}
              <View style={styles.uploadButtonContainer}>
                <Button title="Upload Image" onPress={handleImagePick} color="#ff4468" />
              </View>

              <RNPickerSelect
                placeholder={{ label: "Select Color", value: null }}
                value={color}
                onValueChange={setColor}
                items={[
                  { label: 'Red', value: 'red' },
                  { label: 'Blue', value: 'blue' },
                  { label: 'Green', value: 'green' },
                  // Add more colors as needed
                ]}
                style={pickerSelectStyles}
              />

              <RNPickerSelect
                placeholder={{ label: "Select Material", value: null }}
                value={material}
                onValueChange={setMaterial}
                items={[
                  { label: 'Cotton', value: 'cotton' },
                  { label: 'Wool', value: 'wool' },
                  { label: 'Polyester', value: 'polyester' },
                  // Add more materials as needed
                ]}
                style={pickerSelectStyles}
              />

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
    marginTop: 20,
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
  },
  placeholder: {
    color: 'gray',
  },
});

export default OrderScreen;
