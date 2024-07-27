import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'; 

const OrderDetailsScreen = ({ order, onBackToOrders }) => {
  const [images, setImages] = useState([]);
  const [designerQuotes, setDesignerQuotes] = useState([]);

  useEffect(() => {
    if (order.quotes) {
      const quotesArray = Object.keys(order.quotes).map((designerEmail) => ({
        designerEmail,
        quote: order.quotes[designerEmail],
      }));
      setDesignerQuotes(quotesArray);
    }
  }, [order]);

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

    if (result.canceled) {
      Alert.alert('Image picker canceled');
      return;
    }

    if (!result.assets || !result.assets[0] || !result.assets[0].uri) {
      Alert.alert('Uri not found');
      return;
    }

    const uri = result.assets[0].uri;
    setImages((prevImages) => [...prevImages, uri]);
  };

  const renderQuote = (quote) => (
    <View key={quote.designerEmail} style={styles.quoteContainer}>
      <Text style={styles.quoteText}>{quote.quote}</Text>
      <Text style={styles.designerEmailText}>{quote.designerEmail}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <View style={styles.orderDetails}>
            <Text style={styles.detailLabel}>Product:</Text>
            <Text style={styles.detailValue}>{order.productName}</Text>
          </View>
          
          {order.imageUri && (
            <Image source={{ uri: order.imageUri }} style={styles.orderImage} />
          )}
        </View>

        {/* Display quotes */}
        <View style={styles.designerFees}>
          <Text style={styles.sectionTitle}>Designer Fees</Text>
          <Icon name="pricetag-outline" size={24} color="#000" style={styles.icon}/>
        </View>
        {designerQuotes.length > 0 ? (
          designerQuotes.map((quote) => renderQuote(quote))
        ) : (
          <Text style={styles.noQuotesText}>No quotes sent yet.</Text>
        )}

        {/* Display uploaded images */}
        
      </ScrollView>
    
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 15,
    marginBottom:7
  },
  designerFees:{
    flexDirection:'row',
    alignItems:'center'
  },
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
    padding: 20,
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
    marginBottom: 10,
  },
  quoteContainer: {
    backgroundColor: '#e9ecef',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  quoteText: {
    fontSize: 16,
    color: '#6c757d',
  },
  designerEmailText: {
    fontSize: 14,
    color: '#adb5bd',
    marginTop: 5,
  },
  noQuotesText: {
    fontSize: 16,
    color: '#adb5bd',
    textAlign: 'center',
    marginVertical: 10,
  },
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    margin: 5,
  },
  noImagesText: {
    fontSize: 16,
    color: '#adb5bd',
    textAlign: 'center',
    marginVertical: 10,
  },
  uploadButton: {
    backgroundColor: '#17a2b8',
    paddingVertical: 12,
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
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
});

export default OrderDetailsScreen;
