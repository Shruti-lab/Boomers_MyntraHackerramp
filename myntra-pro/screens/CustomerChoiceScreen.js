import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const products = [
  {
    id: '1',
    name: 'Jumpsuit',
    image: require('../assets/Jumpsuit.png'),
  },
  {
    id: '2',
    name: 'Lehenga',
    image: require('../assets/designerLehenga2.png'),
  },
  {
    id: '3',
    name: 'Shirt',
    image: require('../assets/shirt1.png'),
  },
  {
    id: '4',
    name: 'Kurti',
    image: require('../assets/kurta2.png'),
  },
  {
    id: '5',
    name: 'Designer Blause',
    image: require('../assets/designerBlause1.png'),
  },
  {
    id: '6',
    name: 'Salwar Kamiz',
    image: require('../assets/designerSalwar1.png'),
  },
  {
    id: '7',
    name: 'Dress',
    image: require('../assets/dress2.png'),
  },
  {
    id: '8',
    name: 'Top',
    image: require('../assets/top1.png'),
  },
  {
    id: '9',
    name: 'Jacket',
    image: require('../assets/jacket1.png'),
  },
  {
    id: '10',
    name: 'Trouser',
    image: require('../assets/trouser1.png'),
  },
];

const options = [
  { id: '1', text: 'Take Advice from a Fashion Designer' },
  { id: '2', text: 'Call Designer' },
];

function CustomerChoiceScreen({ navigation }) {
  const handleOptionPress = (option) => {
    Alert.alert('Option Selected', `You selected ${option}`);
  };

  const handleProductPress = (item) => {
    Alert.alert('Product Clicked', `You clicked on ${item.name}`);
  };

  const renderOptionItem = ({ item }) => (
    <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionPress(item.text)}>
      <Text style={styles.optionButtonText}>{item.text}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => handleProductPress(item)}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    if (item.type === 'option') {
      return renderOptionItem({ item });
    }
    return renderProductItem({ item });
  };

  const data = [
    ...options.map(option => ({ ...option, type: 'option' })),
    ...products.map(product => ({ ...product, type: 'product' })),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Customer Choice</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#626262',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    margin: 10,
    paddingVertical: 15,
    backgroundColor: '#513438',
    borderRadius: 8,
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  productContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    elevation:3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  productImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  productText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#636363',
  },
});

export default CustomerChoiceScreen;
