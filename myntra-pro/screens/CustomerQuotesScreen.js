import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '../firebaseConfig'; // Adjust path as per your structure
import OrderDetailsScreen from './OrderDetailsScreen'; // Import OrderDetailsScreen
import { Ionicons } from '@expo/vector-icons'; // Importing icons

function CustomerQuotesScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const customer_id = 'customer_id'; // Replace with actual customer ID or get it dynamically

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const db = getFirestore(app);
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('customerId', '==', customer_id));
        const ordersSnapshot = await getDocs(q);
        const ordersList = ordersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders: ', error);
      }
    };

    fetchOrders();
  }, []);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.myntraInsider}>
        <View style={styles.logoImage}>
          <Image source={require('../assets/myntraIcon.png')} style={styles.logo} />
        </View>
        <View style={styles.myntraTextContainer}>
          <Text style={styles.myntraText}>Order Details</Text>
        </View>
      </View>
      {selectedOrder ? (
        <View style={styles.orderDetailsContainer}>
          <OrderDetailsScreen order={selectedOrder} onBackToOrders={handleBackToOrders} />
          <TouchableOpacity style={styles.backButton} onPress={handleBackToOrders}>
            <Text style={styles.buttonText}>Back to Orders</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.orderCard} onPress={() => handleSelectOrder(item)}>
              <View style={styles.orderCardContent}>
                <Ionicons name="pricetag" size={24} color="#ff4468" />
                <View style={styles.orderCardText}>
                  <Text style={styles.orderId}>Product: {item.productName}</Text>
                  <Text style={styles.orderStatus}>Status: {item.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40, // Increased top padding for margin
  },
  orderDetailsContainer: {
    flex: 1,
  },
  backButton: {
    backgroundColor: '#ff4468',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderCard: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  orderCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderCardText: {
    marginLeft: 15,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderStatus: {
    fontSize: 16,
    color: '#666666',
  },
});

export default CustomerQuotesScreen;
