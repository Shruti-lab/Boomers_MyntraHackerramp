import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing icons

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
  {
    id: '5',
    name: 'Casual',
    image: require('../assets/casual.png'),
  },
  {
    id: '6',
    name: 'Occasional',
    image: require('../assets/occasional2.png'),
  },
  {
    id: '7',
    name: 'Party',
    image: require('../assets/party2.png'),
  },
];

function CustomerHomeScreen({ navigation }) {
  const renderItem1 = ({ item }) => (
    <TouchableOpacity style={styles.typeContainer} onPress={() => handleProductPress(item)}>
      <Image source={item.image} style={styles.typeImage} />
      <Text style={styles.typeText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>fwd</Text>
          </View>
          <View style={styles.insiderWrapper}>
            <Image 
              source={require('../assets/crownIcon.png')} // Replace with the path to your crown image
              style={styles.crownImage}
            />
            <View style={styles.insiderTextContainer}>
              <Text style={styles.insiderText1}>BECOME</Text>
              <Text style={styles.insiderText2}>INSIDER</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => console.log('Notification pressed')}>
              <Icon name="notifications-outline" size={24} color="#000" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Likes pressed')}>
              <Icon name="heart-outline" size={24} color="#000" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Bag pressed')}>
              <Icon name="bag-outline" size={24} color="#000" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBarInner}>
            <Icon name="search-outline" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchBar}
              placeholder="Search"
              placeholderTextColor="#888"
            />
            <Icon name="camera-outline" size={20} color="#888" style={styles.cameraIcon} />
            <Icon name="mic-outline" size={20} color="#888" style={styles.micIcon} />
          </View>
        </View>

        {/* Labels Section */}
        <View style={styles.labelsContainer}>
          <View style={styles.labelBox}>
            <Text style={styles.labelText}>Women</Text>
          </View>
          <View style={styles.labelBox}>
            <Text style={styles.labelText}>Men</Text>
          </View>
        </View>

        {/* FlatList */}
        <View style={styles.typeView}>
          <FlatList
            data={types}
            renderItem={renderItem1}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={styles.typeViewContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Full-Width Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/myntrafwd.png')} // Replace with the path to your image
            style={styles.fullWidthImage}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  typeView: {
    alignItems: 'center',
    marginBottom: 10,
    marginStart: 15,
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
    paddingTop: 30,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    borderWidth: 1,
    paddingStart: 10,
    paddingEnd: 8,
    padding: 5,
    borderRadius: 8,
    borderColor: "#ffab90",
    backgroundColor: '#fff4e6',
    paddingLeft:  30,
    paddingRight: 30,
  },
  insiderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2, // Adjust spacing as needed
  },
  crownImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 5, // Space between image and text
  },
  insiderTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  insiderText1: {
    fontSize: 12, // Increased font size
    fontWeight: '800', // Increased font weight
    color: '#000',
    textShadowRadius: 1, // Shadow blur radius
  },
  insiderText2: {
    fontSize: 15, // Increased font size
    fontWeight: '800', // Increased font weight
    color: '#d4af37',
    textShadowRadius: 1, // Shadow blur radius
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 75,
  },
  icon: {
    marginLeft: 15,
  },
  searchBarContainer: {
    marginBottom:5,
    margin: 10,
    padding: 10,
  },
  searchBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 40, // Space for icons inside
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1, // Ensure icon is on top
  },
  cameraIcon: {
    position: 'absolute',
    right: 50,
    zIndex: 1, // Ensure icon is on top
  },
  micIcon: {
    position: 'absolute',
    right: 15,
    zIndex: 1, // Ensure icon is on top
  },
  labelsContainer: {
    margin: 0,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelBox: {
    flex: 1,
    marginHorizontal: 5,
    height: 40, // Adjust height as needed
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Light background color for visibility
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  imageContainer: {
    marginTop: 10, // Adjust as needed
    marginHorizontal: 0,
    width: '100%',
  },
  fullWidthImage: {
    width: '100%',
    height: 400, // Adjust height as needed
    resizeMode: 'cover', // Ensures the image covers the container
  },
});

export default CustomerHomeScreen;
