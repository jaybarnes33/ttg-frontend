import clsx from 'clsx';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';

const Logo = (props: { width?: number; height?: number }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.navigate('/')}>
      <Image
        source={require('../assets/ttg-logo.png')}
        style={{
          width: scale(100),
          height: scale(100),
          resizeMode: 'contain',
        }}
      />
    </TouchableOpacity>
  );
};

export default Logo;
