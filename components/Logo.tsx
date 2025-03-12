import clsx from 'clsx';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
const Logo = (props: { width?: number; height?: number }) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.navigate('/home')}>
      <Image
        className={clsx(Platform.OS === 'ios' && 'h-40  w-32')}
        resizeMode="contain"
        source={require('../assets/ttg.png')}
        style={{
          width: scale(props.width || 80),
          height: verticalScale(props.height || 80),
        }}
      />
    </TouchableOpacity>
  );
};

export default Logo;
