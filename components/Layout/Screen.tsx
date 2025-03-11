import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-row items-center justify-between px-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Chevron direction="left" size={30} color="white" />
          </TouchableOpacity>

          <Logo width={122.2} height={160.3} />
          <TouchableOpacity onPress={handleNext}>
            <Chevron direction="right" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Screen;
