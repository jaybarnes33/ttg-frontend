import LottieView from 'lottie-react-native';
import React from 'react';
import { Text, View } from 'react-native';

interface AnimatedCirclesProps {
  isActive: boolean;
}

const AnimatedCircles: React.FC<AnimatedCirclesProps> = ({ isActive }) => {
  return (
    <View className="absolute h-80 w-80 items-center justify-center">
      <Text>Animated Circles</Text>
      {isActive && (
        <LottieView
          source={require('~/assets/lottie.json')}
          autoPlay
          loop
          renderMode="HARDWARE"
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </View>
  );
};

export default AnimatedCircles;
