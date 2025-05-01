import React from 'react';
import { View, Animated, StyleSheet, Easing, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const createRipple = (delay = 0) => {
  const scale = new Animated.Value(0);
  const opacity = new Animated.Value(0.5);

  Animated.loop(
    Animated.parallel([
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(scale, {
          toValue: 4, // expands out to nearly edge of screen
          duration: 1200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ])
  ).start();

  return { scale, opacity };
};

const LogoRippleFull = ({ children }: { children: React.ReactNode }) => {
  const ripple1 = createRipple(0);
  const ripple2 = createRipple(400);
  const ripple3 = createRipple(800);

  return (
    <View style={styles.container}>
      {/* Ripple layers */}
      {[ripple1, ripple2, ripple3].map((ripple, index) => (
        <Animated.View
          key={index}
          style={[
            styles.ripple,
            {
              transform: [{ scale: ripple.scale }],
              opacity: ripple.opacity,
            },
          ]}
        />
      ))}

      {/* Logo */}
      <View style={styles.logoWrapper}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 300, // Adjust based on popup height
    overflow: 'hidden',
  },
  ripple: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
    backgroundColor: 'rgba(0, 200, 255, 0.3)',
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    zIndex: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
});

export default LogoRippleFull;
