import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const OrderDetailsScreen = ({ order, onBackToOrders }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <View style={styles.orderDetails}>
        <Text style={styles.detailLabel}>Product:</Text>
        <Text style={styles.detailValue}>{order.productName}</Text>
      </View>
      <View style={styles.orderDetails}>
        <Text style={styles.detailLabel}>Status:</Text>
        <Text style={styles.detailValue}>{order.status}</Text>
      </View>

      {/* Display quotes */}
      <Text style={styles.quotesTitle}>Quotes Sent:</Text>
      <FlatList
        data={order.designerQuotes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>{item.quote}</Text>
            {/* Add more details of the quote here if needed */}
          </View>
        )}
        ListEmptyComponent={() => <Text>No quotes sent yet.</Text>}
      />

      {/* Button to navigate back */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff4f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
  },
  quotesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  quoteContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  quoteText: {
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OrderDetailsScreen;
