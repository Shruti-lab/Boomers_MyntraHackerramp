import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig'; // Ensure firebaseConfig is correctly imported

const db = getFirestore(app);

const OrderDetailsScreen = ({ route, navigation }) => {
  const { order } = route.params;
  

  // Check if the order object contains the identifier
  const orderId = order.id; // Update this line to reflect the actual unique identifier

  // Generate a serial number for each quote
  const generateSerialNumber = (index) => `Designer ${index + 1}:`;

  const handleQuoteSubmit = async (designerEmail, saveQuote) => {
    try {
      if (!orderId) {
        console.error('Order ID is undefined');
        return;
      }

      const orderDoc = doc(db, 'orders', orderId);
      const updatedFinalQuote = order.finalQuote ? { ...order.finalQuote } : {};
      updatedFinalQuote[designerEmail] = saveQuote;

      await updateDoc(orderDoc, {
        finalQuote: updatedFinalQuote
      });

      Alert.alert('Quote Saved');
      navigation.goBack()
        } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Order Details</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.detailsContainer}>
          <View style={styles.productName}>
            <Text style={styles.nameValue}>{order.productName}</Text>
          </View>
          
          {order.imageUri && (
            <Image source={{ uri: order.imageUri }} style={styles.orderImage} />
          )}

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Material:</Text>
            <Text style={styles.detailValue}>{order.material}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.measurementsSection}>
            <Text style={styles.sectionTitle}>Measurements:</Text>
            {Object.entries(order.measurements).map(([key, value]) => (
              <View key={key} style={styles.detailRow}>
                <Text style={styles.measurementLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
                <Text style={styles.detailValue}>{value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.separator} />
        </View>

        <View style={styles.quotesContainer}>
          <Text style={styles.sectionTitle}>Designer Fees:</Text>
          {order.quotes && Object.keys(order.quotes).map((designerEmail, index) => (
            <TouchableOpacity key={index} style={styles.quoteItem} onPress={() => handleQuoteSubmit(designerEmail, order.quotes[designerEmail])}>
              <Text style={styles.serialNumber}>{generateSerialNumber(index)}</Text>
              <Text style={styles.quoteText}>{order.quotes[designerEmail]}</Text>
            </TouchableOpacity>
          ))}
          {(!order.quotes || Object.keys(order.quotes).length === 0) && (
            <Text style={styles.noQuotesText}>No quotes sent yet.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {  
    alignItems: 'center',
    marginBottom: 10,
  },
  nameValue: {
    fontSize: 22,
    fontWeight: 'bold',
    borderWidth: 2,
    borderRadius: 10,
    width: '50%',
    paddingVertical: 5,
    borderColor: '#ff4468',
    backgroundColor: '#ff4468',
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center'
  },
  container: {
    flex: 1, 
    backgroundColor: '#f5f5f5',
    paddingTop: 25,
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 24,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  orderImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
    flex: 2,
    textAlign: 'right',
  },
  measurementsSection: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  measurementLabel: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
    flex: 1,
  },
  quotesContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  quoteItem: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    padding: 10,
    borderRadius: 15,
    borderColor: '#d3d3d3',
    justifyContent: 'space-between',
  },
  serialNumber: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  quoteText: {
    fontSize: 18,
    color: '#6c757d',
    marginLeft: 20,
  },
  noQuotesText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default OrderDetailsScreen;
