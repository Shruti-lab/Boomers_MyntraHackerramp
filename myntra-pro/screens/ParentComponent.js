import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomerQuotesScreen from './CustomerQuotesScreen';
import OrderDetailsScreen from './OrderDetailsScreen';

const ParentComponent = () => {
  const [selectedOrder, setSelectedOrder] = useState(null); // Initialize selectedOrder with null or initial order ID

  const handleBackToOrders = () => {
    setSelectedOrder(null); // Reset selectedOrder to null or appropriate initial value
  };

  return (
    <View style={styles.container}>
      {selectedOrder ? (
        <OrderDetailsScreen order={selectedOrder} onBackToOrders={handleBackToOrders} />
      ) : (
        <CustomerQuotesScreen onSelectOrder={(order) => setSelectedOrder(order)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff4f2', // Adjust background color as needed
  },
});

export default ParentComponent;
