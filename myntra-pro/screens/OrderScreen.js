import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import app from '../firebaseConfig';

function OrderScreen({ navigation }) {
  const [shoulder, setShoulder] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const db = getFirestore(app);

  const handlePlaceOrder = async () => {
    try {
      // Validate inputs (optional)
      if (!shoulder || !waist || !neck) {
        Alert.alert('Incomplete Measurements', 'Please enter all measurements.');
        return;
      }

      // Add order to Firestore
      await addDoc(collection(db, 'orders'), {
        customerId: 'customer_id', // Replace with actual customer ID
        measurements: {
          shoulder,
          waist,
          neck,
        },
        status: 'pending',
      });

      // Alert and navigate back (or to any other screen)
      Alert.alert('Order Placed', 'Your order has been placed successfully.');
      navigation.navigate('CustomerHome'); // Example navigation, change as per your app flow
    } catch (error) {
      console.error('Error placing order: ', error);
      Alert.alert('Error', 'There was an error placing your order.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place Your Order</Text>
      <TextInput
        placeholder="Shoulder Measurement (inches)"
        style={styles.input}
        value={shoulder}
        onChangeText={setShoulder}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Waist Measurement (inches)"
        style={styles.input}
        value={waist}
        onChangeText={setWaist}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Neck Measurement (inches)"
        style={styles.input}
        value={neck}
        onChangeText={setNeck}
        keyboardType="numeric"
      />
      <Button title="Place Order" onPress={handlePlaceOrder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});

export default OrderScreen;
