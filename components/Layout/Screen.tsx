import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

import Logo from '../Logo';
import Chevron from '../icons/Chevron';
const Screen = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const pathname = usePathname();

  const handleNext = () => {
    const next =
      pathname === '/home' ? '/alerts' : pathname === '/alerts' ? '/alert-form' : '/home';
    router.push(next);
  };
  return (
    <LinearGradient colors={['#22B3AB', '#D9FBFC']} style={{ flex: 1 }}>
      <SafeAreaView className="pb-4" style={{ flex: 1 }}>
        <View className="flex-row items-center justify-between px-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Chevron direction="left" size={scale(30)} color="white" />
          </TouchableOpacity>

          <Logo width={scale(100)} height={scale(100.3)} />
          <TouchableOpacity onPress={handleNext}>
            <Chevron direction="right" size={scale(30)} color="white" />
          </TouchableOpacity>
        </View>

        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Screen;
