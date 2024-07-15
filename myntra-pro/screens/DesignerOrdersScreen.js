import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Alert, Image, SafeAreaView } from 'react-native';
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
          quote: currentQuote, // Save the actual quote amount
        },
        status: 'quote_sent', // Update status to 'quote_sent'
      });
      Alert.alert('Quote Sent', 'Your quote has been sent successfully.');

      // Remove the order from the local state
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/myntraIcon.png')}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>New Orders</Text>
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={orders.length === 0 ? styles.noOrdersContainer : styles.scrollContainer}>
          {orders.length === 0 ? (
            <Text style={styles.noOrdersText}>No new orders</Text>
          ) : (
            orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <Text style={styles.customerName}>Product Name: {order.productName}</Text>
                <Text style={styles.orderDetails}>
                  Measurements: 
                  {"\n"}
                  Chest: {order.measurements.chest}{"\n"}
                  Waist: {order.measurements.waist}{"\n"}
                  Hip: {order.measurements.hip}{"\n"}
                  Sleeve Length: {order.measurements.sleeveLength}{"\n"}
                  Neck: {order.measurements.neck}{"\n"}
                  Inseam: {order.measurements.inseam}
                </Text>
                <TextInput
                  placeholder="Enter your quote"
                  style={styles.input}
                  value={quoteMap[order.id] || ''}
                  onChangeText={(value) => handleChangeQuote(order.id, value)}
                />
                <Button title="Send Quote" onPress={() => handleSendQuote(order.id)} color="#ff4468" />
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff4f2',
    marginTop: 30
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#7f7053',
    borderRadius: 4,
    margin: 10,
    height: 40,
    alignItems: 'center',
    width: '95%',
  },
  logo: {
    width: 35,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noOrdersContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
    marginBottom: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  noOrdersText: {
    fontSize: 18,
    color: '#D3D3D3',
    textAlign: 'center',
  },
});

export default DesignerOrdersScreen;
