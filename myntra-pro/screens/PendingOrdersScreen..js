import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../firebaseConfig'; // Adjust the path according to your project structure

function PendingOrdersScreen() {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      const db = getFirestore(app);
      const ordersSnapshot = await getDocs(collection(db, 'designers', 'designerId', 'pendingOrders')); // Replace 'designerId' with the actual designer's ID
      const ordersList = ordersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setPendingOrders(ordersList);
    };

    fetchPendingOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pending Orders</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {pendingOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <Text style={styles.customerName}>Customer: {order.customerName}</Text>
            <Text style={styles.orderDetails}>
              Order Details: {order.details}
            </Text>
            <Text style={styles.orderDate}>
              Order Date: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
            </Text>
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
  orderDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
});

export default PendingOrdersScreen;
