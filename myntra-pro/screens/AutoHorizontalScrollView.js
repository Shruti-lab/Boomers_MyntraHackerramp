import React, { useRef, useEffect } from 'react';
import { ScrollView, Animated, Easing } from 'react-native';

const AutoScrollHorizontalScrollView = ({ children, scrollInterval = 3000 }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const scrollViewWidth = 500; // Adjust this as per your child item width
    const animateScroll = () => {
      Animated.timing(scrollX, {
        toValue: -scrollViewWidth,
        duration: scrollInterval,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        scrollX.setValue(0); // Reset scroll position
        animateScroll(); // Loop the animation
      });
    };

    animateScroll();

    return () => {
      scrollX.stopAnimation(); // Stop animation on unmount
    };
  }, [scrollX, scrollInterval]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
    >
      <Animated.View style={{ transform: [{ translateX: scrollX }] }}>
        {children}
      </Animated.View>
    </ScrollView>
  );
};

export default AutoScrollHorizontalScrollView;
