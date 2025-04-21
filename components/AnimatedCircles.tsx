import React, { useEffect, useRef } from 'react';
import { Animated, View, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { scale } from 'react-native-size-matters';

interface AnimatedCirclesProps {
  isActive: boolean;
}

const AnimatedCircles: React.FC<AnimatedCirclesProps> = ({ isActive }) => {
  const circle1Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.timing(circle1Anim, {
          toValue: 1,
          duration: 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ).start();
    } else {
      circle1Anim.setValue(0);
    }
  }, [isActive]);

  const baseSize = scale(100);
  const strokeWidth = scale(2);
  const baseRadius = baseSize / 2;

  return (
    <View
      className="absolute h-full w-full items-center justify-center"
      style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="100%" height="100%">
        {/* Base circle */}
        <Circle
          cx="50%"
          cy="50%"
          r={baseRadius}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* First animated circle */}
        <AnimatedCircle
          cx="50%"
          cy="50%"
          r={circle1Anim.interpolate({
            inputRange: [0, 1],
            outputRange: [baseRadius, baseRadius * 1.5],
          })}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
      </Svg>
    </View>
  );
};

// Animated Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default AnimatedCircles;
