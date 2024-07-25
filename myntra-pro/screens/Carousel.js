import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

const Carousel = ({ images, scrollInterval = 3000 }) => {
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [images.length, scrollInterval]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: currentIndex * width,
        animated: true,
      });
    }
  }, [currentIndex]);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const position = Animated.divide(scrollX, width);

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotContainer}>
        {images.map((_, index) => {
          const opacity = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return <Animated.View key={index} style={[styles.dot, { opacity }]} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: 250,
    margin: 15,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: '#926f34',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imageWrapper: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width :'100%', // match the screen width exactly
    height: '100%',
    resizeMode: 'stretch',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
});

export default Carousel;
