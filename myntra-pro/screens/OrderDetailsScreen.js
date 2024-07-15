import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const OrderDetailsScreen = ({ order, onBackToOrders }) => {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.uri]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.orderDetails}>
            <Text style={styles.detailLabel}>Product:</Text>
            <Text style={styles.detailValue}>{order.productName}</Text>
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text style={styles.detailValue}>{order.status}</Text>
          </View>
        </View>

        {/* Display quotes */}
        <Text style={styles.sectionTitle}>Quotes Sent:</Text>
        <FlatList
          data={order.designerQuotes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteText}>{item.quote}</Text>
            </View>
          )}
          ListEmptyComponent={() => <Text style={styles.noQuotesText}>No quotes sent yet.</Text>}
        />

        {/* Image upload section */}
        <Text style={styles.sectionTitle}>Images:</Text>
        <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
          ListEmptyComponent={() => <Text style={styles.noImagesText}>No images uploaded yet.</Text>}
        />
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Button to navigate back */}
      <TouchableOpacity style={styles.backButton} onPress={onBackToOrders}>
        <Text style={styles.buttonText}>Back to Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 5,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#495057',
  },
  detailValue: {
    fontSize: 16,
    color: '#6c757d',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343a40',
    marginTop: 20,
    marginBottom: 10,
  },
  quoteContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 5,
  },
  quoteText: {
    fontSize: 16,
    color: '#6c757d',
  },
  noQuotesText: {
    fontSize: 16,
    color: '#adb5bd',
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
  },
  noImagesText: {
    fontSize: 16,
    color: '#adb5bd',
    textAlign: 'center',
    marginVertical: 10,
  },
  uploadButton: {
    backgroundColor: '#17a2b8',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#ff4468',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OrderDetailsScreen;
