import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../firebaseConfig'; // Adjust path as per your structure
import OrderDetailsScreen from './OrderDetailsScreen'; // Import OrderDetailsScreen

function CustomerQuotesScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const db = getFirestore(app);
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
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
    <View style={styles.container}>
      {/* Conditional rendering based on selectedOrder state */}
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
              <Text style={styles.orderId}>Product: {item.productName}</Text>
              <Text style={styles.orderStatus}>Status: {item.status}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  orderDetailsContainer: {
    flex: 1,
  },
  backButton: {
    backgroundColor: '#ff4468',
    padding: 12,
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
    padding: 20,
    borderWidth: 1,
    borderColor: '#fff4f2',
    borderRadius: 8,
    marginBottom: 10,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderStatus: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default CustomerQuotesScreen;
