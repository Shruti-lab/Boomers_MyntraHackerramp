import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../firebaseConfig'; // Adjust path as per your structure
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing icons

function PlacedOrderScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [customerEmail, setCustomerEmail] = useState('');
  const db = getFirestore(app);
  const auth = getAuth(app);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCustomerEmail(user.email);
      console.log('Customer email:', user.email); // Log customer email
    }
  }, []);

  useEffect(() => {
    if (customerEmail) {
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, where('customerId', '==', customerEmail));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const ordersList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Order data:', data); // Log order data for debugging

          return {
            ...data,
            id: doc.id,
            imageUri: data.imageUri || '', // Ensure imageUri is handled
            productName: data.productName || 'Unknown Product',
            color: data.color || 'N/A', 
            material: data.material || 'N/A',
          };
        });

        // Filter orders with non-null finalQuote
        const filteredOrders = ordersList.filter(order => order.finalQuote !== null);

        console.log('Filtered Orders list:', filteredOrders); // Log the filtered list of orders
        setOrders(filteredOrders);
      }, (error) => {
        console.error('Error fetching orders: ', error);
      });

      return () => unsubscribe();
    }
  }, [customerEmail]);

  const handleSelectOrder = (order) => {
    navigation.navigate('OrderDetails', { order });
  };

  const handleRefresh = () => {
    // Add refresh functionality here
    console.log('Refresh icon pressed');
  };

  const handleSettings = () => {
    // Add settings functionality here
    console.log('Settings icon pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton2}>
          <Icon name="arrow-back" size={24} color="#000"/>
        </TouchableOpacity>
        <View alignItems='center'>
        <Text style={styles.title}>Placed Orders</Text>
      </View>
        <View style={styles.headerIcons}>
          
          <TouchableOpacity onPress={() =>navigation.navigate('Quotes')} style={styles.headerIcon}>
            <Icon name="cart-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

     
      

      <FlatList
        data={orders}
        style={styles.orderList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          customerEmail === item.customerId && (
            <TouchableOpacity style={styles.orderCard} onPress={() => handleSelectOrder(item)}>
              <View style={styles.orderCardContent}>
                {item.imageUri ? (
                  <Image source={{ uri: item.imageUri }} style={styles.productImage} />
                ) : (
                  <Image source={require('../assets/casual.png')} style={styles.productImage} /> // Fallback image
                )}
                <View style={styles.orderCardText}>
                  <View style={styles.productDetails}>
                    <Ionicons name="shirt-outline" size={20} color="#ff4468" />
                    <Text style={styles.orderId}>{item.productName}</Text>
                  </View>
                  <Text style={styles.orderColor}>Color: {item.color}</Text>
                  <Text style={styles.orderColor}>Material: {item.material}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  orderList:{
    marginTop:10,
    borderTopWidth:2,
    borderTopColor:'#d3d3d3'
  },
  addImage:{
    width:'95%',
    height:150,
    alignSelf:'center',
    padding:20,
    resizeMode:'stretch'
  },
  addText:{
    color:'#fff',
    alignSelf:'center'
  },
  arrowIcon: {
    alignSelf: 'center',
  },
  orderColor: {
    color: '#636363',
    marginLeft:30,
  },
  addContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 25,
    marginBottom: 50,
    alignContent:'center' ,
    marginTop:40,
   
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    textAlign:'center'
 
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#636363',
   
  },
  backButton2: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginTop:28
  },
  orderCard: {
    backgroundColor: '#fff',
    marginBottom: 0,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:10
  },
  orderCardText: {
    flex: 1,
    marginLeft: 45,
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 17 ,
    fontWeight: 'bold',
    marginLeft: 10
  },
  productImage: {
    width: 100, 
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom:12,
    marginLeft:15
  },
});

export default PlacedOrderScreen;
