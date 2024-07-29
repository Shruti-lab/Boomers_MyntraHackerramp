import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Alert, Image, SafeAreaView } from 'react-native';
import { getFirestore, collection, query, onSnapshot, doc, updateDoc, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firestore, app } from '../firebaseConfig'; // Ensure both firestore and app are imported correctly
import { FontAwesome5 } from '@expo/vector-icons'; // Importing icons

function DesignerOrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [quoteMap, setQuoteMap] = useState({});
  const [designerEmail, setDesignerEmail] = useState('');
  const db = firestore;
  const auth = getAuth(app);

  useEffect(() => {
    // Retrieve designer's email
    const user = auth.currentUser;
    if (user) {
      setDesignerEmail(user.email);
    }

    const q = query(collection(db, 'orders'),);
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
    if (!designerEmail) {
      Alert.alert('Error', 'Could not retrieve designer email.');
      return;
    }

    try {
      const orderDoc = doc(db, 'orders', orderId);
      const currentQuote = quoteMap[orderId] || ''; // Get current quote from state map

      // Update the quotes map with the designer's email as the key and the current quote as the value
      await updateDoc(orderDoc, {
        quotes: {
          [designerEmail]: currentQuote // Set the designer's email as the key and the quote as the value
        },
      // Update status to 'quote_sent'
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
      <View style={styles.myntraInsider}>
        <View style={styles.logoImage}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.myntraText}>New Orders</Text>
        <Image source={require('../assets/insiderCrown.png')} style={styles.myntraImage} />
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={orders.length === 0 ? styles.noOrdersContainer : styles.scrollContainer}>
          {orders.length === 0 ? (
            <Text style={styles.noOrdersText}>No new orders</Text>
          ) : (
            orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                {order.imageUri ? (
                  <Image
                    source={{ uri: order.imageUri }} // Use the URI from Firestore
                    style={styles.productImage}
                  />
                ) : (
                  <Image
                    source={require('../assets/dressImage.png')} // Fallback image
                    style={styles.productImage}
                  />
                )}
                <View style={styles.orderContent}>
                  <Text style={styles.customerName}>Product: {order.productName}</Text>
                  <View style={styles.measurementsContainer}>
                    <FontAwesome5 name="ruler-horizontal" size={14} color="#666" />
                    <Text style={styles.orderDetails}> Chest: {order.measurements.chest}</Text>
                  </View>
                  <View style={styles.measurementsContainer}>
                    <FontAwesome5 name="ruler-vertical" size={14} color="#666" />
                    <Text style={styles.orderDetails}> Waist: {order.measurements.waist}</Text>
                  </View>
                  <View style={styles.measurementsContainer}>
                    <FontAwesome5 name="ruler" size={14} color="#666" />
                    <Text style={styles.orderDetails}> Hip: {order.measurements.hip}</Text>
                  </View>
                  <View style={styles.measurementsContainer}>
                    <FontAwesome5 name="tape" size={14} color="#666" />
                    <Text style={styles.orderDetails}> Sleeve Length: {order.measurements.sleeveLength}</Text>
                  </View>
                  <View style={styles.measurementsContainer}>
                    <FontAwesome5 name="circle" size={14} color="#666" />
                    <Text style={styles.orderDetails}> Neck: {order.measurements.neck}</Text>
                  </View>
                  <View style={styles.measurementsContainer}>
                    <FontAwesome5 name="long-arrow-alt-right" size={14} color="#666" />
                    <Text style={styles.orderDetails}> Inseam: {order.measurements.inseam}</Text>
                  </View>
                  <TextInput
                    placeholder="Enter your quote"
                    style={styles.input}
                    value={quoteMap[order.id] || ''}
                    onChangeText={(value) => handleChangeQuote(order.id, value)}
                  />
                  <Button title="Send Quote" onPress={() => handleSendQuote(order.id)} color="#ff4468" />
                </View>
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
    marginTop: 30,
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
    flexDirection: 'row',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'contain',
  },
  orderContent: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  measurementsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  orderDetails: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  noOrdersText: {
    fontSize: 18,
    color: '#D3D3D3',
    textAlign: 'center',
  },
});

export default DesignerOrdersScreen;
