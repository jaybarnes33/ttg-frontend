import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

import AnimatedCircles from '../AnimatedCircles';
import Logo from '../Logo';
import Chevron from '../icons/Chevron';

const Screen = ({
  children,
  hideArrows = false,
}: {
  children: React.ReactNode;
  hideArrows?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (pathname === '/alert') {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [pathname]);

  const handleNext = () => {
    const next = pathname === '/' ? '/alerts' : pathname === '/alerts' ? '/alert-form' : '/';
    router.push(next as any);
  };

  return (
    <LinearGradient colors={['#22B3AB', '#D9FBFC']} style={{ flex: 1 }}>
      <SafeAreaView className="pb-4" style={{ flex: 1 }}>
        <View className="flex-row items-center justify-between px-3">
          {!hideArrows && (
            <>
              <TouchableOpacity disabled={pathname === '/'} onPress={() => router.back()}>
                <Chevron direction="left" size={scale(30)} color="white" />
              </TouchableOpacity>
            </>
          )}
          <View className="relative mx-auto items-center justify-center">
            {pathname === '/alert' && <AnimatedCircles isActive={pathname === '/alert'} />}
            <Animated.View className="rounded-full " style={{ transform: [{ scale: pulseAnim }] }}>
              <Logo />
            </Animated.View>
          </View>

          {!hideArrows && (
            <TouchableOpacity onPress={handleNext}>
              <Chevron direction="right" size={scale(30)} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Screen;
