import React from 'react';
import { View, Text, Image } from 'react-native';

const CustomIconComponent = ({ name, color, size, focused }) => {
  const iconImageSource = focused
    ? require('../assets/myntraIcon.png')
    : require('../assets/myntraOutline.png');

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={iconImageSource}
        style={{ marginTop:10,width: 40, height: size,resizeMode:'contain' }}
      />
    </View>
  );
};

export default CustomIconComponent;
