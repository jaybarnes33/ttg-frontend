import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
const Logo = (props: { width?: number; height?: number }) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.navigate('/home')}>
      <Image className=" h-40 w-32" resizeMode="contain" source={require('../assets/ttg.png')} />
    </TouchableOpacity>
  );
};

export default Logo;
