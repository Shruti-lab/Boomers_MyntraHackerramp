import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image , Alert} from 'react-native';

const products = [
  {
    id: '1',
    name: 'Fashion Product 1',
    image: require('../assets/T-shirt.png'), // Update with actual path to your images
  },
  {
    id: '2',
    name: 'Fashion Product 2',
    image: require('../assets/T-shirt.png'), // Update with actual path to your images
  },
  {
    id: '3',
    name: 'Fashion Product 3',
    image: require('../assets/T-shirt.png'), // Update with actual path to your images
  },
  {
    id: '4',
    name: 'Fashion Product 4',
    image: require('../assets/T-shirt.png'), // Update with actual path to your images
  },
  {
    id: '5',
    name: 'Fashion Product 5',
    image: require('../assets/T-shirt.png'), // Update with actual path to your images
  },
  {
    id: '6',
    name: 'Fashion Product 6',
    image: require('../assets/T-shirt.png'), // Update with actual path to your images
  },
  // Add more products as needed
];

function DesignFeatureScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleProductPress(item)}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleProductPress = (item) => {
    // Handle product click, navigate or show more details
    Alert.alert('Product Clicked', `You clicked on ${item.name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fashion Products</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  flatListContainer: {
    paddingLeft: 20,
  },
  itemContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  itemImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
    resizeMode:'stretch'
    
  },
  itemText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
  },
  topbox: {
    paddingTop: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 3,
  },
  myntrabox: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FAF3EB',
    padding: 7,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C8AA5E',
  },
  pinkarrow: {
    height: 8,
    width: 12,
  },
  framebox: {
    flex: 0.3,
    paddingTop: 5,
  },
  toprightframe: {
    height: 22,
    width: 100,
  },
  searchbox: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 2,
    shadowColor: 'black',
    borderRadius: 25,
    shadowOffset: 20,
    padding: 5,
    justifyContent: 'space-between',
  },
  playlist: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default DesignFeatureScreen;
