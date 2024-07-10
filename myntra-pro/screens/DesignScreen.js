import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

function DesignScreen() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const pickImage = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const submitDesign = () => {
    // Handle the form submission logic here
    console.log('Design submitted', { image, description });
  };

  return (
    <View style={styles.container}>
      <Text>Submit Your Design</Text>
      <Button title="Pick an image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Submit" onPress={submitDesign} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    marginTop: 10,
  },
});

export default DesignScreen;
