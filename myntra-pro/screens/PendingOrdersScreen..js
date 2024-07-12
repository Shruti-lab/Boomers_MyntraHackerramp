// screens/NewOrdersScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PendingOrdersScreen = () => {
  // Mock data for orders
  const orders = [
    { id: 1, customerName: 'John Doe', orderDetails: ' 1 trouser' },
    { id: 2, customerName: 'Jane Smith', orderDetails: '1 dress' },
    { id: 3, customerName: 'Bob Johnson', orderDetails: '1 shirt' },
    // Add more orders as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Orders Pending</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {orders.map(order => (
          <View key={order.id} style={styles.orderCard}>
            <Text style={styles.customerName}>{order.customerName}</Text>
            <Text style={styles.orderDetails}>{order.orderDetails}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

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
    marginTop:20
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
});

export default PendingOrdersScreen;
