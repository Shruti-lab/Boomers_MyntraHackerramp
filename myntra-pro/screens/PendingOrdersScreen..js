import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/myntraIcon.png')}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>Pending Orders</Text>
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={pendingOrders.length === 0 ? styles.noOrdersContainer : styles.scrollContainer}>
          {pendingOrders.length === 0 ? (
            <Text style={styles.noOrdersText}>No pending orders</Text>
          ) : (
            pendingOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <Text style={styles.customerName}>Customer: {order.customerName}</Text>
                <Text style={styles.orderDetails}>
                  Order Details: {order.details}
                </Text>
                <Text style={styles.orderDate}>
                  Order Date: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
                </Text>
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
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#7f7053',
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
  orderDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
  noOrdersText: {
    fontSize: 18,
    color: '#D3D3D3',
    textAlign: 'center',
  },
});

export default PendingOrdersScreen;
