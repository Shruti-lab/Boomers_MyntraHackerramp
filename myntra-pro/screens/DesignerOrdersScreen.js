import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { getFirestore, collection, query, onSnapshot, doc, updateDoc, where } from 'firebase/firestore';
import app from '../firebaseConfig';

function DesignerOrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [quoteMap, setQuoteMap] = useState({});
  const db = getFirestore(app);

  useEffect(() => {
    const q = query(collection(db, 'orders'), where('status', '==', 'pending'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersList = [];
      querySnapshot.forEach((doc) => {
        ordersList.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersList);
    });
    return () => unsubscribe();
  }, []);

  const handleSendQuote = async (orderId) => {
    try {
      const orderDoc = doc(db, 'orders', orderId);
      const currentQuote = quoteMap[orderId] || ''; // Get current quote from state map
      await updateDoc(orderDoc, {
        designerQuotes: {
          designer_id: currentQuote, // Replace with actual designer ID
        },
      });
      Alert.alert('Quote Sent', 'Your quote has been sent successfully.');
    } catch (error) {
      console.error('Error sending quote: ', error);
      Alert.alert('Error', 'There was an error sending your quote.');
    }
  };

  const handleChangeQuote = (orderId, value) => {
    setQuoteMap(prevState => ({
      ...prevState,
      [orderId]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pending Orders</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <Text style={styles.customerName}>Customer ID: {order.customerId}</Text>
            <Text style={styles.orderDetails}>
              Measurements: 
              {"\n"}
              Shoulder: {order.measurements.shoulder}{"\n"}
              Waist: {order.measurements.waist}{"\n"}
              Neck: {order.measurements.neck}
            </Text>
            <TextInput
              placeholder="Enter your quote"
              style={styles.input}
              value={quoteMap[order.id] || ''}
              onChangeText={(value) => handleChangeQuote(order.id, value)}
            />
            <Button title="Send Quote" onPress={() => handleSendQuote(order.id)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff4f2',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  orderCard: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDetails: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default DesignerOrdersScreen;
