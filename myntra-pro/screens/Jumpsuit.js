import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import app from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';

function JumpsuitForm({ navigation }) {
  const [productName, setProductName] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [sleeveLength, setSleeveLength] = useState('');
  const [neck, setNeck] = useState('');
  const [inseam, setInseam] = useState('');
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [imageUri, setImageUri] = useState(null);
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
        imageUri,
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
    setColor('');
    setMaterial('');
    setImageUri(null);
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
    setImageUri(uri);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerPage}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Jumpsuit</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.headerContainer}>
          <Image source={require('../assets/Jumpsuit.png')} style={styles.imageJumpsuit} />
          <View style={styles.textContainer}>
            <Text style={styles.subheadingText}>Jumpsuit</Text>
            <Text style={styles.tagline}>Get the perfect jumpsuit stitched just for you</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.header}>
           
            <Text style={styles.headerText}>Enter Details</Text>
          </View>

          {!orderPlaced && (
            <>
              {imageUri && (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                </View>
              )}
              <TouchableOpacity style={styles.uploadButtonContainer} onPress={handleImagePick}>
                <Text style={styles.uploadButtonText}>Upload Image</Text>
              </TouchableOpacity>

              <RNPickerSelect
                placeholder={{ label: "Select Color", value: null }}
                value={color}
                onValueChange={setColor}
                items={[
                  { label: 'Red', value: 'red' },
                  { label: 'Blue', value: 'blue' },
                  { label: 'Green', value: 'green' },
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
                <Button title="Place Order" onPress={handlePlaceOrder} color="#ff4468" />
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
  headerPage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#626262',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
    backgroundColor:'#fff',
    padding:20,
    borderRadius:15,
    
    
  },
  imageJumpsuit: {
    width: 150,
    height: 200,
    borderRadius: 15,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    marginTop:10,
    margin:5
  },
  subheadingText: {
    fontSize: 18,
    color: '#513438',
    fontWeight: 'bold',
  },
  tagline: {
    color: '#383035',
    marginTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4468',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  uploadButtonContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
    marginLeft:50,
    marginRight:50,
    borderWidth:2,
    borderColor:'#ff4468'
  },
  uploadButtonText: {
    color: '#535353',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
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
    color: '#ff4468',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  placeholder: {
    color: '#aaa',
  },
});

export default JumpsuitForm;
