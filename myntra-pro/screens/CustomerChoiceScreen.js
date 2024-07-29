import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert, FlatList, Linking, ScrollView } from 'react-native';
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
  { id: '1', text: 'Take Advice from a Fashion Designer', icon: 'person' },
  { id: '2', text: 'Call Designer', icon: 'call' },
];

function CustomerChoiceScreen({ navigation }) {
  const [showContactSection, setShowContactSection] = useState(true);

  const handleOptionPress = (option) => {
    Alert.alert('Option Selected', `You selected ${option}`);
  };

  const handleProductPress = (item) => {
    Alert.alert('Product Clicked', `You clicked on ${item.name}`);
  };

  const handleCallPress = () => {
    const phoneNumber = 'tel:+1234567890'; // Replace with the actual phone number
    Linking.openURL(phoneNumber);
  };

  const renderOptionItem = ({ item }) => (
    <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionPress(item.text)}>
      <Icon name={item.icon} size={24} color="#FFFFFF" style={styles.optionIcon} />
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
   
    ...products.map(product => ({ ...product, type: 'product' })),
  ];

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Customer Choice</Text>
      </View>

      <View style={styles.subheading}>
        <Text style={styles.subheadingText}>Choose Your Fashion</Text>
        <Text style={styles.tagline}>Your choice, we'll tailor just for you</Text>
      </View>

      <View style={styles.addContainer}>
        <Image style={styles.addImage} source={require('../assets/addDesigner.png')} />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={renderHeader}
      />

      {showContactSection && (
        <View style={styles.contactSection}>
          <View style={styles.contactInfo}>
            <Icon name="chatbubble-ellipses" size={30} color="#fff" style={styles.contactIcon} />
            <Text style={styles.contactMessage}>Need advice? {'\n'}Contact our designer for personalized consultation.</Text>
            <TouchableOpacity onPress={() => setShowContactSection(false)} style={styles.closeButton}>
              <Icon name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
            <Icon name="call" size={24} color="#ff4468" style={styles.callIcon} />
            <Text style={styles.callButtonText}>Call Designer</Text>
          </TouchableOpacity>
        </View>
      )}

      {!showContactSection && (
        <TouchableOpacity style={styles.floatingButton} onPress={() => setShowContactSection(true)}>
          <Icon name="call" size={30} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addImage: {
    width: '100%',
    height: 190,
    resizeMode: 'stretch',
  },
  addContainer: {
    width: '93%',
    height: 210,
    backgroundColor: '#fff',
    borderColor: '#d3d3d3',
    marginBottom: 10,
    alignContent: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignSelf: 'center',
    paddingTop: 10,
  },
  contactTextContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  ContactText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  tagline: {
    color: '#383035',
  },
  subheadingText: {
    fontSize: 18,
    color: '#513438',
    fontWeight: 'bold',
  },
  subheading: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
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
    paddingBottom: 200,
  },
  row: {
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    paddingVertical: 15,
    backgroundColor: '#513438',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  optionIcon: {
    marginRight: 10,
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
    justifyContent: 'center',
    padding: 10,
    elevation: 3,
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
    textAlign: 'center',
  },
  contactSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ff4468',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactIcon: {
    marginRight: 15,
  },
  contactMessage: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  callIcon: {
    marginRight: 10,
  },
  callButtonText: {
    color: '#ff4468',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ff4468',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default CustomerChoiceScreen;
 