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
      <View style={styles.myntraInsider}>
          <View style={styles.logoImage}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>
          <Text style={styles.myntraText}>Pending Orders</Text>
          <Image source={require('../assets/insiderCrown.png')} style={styles.myntraImage} />
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
  frontImageContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
    backgroundColor: '#fff4f2',
    height: '100%',
  },
  logoImage: {
    alignItems: "flex-start",
    paddingStart: 5,
  },
  imageView: {
    width: 345,
    height: 240,
    resizeMode: 'stretch',
    borderColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 30,
  },
  logo: {
    width: 35,
    height: 30,
    resizeMode: 'contain',
  },
  myntraImage: {
    paddingTop: 10,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  myntraText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 4,
    color: '#ff4866',
    top: 0,
  },
  myntraInsider: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#7f7053',
    borderRadius: 4,
    margin: 10,
    height: 40,
    alignItems: 'center',
    width: '95%',
    marginTop: 30,
    backgroundColor: '#fff',
  },
  box: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 5,
    padding: 2,
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  boxText: {
    color: '#ff4866',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10, 
    borderRadius: 20,
  },
  frontImageContainer: {
    marginBottom: 20,
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#D3D3D3',
    overflow: 'hidden',
    borderRadius: 14,
    elevation: 5,
    shadowColor: '#000000',
    shadowRadius: 12,
    width: 350,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  designerText: {
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginStart: 70,
    paddingTop: 5,
    paddingEnd: 12,
    width: '60%',
  },
  header: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'visible',
    borderRadius: 14,
    padding: 2,
    alignSelf: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff4f2',
    marginTop:30
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
