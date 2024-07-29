import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons
import Carousel from './Carousel'; // Import the new Carousel component

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

const adds = [
  {
    id: '1',
    name: 'Jumpsuit',
    image: require('../assets/adds/add1.png'),
  },
  {
    id: '2',
    name: 'Lehenga',
    image: require('../assets/adds/add6.png'),
  },
  {
    id: '3',
    name: 'Shirt',
    image: require('../assets/adds/add3.png'),
  },
  {
    id: '4',
    name: 'Kurti',
    image: require('../assets/adds/add7.png'),
  },
  {
    id: '5',
    name: 'Designer Blause',
    image: require('../assets/adds/add5.png'),
  },
];

const types = [
  {
    id: '1',
    name: 'Formal',
    image: require('../assets/formal.png'),
  },
  {
    id: '2',
    name: 'Casual',
    image: require('../assets/casual.png'),
  },
  {
    id: '3',
    name: 'Occasional',
    image: require('../assets/occasional2.png'),
  },
  {
    id: '4',
    name: 'Party',
    image: require('../assets/party2.png'),
  },
];

function DesignFeatureScreen({ navigation }) {
  const renderItem1 = ({ item }) => (
    <TouchableOpacity style={styles.typeContainer} onPress={() => handleProductPress(item)}>
      <Image source={item.image} style={styles.typeImage} />
      <Text style={styles.typeText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleProductPress(item)}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem3 = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleProductPress(item)}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleProductPress = (item) => {
    if (item.name === 'Jumpsuit')
      navigation.navigate('Jumpsuit');
    else
      Alert.alert('Product Clicked', `You clicked on ${item.name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.designHeader}>
          <Text style={styles.title}>Design Page</Text>
             
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
          <Icon name="notifications-outline" size={24} color="#000" />
          </TouchableOpacity>
          
           <TouchableOpacity onPress={() => navigation.navigate('Quotes')}>
          <Icon name="cart-outline" size={24} color="#000"  style={styles.icon}/>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() =>navigation.navigate('PlacedOrder')}>
          <Icon name="bag-outline" size={24} color="#000"  style={styles.icon}/>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.typeView}>
          <FlatList
            data={types}
            renderItem={renderItem1}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={styles.typeViewContainer}
          />
        </View>
        <View style={styles.carouselWrapper}>
          <Carousel images={adds.map(add => add.image)} scrollInterval={3000} />
        </View>
        <View style={styles.instructions}>
          <Text style={styles.stepsTitle}>Get Your Dream Outfit in 4 Easy steps</Text>
        </View>
        <View style={styles.stepsContainer}>
          <View style={styles.stepBox}>
            <Image source={require('../assets/icons/dressIcon2.png')} style={styles.stepIcon} />
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepCount}>Step 1</Text>
              <Text style={styles.stepText}>Select the garment of your choice or upload an image</Text>
            </View>
          </View>
          <View style={styles.stepBox}>
            <Image source={require('../assets/icons/tailorIcon.png')} style={styles.stepIcon} />
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepCount}>Step 2</Text>
              <Text style={styles.stepText}>An assigned designer will work for your requirements</Text>
            </View>
          </View>
          <View style={styles.stepBox}>
            <Image source={require('../assets/icons/estimateIcon.png')} style={styles.stepIcon} />
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepCount}>Step 3</Text>
              <Text style={styles.stepText}>Review the estimate and make the payment</Text>
            </View>
          </View>
          <View style={styles.stepBox}>
            <Image source={require('../assets/icons/deliveryIcon.png')} style={styles.stepIcon} />
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepCount}>Step 4</Text>
              <Text style={styles.stepText}>Your customized garment will be delivered to your destination</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.orderImageContainer}
          onPress={() => navigation.navigate('CustomerChoice')}
        >
          <Image style={styles.orderScreenImage} source={require('../assets/designer10.png')} />
          <View style={styles.orderTextContainer}>
            <Text style={styles.ordertext}>Get your Choice Custom-tailored </Text>
            <Icon name="arrow-forward-circle" size={22} color="#513438" style={styles.iconContainer} />
          </View>
        </TouchableOpacity>
        <View style={styles.subheading}>
          <Text style={styles.subheadingText}>Choose Your Fashion</Text>
          <Text style={styles.tagline}>Your choice, we'll tailor just for you</Text>
        </View>
        <FlatList
          data={products}
          renderItem={renderItem2}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    paddingBottom: 10
  },
  orderTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: '90%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  ordertext: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#513438',
    paddingTop: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  orderScreenImage: {
    width: '90%',
    resizeMode: 'stretch',
    height: 250,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  orderImageContainer: {
    alignItems: 'center',
    width: 'auto',
    marginTop: 10,
    marginBottom: 20,
    elevation: 4,
    shadowColor: 'black'
  },
  stepCount: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5,
  },
  stepIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  designHeader: {
    marginTop: 10,
    flexDirection:'row'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
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
  },
  steps: {
    marginTop: 10,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#430541',
  },
  instructions: {
    marginStart: 15,
    alignItems: 'center',
  },
  typeView: {
    alignItems: 'center',
    marginBottom: 10,
    marginStart: 5,
    marginTop: 10
  },
  typeContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  typeImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
    resizeMode: 'cover',
  },
  typeText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
    color: '#636363',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    borderWidth: 1,
    paddingStart: 10,
    paddingEnd: 8,
    padding: 5,
    borderRadius: 4,
    borderColor: "#89cff0",
    backgroundColor: '#d5ffff',
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
    resizeMode: 'stretch',
  },
  itemText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
    color: '#636363',
  },
  stepsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 10,
    margin: 3,
    marginBottom: 10,
  },
  stepBox: {
    width: '48%',
    padding: 10,
    backgroundColor: '#fff4f2',
    borderRadius: 10,
    marginBottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepTextContainer: {
    flex: 1, // Allows the text container to fill the remaining space
  },
  stepText: {
    fontSize: 12,
    color: '#383035',
    textAlign: 'left',
    flexWrap: 'wrap', // Ensures text wraps within the container
  },
  carouselWrapper: {
    marginBottom: 10,
  },
});

export default DesignFeatureScreen;
